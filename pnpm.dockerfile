#!/usr/bin/env -S docker build --tag pnpm . --file
FROM debian:bullseye-slim
ENV PNPM_HOME=$HOME/.local/share/pnpm
ENV PATH=$PATH:$PNPM_HOME
RUN apt update
RUN apt install curl --yes
RUN curl -fsSL https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -
RUN pnpm env use -g lts
RUN pnpm add -g pnpm

FROM debian:bullseye-slim
ENV PNPM_HOME=$HOME/.local/share/pnpm
ENV PATH=$PATH:$PNPM_HOME
COPY --from=0 $PNPM_HOME $PNPM_HOME
