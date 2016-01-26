FROM node:0.12-slim
MAINTAINER Markus Dulghier <markus@dulghier.com>

EXPOSE 3000
ENV NODE_ENV=production
WORKDIR /app

COPY package.json /app/package.json
RUN npm install
COPY . /app

CMD ["node", "app.js"]
