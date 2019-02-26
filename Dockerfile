# /Dockerfile
FROM node:8-alpine as builder
WORKDIR /project
COPY . /project/
RUN yarn \
    && yarn global add hexo-cli \
    && hexo g

FROM nginx:alpine
COPY --from=builder /project/public /usr/share/nginx/html
RUN apk add --no-cache bash
