FROM node

WORKDIR /app

COPY package*.json .

RUN npm i

ARG TWITTER_STREAM_IP
ENV TWITTER_STREAM_IP $TWITTER_STREAM_IP


COPY  . .

CMD ["node", "client-server.js"];
