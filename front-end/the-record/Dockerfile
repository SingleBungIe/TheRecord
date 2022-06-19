FROM node:lts-alpine as build-stage
WORKDIR /the-record

COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf/default.conf /etc/nginx/conf.d/default.conf
COPY ./certbot/conf/options-ssl-nginx.conf /etc/letsencrypt/
COPY ./certbot/conf/live/the-record.co.kr/*.pem /etc/letsencrypt/live/the-record.co.kr/
COPY ./certbot/conf/*.pem /etc/letsencrypt/
COPY --from=build-stage /the-record/build /the-record/build


EXPOSE 3000

VOLUME [ "/home/ubuntu/deploy/dockerMount/frontendVol:/etc/nginx/conf.d", "/home/ubuntu/deploy/dockerMount/frontendVol/conf:/etc/letsencrypt", "/home/ubuntu/deploy/dockerMount/frontendVol/certbot/www:/var/www/certbot" ]
CMD ["nginx", "-g", "daemon off;"]