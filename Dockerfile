FROM node

WORKDIR /usr/app

COPY ./package.json /user/app
COPY . /usr/app

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
