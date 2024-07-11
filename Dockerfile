FROM node:18.12.1-buster-slim as deploy
COPY . /deploy
WORKDIR /deploy
RUN npm install && npm run build

FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=deploy /deploy/public /usr/share/nginx/html
EXPOSE 8080 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
