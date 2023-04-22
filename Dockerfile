#!/usr/bin/env -S docker build --tag ansi-docs . --file
FROM pnpm
WORKDIR /opt/ansi-docs
ADD package.json .
ADD pnpm-lock.yaml .
RUN pnpm install
ADD dist .
CMD [ "node", "server.js" ]
