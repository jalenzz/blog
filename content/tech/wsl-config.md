---
title: "WSL 配置"
date: 2023-11-29 15:17:41+08:00
draft: false
tags: ["WSL", "Windows"]
---

## WSL

适用于 Linux 的 Windows 子系统

适用于 Linux 的 Windows 子系统可让开发人员按原样运行 GNU/Linux 环境 - 包括大多数命令行工具、实用工具和应用程序 - 且不会产生传统虚拟机或双启动设置开销。

说人话：通过 WSL 我们可以在 Windows 使用完整的 Linux 系统

> [什么是适用于 Linux 的 Windows 子系统？](https://learn.microsoft.com/zh-cn/windows/wsl/about)

### WSL and WSL2

WSL 2 是适用于 Linux 的 Windows 子系统体系结构的一个新版本，它支持适用于 Linux 的 Windows 子系统在 Windows 上运行 ELF64 Linux 二进制文件。它的主要目标是提高文件系统性能，以及添加完全的系统调用兼容性。

| 功能                                | WSL 1 | WSL 2 |
| --------------------------------- | ----- | ----- |
| Windows 和 Linux 之间的集成             | ✅     | ✅     |
| 启动时间短                             | ✅     | ✅     |
| 与传统虚拟机相比，占用的资源量少                  | ✅     | ✅     |
| 可以与当前版本的 VMware 和 VirtualBox 一起运行 | ✅     | ✅     |
| 托管 VM                             | ❌     | ✅     |
| 完整的 Linux 内核                      | ❌     | ✅     |
| 完全的系统调用兼容性                        | ❌     | ✅     |
| 跨 OS 文件系统的性能                      | ✅     | ❌     |
| systemd 支持                        | ❌     | ✅     |
| IPv6 支持                           | ❌     | ✅     |

> 详见 [比较 WSL 版本](https://learn.microsoft.com/zh-cn/windows/wsl/compare-versions)

## WSL 2 的安装

以 Ubuntu 22.04 为例

### 开启 Windows 附加功能「适用于 Linux 的 Windows 子系统」

以管理员身份打开 PowerShell 终端并运行

```powershell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

重启电脑

### 安装 Ubuntu 22.04

#### 通过微软商店安装

微软官方支持的 WSL Linux 发行版可以直接从微软商店下载

查看可通过在线商店获得的 Linux 发行版列表

```powershell
wsl --list --online
```

可以直接在 微软商店 中搜索对应发行版进行安装

<!-- ![]() -->

也可以在通过命令行安装指定版本（默认安装 Ubuntu）

```powershell
wsl --install
```

如需指定发行版本

```powershell
wsl --install -d Ubuntu-22.04
```

#### 通过联机渠道安装

使用 `--web-download` 通过联机渠道安装，而不是使用 Microsoft Store 安装

```powershell
wsl --install -d Ubuntu-22.04 --web-download
```

~~都是微软家的服务器，下载速度都是一坨~~

<!-- ![]() -->

成功安装之后，开始菜单中应该已经出现了 Ubuntu 的图标，点击打开进行初始化

### 将 WSL 版本设置为 2

如果是微软商店安装的 Ubuntu，默认是 WSL 2，不需要手动设置

可以通过在 PowerShell 中输入以下命令查看正在运行的 WSL 版本

```powershell
wsl --list --verbose
```

执行以下命令将发行版设置为 WSL 2 支持，`<Distro>` 为 Linux 发行版名称

```powershell
wsl --set-version <Distro> 2
```

也可以通过以下命令设置默认 WSL 版本

对于安装新的 Linux 发行版，默认使用 WSL 2

```powershell
wsl --set-default-version 2
```

## 配置 Shell 环境

### 终端

推荐 Windows Terminal，微软在 2019 年发布的新一代 Windows 终端工具，好看好用还能直接识别本机安装的全部 WSL 环境

<!-- ![]() -->

Windows 11 应该默认安装，如果没有也可以通过微软商店安装

### 代理配置

WSL 2.0 支持和 Windows 使用相同的网络，只需要在 `%userprofile%\.wslconfig` 中设置

```sh
[experimental]
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true
```

> WSL 2.0 以前版本参考 [WSL2 的一些网络访问问题 - 野声 (cat.ms)](https://cat.ms/wsl2-network-tricks)

### APT 换源

备份源文件

```bash
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bac
```

修改 `/etc/apt/sources.list` 为以下内容（22.04 版本）

```sh
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
# deb-src http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
# # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
```

> 其他版本详见 [ubuntu | 镜像站使用帮助 | 清华大学开源软件镜像站](https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/)

更新 apt 缓存和软件

```bash
sudo apt update && sudo apt upgrade
```

### zsh

Ubuntu 默认 shell 环境 `bash` 提供了基础的命令行交互功能，这边非常推荐 `zsh`，有丰富的插件和主题~~（好看是第一生产力）~~

安装 `zsh`

```bash
sudo apt install zsh
```

安装 [oh-my-zsh](https://ohmyz.sh/)，`zsh` 配置管理工具：

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

如果安装 `oh-my-zsh` 时没有将 `zsh` 设为默认 shell 环境，可以通过以下命令

```bash
chsh -s $(which zsh)
```

<!-- ![]() -->

#### 插件

##### zsh-autosuggestions

根据历史记录和完成情况在输入时提示命令

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

在 `~/.zshrc` 中添加

```bash
plugins=( 
    # other plugins...
    zsh-autosuggestions
)
```

##### zsh-syntax-highlighting

为 `zsh` 命令提供高亮

```sh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

在 `~/.zshrc` 中添加

```bash
plugins=( 
    # other plugins...
    zsh-syntax-highlighting
)
```

### autojump

快速跳转不同的目录、路径、文件夹

将 `python` 指向 `pyhton3`

```sh
sudo ln -s /usr/bin/python3 /usr/bin/python
```

安装

```bash
git clone https://github.com/wting/autojump.git
cd autojump
./install.py
```

在 `~/.zshrc` 中添加（`${username}` 替换为你的用户名）

```sh
[[ -s /home/${username}/.autojump/etc/profile.d/autojump.sh ]] && source /home/${username}/.autojump/etc/profile.d/autojump.sh

autoload -U compinit && compinit -u
```

#### 主题

`oh-my-zsh` 提供了非常多漂亮的主题

[Themes · ohmyzsh/ohmyzsh Wiki (github.com)](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

可以直接在 `~/.zshrc` 文件中修改（`${theme-name}` 替换为上面链接中的主题名）

```bashag-0-1hgd329akag-1-1hgd329ak
ZSH_THEME="${theme-name}"
```

##### Starship

`oh-my-zsh` 提供了的主题挺多的，不过我还是选择 [Starship: Cross-Shell Prompt](https://starship.rs/)

安装

```bash
curl -sS https://starship.rs/install.sh | sh
```

在 `~/.zshrc` 末尾添加

```bash
eval "$(starship init zsh)"
```

> 我的 `.zshrc` 和 `starship` 配置 [jalenzz/dotfiles](https://github.com/jalenzz/dotfiles)
