---
title: "Ubuntu 20.04 配置"
date: 2023-01-06 10:43:00+08:00
draft: false
tags: ["Linux", "Ubuntu"]
---

大概就是我重装了 n 遍 Ubuntu，终于在截止目前重装的倒数第二遍的时候脑瓜子突然灵光一闪，想起来把基本的一些配置全部记下，万一下次还要重装就不用再去一个个搜了。结果，没想到这个万一来的这么快:sob:，更让人难受的是当时这个文件就放在 Ubuntu 桌面上，但是 Ubuntu 已经完全进不去了，后面只好想办法从 windows 上面把文件搞出来

## 换源

```sh
# sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
# sudo gedit /etc/apt/sources.list

# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse

# sudo apt
```

### 输入法

[搜狗输入法][]

## 字体

```sh
sudo unzip -d ~/.local/share/fonts JetBrainsMono.zip
sudo unzip -d ~/.local/share/fonts Noto_Sans_SC.zip

sudo fc-cache -f -v
```

## clash

1. [Fclash][] simple Clash GUI

2. [clashrup][] Simple CLI to manage your systemd `clash.service` and config subscriptions on Linux.

3. 手动

命令行运行 `clash`

替换 `~.config/clash/config.yaml`

开机自启动

```sh
# /etc/systemd/system/clash.service

[Unit]
Description=Clash service
After=network.target

[Service]
Type=simple
User=jalen（用户名）
ExecStart=/home/jalen/app/clash（Clash 程序路径）
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```sh
# 重载服务
sudo systemctl daemon-reload
# 开机启动
sudo systemctl enable clash
# 启动服务
sudo systemctl start clash
# 查看服务状态
sudo systemctl status clash
```

set proxy

```sh
export http_proxy=http://127.0.0.1:7890
export https_proxy=https://127.0.0.1:7890
```

## zsh

install `zsh`

```sh
sudo apt install zsh
```

install `oh-my-zsh`

```sh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

set `zsh` to default Shell environment

```sh
chsh -s $(which zsh)
```

theme

```sh
ZSH_THEME="half-life"
```

### zsh-autosuggestions

suggests commands as you type based on history and completions.

```sh
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

Add the plugin to the list of plugins for Oh My Zsh to load (inside ~/.zshrc):

```sh
plugins=( 
    # other plugins...
    zsh-autosuggestions
)
```

### zsh-syntax-highlighting

highlight for `zsh` command

```sh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Activate the plugin in ~/.zshrc:

```sh
plugins=( [plugins...] zsh-syntax-highlighting)
```

### autojump

快速跳转不同的目录、路径、文件夹

将 `python` 指向 `pyhton3`

```sh
sudo ln -s /usr/bin/python3 /usr/bin/python
sudo ln -s /usr/bin/pip3 /usr/bin/pip
```

安装

```bash
git clone https://github.com/wting/autojump.git
cd autojump
./install.py
```

add to `~/.zshrc`

```sh
[[ -s /home/jalen/.autojump/etc/profile.d/autojump.sh ]] && source /home/jalen/.autojump/etc/profile.d/autojump.sh

autoload -U compinit && compinit -u
```

## Git

```sh
git config --global user.name "Jalen"
git config --global user.email "jalenzzz@qq.com"

ssh-keygen -t rsa -C "jalenzzz@qq.com"
cat ~/.ssh/id_rsa.pub
```

## GPG

```sh
gpg --import public.key
gpg --import private.key

git config --global user.signingkey "GPG Key ID"
git config --global commit.gpgsign true
```

## 屏幕旋转

```sh
# sudo gedit  /etc/X11/Xsession.d/55gnome-session_gnomerc

xrandr  --output Virtual1 --rotate left
```

## Gnome

### theme

```sh
git clone https://github.com/vinceliuice/WhiteSur-gtk-theme.git
cd WhiteSur-gtk-theme
./install.sh -i ubuntu
# GDM theme
sudo ./tweaks.sh -g

# icons
git clone https://github.com/vinceliuice/WhiteSur-icon-theme.git
cd hiteSur-icon-theme
./install.sh -b

# Gnome Backgrounds
git clone https://github.com/vinceliuice/WhiteSur-wallpapers.git
cd WhiteSur-wallpapers
sudo ./install-gnome-backgrounds.sh

# Grub Theme
git clone https://github.com/vinceliuice/grub2-themes.git
cd grub2-themes
sudo ./install.sh -t whitesur -i whitesur -s ultrawide2k
```

### extension

[User Themes][]

[Dash to Dock][]

[Clipboard Indicator][]

[Coverflow Alt-Tab][]

[Custom Hot Corners][]

[Places Status Indicator][]

[Top Panel Workspace Scroll][]

## 软件

[ukylin software archive][]

[Spark Store][]

<!-- END -->

[搜狗输入法]: https://shurufa.sogou.com/linux/guide
[Fclash]: https://github.com/Kingtous/Fclash
[clashrup]: https://github.com/spencerwooo/clashrup

[User Themes]: https://extensions.gnome.org/extension/19/user-themes/
[Dash to Dock]: https://extensions.gnome.org/extension/307/dash-to-dock/
[Clipboard Indicator]: https://extensions.gnome.org/extension/779/clipboard-indicator/
[Coverflow Alt-Tab]: https://extensions.gnome.org/extension/97/coverflow-alt-tab/
[Custom Hot Corners]: https://extensions.gnome.org/extension/1362/custom-hot-corners/
[Places Status Indicator]: https://extensions.gnome.org/extension/8/places-status-indicator/
[Top Panel Workspace Scroll]: https://extensions.gnome.org/extension/701/top-panel-workspace-scroll/

[ukylin software archive]: https://archive.ubuntukylin.com/software/pool/partner/
[Spark Store]: https://www.spark-app.store/download
