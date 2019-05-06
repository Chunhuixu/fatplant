FROM node:11-alpine
ADD . /fatplant
WORKDIR /fatplant
RUN npm install pm2 -g
RUN npm install babel-cli -g
RUN npm install
RUN npm rebuild node-sass
EXPOSE 3000
CMD ["pm2-runtime", "--interpreter", "babel-node", "/fatplant/app.js"]
