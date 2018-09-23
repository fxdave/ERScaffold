FROM node:9.4.0-alpine

ENV http_proxy http://proxy.vekoll.uni-pannon.hu:3128
ENV https_proxy http://proxy.vekoll.uni-pannon.hu:3128
ENV HTTP_PROXY http://proxy.vekoll.uni-pannon.hu:3128
ENV HTTPS_PROXY http://proxy.vekoll.uni-pannon.hu:3128

WORKDIR /usr/app
COPY webpack.config.js ./
COPY package.json ./ # change
COPY dist ./dist
COPY index.html ./

RUN npm install -qy #asd

EXPOSE 3000

CMD ["npm", "start"]