FROM node:latest AS builder
LABEL maintainer="Ruhan de Oliveira Baiense"
WORKDIR /usr/src/app
COPY ./app/package*.json ./
RUN npm install
COPY ./app .
RUN npm run build

FROM nginx:latest
COPY /docker/config/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist /etc/nginx/html/public
# RUN chmod 755 -R /etc/nginx/html/public
EXPOSE 80 443
ENTRYPOINT ["nginx"]
# Parametros extras para o entrypoint
CMD ["-g", "daemon off;"]