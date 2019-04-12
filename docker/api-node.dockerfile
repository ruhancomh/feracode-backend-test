FROM node:latest
LABEL maintainer="Ruhan de Oliveira Baiense"
COPY ./api/package.json /var/www/package.json
WORKDIR /var/www
RUN npm install
ENTRYPOINT [ "npm", "start" ]
EXPOSE 3000