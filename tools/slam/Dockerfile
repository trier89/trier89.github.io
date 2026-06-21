# 360 영상 → 카메라 궤적(SLAM) 로컬 파이프라인
# Stella-VSLAM을 헤드리스로 빌드해 run_video_slam 하나만 노출한다.
# 최초 빌드에 20~40분 걸리지만 이후에는 이미지가 재사용된다.
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential cmake git pkg-config wget ca-certificates \
    ffmpeg \
    libeigen3-dev libopencv-dev libyaml-cpp-dev \
    libgoogle-glog-dev libgflags-dev \
    libsqlite3-dev libsuitesparse-dev libatlas-base-dev \
    libavcodec-dev libavformat-dev libswscale-dev \
 && rm -rf /var/lib/apt/lists/*

# FBoW (stella-cv 포크: ORB vocabulary 로더)
RUN git clone --depth 1 https://github.com/stella-cv/FBoW.git /tmp/FBoW \
 && cmake -S /tmp/FBoW -B /tmp/FBoW/build -DCMAKE_BUILD_TYPE=Release \
 && cmake --build /tmp/FBoW/build -j"$(nproc)" \
 && cmake --install /tmp/FBoW/build \
 && rm -rf /tmp/FBoW

# g2o (stella_vslam이 검증한 시점의 태그 고정)
RUN git clone https://github.com/RainerKuemmerle/g2o.git /tmp/g2o \
 && git -C /tmp/g2o checkout 20230223_git \
 && cmake -S /tmp/g2o -B /tmp/g2o/build -DCMAKE_BUILD_TYPE=Release \
      -DBUILD_SHARED_LIBS=ON -DG2O_BUILD_APPS=OFF -DG2O_BUILD_EXAMPLES=OFF \
      -DG2O_USE_OPENGL=OFF \
 && cmake --build /tmp/g2o/build -j"$(nproc)" \
 && cmake --install /tmp/g2o/build \
 && rm -rf /tmp/g2o

# stella_vslam 본체 (뷰어 없이 빌드)
RUN git clone --recursive --depth 1 https://github.com/stella-cv/stella_vslam.git /tmp/stella \
 && cmake -S /tmp/stella -B /tmp/stella/build -DCMAKE_BUILD_TYPE=Release \
 && cmake --build /tmp/stella/build -j"$(nproc)" \
 && cmake --install /tmp/stella/build \
 && rm -rf /tmp/stella \
 && ldconfig

# 실행 바이너리 (run_video_slam) — 헤드리스이므로 뷰어 비활성화
RUN git clone --recursive --depth 1 https://github.com/stella-cv/stella_vslam_examples.git /tmp/ex \
 && cmake -S /tmp/ex -B /tmp/ex/build -DCMAKE_BUILD_TYPE=Release \
      -DUSE_PANGOLIN_VIEWER=OFF -DUSE_SOCKET_PUBLISHER=OFF \
 && cmake --build /tmp/ex/build -j"$(nproc)" \
 && cp /tmp/ex/build/run_video_slam /usr/local/bin/ \
 && rm -rf /tmp/ex

# ORB vocabulary (특징점 사전)
RUN mkdir -p /opt/vocab \
 && wget -q -O /opt/vocab/orb_vocab.fbow \
    https://github.com/stella-cv/FBoW_orb_vocab/raw/main/orb_vocab.fbow

COPY process.sh /usr/local/bin/process.sh
RUN chmod +x /usr/local/bin/process.sh

WORKDIR /data
ENTRYPOINT ["/usr/local/bin/process.sh"]
