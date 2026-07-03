FROM jenkins/jenkins:lts-jdk17

USER root

# 기본 패키지 설치
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# Node.js 20 설치
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Docker CLI 설치
RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | \
    gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg && \
    echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/debian \
    $(. /etc/os-release && echo $VERSION_CODENAME) stable" | \
    tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && \
    apt-get install -y docker-ce-cli

# Jenkins 사용자 Docker 사용 권한
RUN groupadd -f docker && usermod -aG docker jenkins

USER jenkins