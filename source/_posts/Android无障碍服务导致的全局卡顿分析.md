---
title: Android无障碍服务导致的全局卡顿分析
tags: [转载, Android]
abbrlink: 7797efbf
date: 2020-02-15 23:22:55
index_img: https://gitee.com/Royce2003/blogimages/raw/master/img/u=1085547070,2003713881&fm=26&gp=0.jpg
---

文章转载自魅族系统性能优化工程师

对于某些要求开启无障碍的应用要小心了，不开源，不盈利又掌握着你系统的“最高权限”

---

# 现象

有用户反馈，手机在滑动的时候, 列表会一抖一抖的, 滑动桌面或者设置（只要是可以滑动的），都会出现，但是这个并不是必现，而是某些用户会出现，某些用户则不会出现。

吃瓜群众可以直接拉到下面看 罪魁祸首和自检 ，对分析问题比较感兴趣的可以看一下分析的过程。

# Systrace 分析

本地测试有一台复现, 拿过来之后分析发现,手指滑动桌面或者设置,都会必现卡顿, 从 Trace 上看就是下面这样
[![img](https://www.androidperformance.com/images/media/performancecase/15482434530990.jpg)](https://www.androidperformance.com/images/media/performancecase/15482434530990.jpg)

红色箭头处就是掉帧的地方. 从上面的 Buffer 个数可以看到, SF没有绘制的原因是 Launcher 没有提交 Buffer 上来.

对应的 Launcher Trace如下 , 可以看到 Launcher 没有绘制的原因是没有 Input 事件传上来. 所以 Launcher 的画面没有更新, 所以才会出现掉帧.
[![img](https://www.androidperformance.com/images/media/performancecase/15482435308066.jpg)](https://www.androidperformance.com/images/media/performancecase/15482435308066.jpg)

没有事件上来这个本身就是有问题的 , 我们手指是连续从屏幕上划过的, 事件的上报应该是连续的才对, 我们怀疑是屏幕报点有问题, 不过 Check 硬件之前我们首先看一下 InputReader 和 InputDispatcher 线程是否正常工作

[![img](https://www.androidperformance.com/images/media/performancecase/15482435458655.jpg)](https://www.androidperformance.com/images/media/performancecase/15482435458655.jpg)

从图中可以看到 InputReader 线程是正常工作的 , 但是 InputDIspatcher 线程却有问题, 大家可以看一下正常情况下这两个线程的对应关系

[![img](https://www.androidperformance.com/images/media/performancecase/15482435564755.jpg)](https://www.androidperformance.com/images/media/performancecase/15482435564755.jpg)

再回到有问题的那个图 , 仔细看发现 InputDispatcher 线程的周期是和 Vsync 是相同的, 也就是说, InputDispatcher 的唤醒逻辑由 InputReader 唤醒变为由 Vsync 唤醒

再仔细看的话，点开 InputDIspatcher 的线程 cpu 状态可以看到， 唤醒执行任务的 InputDispatcher 线程并不是被 InputReader 线程唤醒的, 而是被 System_Server 的 UI Thread 唤醒的.

那么接下来， 就需要从代码的角度来看为什么 InputReader 没有唤醒 InputDIspatcher 。

# 代码分析

InputReader 唤醒 InputDispatcher 线程的逻辑如下（以本例中的 Move 手势为例。），

frameworks/native/services/inputflinger/InputDispatcher.cpp

```cpp
void InputDispatcher::notifyMotion(const NotifyMotionArgs* args) {

    if (!validateMotionEvent(args->action, args->actionButton,
                args->pointerCount, args->pointerProperties)) {
        return;
    }

    uint32_t policyFlags = args->policyFlags;
    policyFlags |= POLICY_FLAG_TRUSTED;

    android::base::Timer t;
    mPolicy->interceptMotionBeforeQueueing(args->eventTime, /*byref*/ policyFlags);
    if (t.duration() > SLOW_INTERCEPTION_THRESHOLD) {
        ALOGW("Excessive delay in interceptMotionBeforeQueueing; took %s ms",
                std::to_string(t.duration().count()).c_str());
    }

    bool needWake; //是否需要唤醒
    { // acquire lock
        mLock.lock();

        if (shouldSendMotionToInputFilterLocked(args)) {
            mLock.unlock();

            MotionEvent event;
            event.initialize(args->deviceId, args->source, args->action, args->actionButton,
                    args->flags, args->edgeFlags, args->metaState, args->buttonState,
                    0, 0, args->xPrecision, args->yPrecision,
                    args->downTime, args->eventTime,
                    args->pointerCount, args->pointerProperties, args->pointerCoords);

            policyFlags |= POLICY_FLAG_FILTERED;
            // SystemServer 上层要对事件进行过滤
            if (!mPolicy->filterInputEvent(&event, policyFlags)) {
                return; // event was consumed by the filter
            }

            mLock.lock();
        }

        // Just enqueue a new motion event.
        MotionEntry* newEntry = new MotionEntry(args->eventTime,
                args->deviceId, args->source, policyFlags,
                args->action, args->actionButton, args->flags,
                args->metaState, args->buttonState,
                args->edgeFlags, args->xPrecision, args->yPrecision, args->downTime,
                args->displayId,
                args->pointerCount, args->pointerProperties, args->pointerCoords, 0, 0);

        needWake = enqueueInboundEventLocked(newEntry); 
        mLock.unlock();
    } // release lock

    if (needWake) {
        mLooper->wake();
    }
}
```

需要注意这里 ，mPolicy->filterInputEvent 直接 return了，也就是说这里如果返回 false，那么就直接 return 了， 不继续执行下面的步骤。

继续看 mPolicy->filterInputEvent

frameworks/base/services/core/jni/com_android_server_input_InputManagerService.cpp

```cpp
bool NativeInputManager::filterInputEvent(const InputEvent* inputEvent, uint32_t policyFlags) {
    ATRACE_CALL();
    jobject inputEventObj;

    JNIEnv* env = jniEnv();
    switch (inputEvent->getType()) {
    case AINPUT_EVENT_TYPE_KEY:
        inputEventObj = android_view_KeyEvent_fromNative(env,
                static_cast<const KeyEvent*>(inputEvent));
        break;
    case AINPUT_EVENT_TYPE_MOTION:
        inputEventObj = android_view_MotionEvent_obtainAsCopy(env,
                static_cast<const MotionEvent*>(inputEvent));
        break;
    default:
        return true; // dispatch the event normally
    }

     
    
    // The callee is responsible for recycling the event.
    jboolean pass = env->CallBooleanMethod(mServiceObj, gServiceClassInfo.filterInputEvent,
            inputEventObj, policyFlags);
    if (checkAndClearExceptionFromCallback(env, "filterInputEvent")) {
        pass = true;
    }
    env->DeleteLocalRef(inputEventObj);
    return pass;
}
```

这里从 jni 调回到 java 层， 也就是 InputManagerService 的 filterInputEvent 方法。

com/android/server/input/InputManagerService.java

```
// Native callback.
final boolean filterInputEvent(InputEvent event, int policyFlags) {
    synchronized (mInputFilterLock) {
        if (mInputFilter != null) {
            try {
                mInputFilter.filterInputEvent(event, policyFlags);
            } catch (RemoteException e) {
                /* ignore */
            }
            return false;
        }
    }
    event.recycle();
    return true;
}
```

跟代码流程发现, 这个 mInputFilter 是 AccessibilityInputFilter 的一个实例, 在 辅助功能里面打开开关的时候,会调用 AccessibilityManagerService 的 updateInputFilter 方法来设置 InputFilter.

android/view/InputFilter.java

```java
final public void filterInputEvent(InputEvent event, int policyFlags) {
    mH.obtainMessage(MSG_INPUT_EVENT, policyFlags, 0, event).sendToTarget();
}

case MSG_INPUT_EVENT: {
    final InputEvent event = (InputEvent)msg.obj;
    try {
        if (mInboundInputEventConsistencyVerifier != null) {
            mInboundInputEventConsistencyVerifier.onInputEvent(event, 0);
        }
        onInputEvent(event, msg.arg1);
    } finally {
        event.recycle();
    }
    break;
}
```

继续看 onInputEvent(event, msg.arg1);
com/android/server/accessibility/AccessibilityInputFilter.java

```java
@Override
public void onInputEvent(InputEvent event, int policyFlags) {
    if (mEventHandler == null) {
        if (DEBUG) Slog.d(TAG, "mEventHandler == null for event " + event);
        super.onInputEvent(event, policyFlags);
        return;
    }

    EventStreamState state = getEventStreamState(event);
    if (state == null) {
        super.onInputEvent(event, policyFlags);
        return;
    }

    int eventSource = event.getSource();
    if ((policyFlags & WindowManagerPolicy.FLAG_PASS_TO_USER) == 0) {
        state.reset();
        mEventHandler.clearEvents(eventSource);
        super.onInputEvent(event, policyFlags);
        return;
    }

    if (state.updateDeviceId(event.getDeviceId())) {
        mEventHandler.clearEvents(eventSource);
    }

    if (!state.deviceIdValid()) {
        super.onInputEvent(event, policyFlags);
        return;
    }

    if (event instanceof MotionEvent) {
        if ((mEnabledFeatures & FEATURES_AFFECTING_MOTION_EVENTS) != 0) {
            MotionEvent motionEvent = (MotionEvent) event;
            processMotionEvent(state, motionEvent, policyFlags);
            return;
        } else {
            super.onInputEvent(event, policyFlags);
        }
    } else if (event instanceof KeyEvent) {
        KeyEvent keyEvent = (KeyEvent) event;
        processKeyEvent(state, keyEvent, policyFlags);
    }
}
```

继续看 processMotionEvent

```
private void processMotionEvent(EventStreamState state, MotionEvent event, int policyFlags) {
    if (!state.shouldProcessScroll() && event.getActionMasked() == MotionEvent.ACTION_SCROLL) {
        super.onInputEvent(event, policyFlags);
        return;
    }

    if (!state.shouldProcessMotionEvent(event)) {
        return;
    }

    batchMotionEvent(event, policyFlags);
}
```

继续看 batchMotionEvent

```java
private void batchMotionEvent(MotionEvent event, int policyFlags) {
    if (DEBUG) {
        Slog.i(TAG, "Batching event: " + event + ", policyFlags: " + policyFlags);
    }
    if (mEventQueue == null) {
        mEventQueue = MotionEventHolder.obtain(event, policyFlags);
        scheduleProcessBatchedEvents();
        return;
    }
    if (mEventQueue.event.addBatch(event)) {
        return;
    }
    MotionEventHolder holder = MotionEventHolder.obtain(event, policyFlags);
    holder.next = mEventQueue;
    mEventQueue.previous = holder;
    mEventQueue = holder;
}
```

继续看 scheduleProcessBatchedEvents

```java
private void scheduleProcessBatchedEvents() {
    mChoreographer.postCallback(Choreographer.CALLBACK_INPUT,
            mProcessBatchedEventsRunnable, null);
}
```

会在下一个 Vsync 周期的时候执行 mProcessBatchedEventsRunnable , 也就是 Choreographer.CALLBACK_INPUT ， 熟悉 Choregrapher 的同学应该知道这里在做什么。

```java
private final Runnable mProcessBatchedEventsRunnable = new Runnable() {
    @Override
    public void run() {
        final long frameTimeNanos = mChoreographer.getFrameTimeNanos();
        }
        processBatchedEvents(frameTimeNanos);
        if (mEventQueue != null) {
            scheduleProcessBatchedEvents();
        }
    }
};
```

那么代码在这里就比较清晰了， 是因为存在 AccessibilityInputFilter 导致 InputDIspatcher 线程没有被唤醒，而是把事件处理放到了下一个 Vsync 里面去处理。
结论

问题就在这个 Runnable 里面, 正常情况下, 如果没有打开 AccessibilityInputFilter , 那么上层不会对 Input 事件做任何的拦截, 一旦有 AccessibilityInputFilter , 那么就会走上面的逻辑, 这时候 InputDispatcher 不会跟着 InputReader 的节奏来走 , 而是跟着 Vsync 的节奏来走, 从 Trace 上也可看到这点;

[![img](https://www.androidperformance.com/images/media/performancecase/15482437370372.jpg)](https://www.androidperformance.com/images/media/performancecase/15482437370372.jpg)

那么这个 AccessibilityInputFilter 是从哪里来的呢？答案就是 Accessibility 服务，也就是常说的无障碍服务。

# 罪魁祸首

经过上面的分析我们知道问题的原因是无障碍服务 ，无障碍服务的本质是为了服务哪些盲人之类的不方便操作的用户，但是某些 App 为了实现特定的功能，也加入了自己的 Accessibility 服务， 比如各大手机市场的“一键安装”功能，用户是方便了，但是用不好，也会有负面的作用，比如这一例，导致用户手机整机卡顿，不知道的用户，我估计都要退机了。

那么罪魁祸首是谁呢？目前发现有两个，一个讯飞输入法，一个是应用宝。打开 设置-系统-无障碍服务，可以看到里面的各种软件都有参与到，不过这个默认是关闭的，很多应用会引导用户去开启，许多用户不明所以，就稀里糊涂打开了。

无障碍服务页面如下：
[![img](https://www.androidperformance.com/images/media/performancecase/15482437928005.jpg)](https://www.androidperformance.com/images/media/performancecase/15482437928005.jpg)

关于无障碍服务有多NB，大家可以自己看看下面的弹框，这东西可以检测你的信用卡号和密码，至于短信内容、微信聊天内容那都是小 Case。

[![img](https://www.androidperformance.com/images/media/performancecase/15482438028084.jpg)](https://www.androidperformance.com/images/media/performancecase/15482438028084.jpg)

至于在这个例子里面引起整机卡顿的，就是下面这个 监听 ”执行手势“ 这个，一旦有应用监听这个的话， InputDIspatcher 线程就会走 Vsync 的周期，导致报点处理不及时，从而让滑动的对象以为这一帧没有事件进入，所以也没有内容的变更，就不会进行页面的更新，从而导致卡顿。
[![img](https://www.androidperformance.com/images/media/performancecase/15482438143185.jpg)](https://www.androidperformance.com/images/media/performancecase/15482438143185.jpg)

# 自检

如果你使用的是 Android 手机，强烈建议你关掉所有的无障碍服务（如果你不需要的话），像自动安装应用这种功能，不值得你为此付出这么大的风险。这个是 Android 原生的问题，我们在 Pixle 和 其他三方手机上都有发现这个问题。

1. 关闭路径：设置-系统-无障碍服务 ， 进去后把你已经打开的都关上。
2. 强烈建议 **应用宝、讯飞输入法** ，不要监听手势事件。

# 本文知乎地址

由于博客留言交流不方便，点赞或者交流，可以移步本文的知乎界面
[知乎 - Android 平台应用宝和讯飞输入法无障碍服务导致的全局卡顿分析](https://zhuanlan.zhihu.com/p/55585722)

# 关于我

小厂系统研发工程师 , 更多信息可以点击 [关于我](https://www.androidperformance.com/about/) , 非常希望和大家一起交流 , 共同进步 .

> **一个人可以走的更快 , 一群人可以走的更远**

原文作者：[Gracker](https://androidperformance.com/)

原文链接：https://androidperformance.com/2019/01/21/android-performance-case-jank-accessbility/

发表日期：[一月 21日 2019, 12:22:22 凌晨](https://androidperformance.com/2019/01/21/android-performance-case-jank-accessbility/)

更新日期：[November 4th 2019, 10:42:51 pm](https://androidperformance.com/2019/01/21/android-performance-case-jank-accessbility/)

版权声明：本文采用[知识共享署名-非商业性使用 4.0 国际许可协议](http://creativecommons.org/licenses/by-nc/4.0/)进行许可