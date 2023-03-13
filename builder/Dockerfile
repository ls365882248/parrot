FROM node:16.15.1 as builder

WORKDIR /app
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock
# ADD .yarnrc /app/.yarnrc
RUN yarn
ADD . /app

# env
ARG SET_CI_COMMIT_SHA=dev
ENV CI_COMMIT_SHA ${SET_CI_COMMIT_SHA}

# build
# RUN yarn lint
RUN yarn build

# nginx
FROM dockerhub.datagrand.com/frontend_utils/nginx:1.22.1
RUN mkdir -p web/logs

COPY --from=builder app/dist/ /web/dist/
# ADD build/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
