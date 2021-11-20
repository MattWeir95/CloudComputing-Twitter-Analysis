FROM node:16

# set working directory
WORKDIR /app

# install app dependencies
COPY package*.json ./

# install dependencies
RUN npm i

ARG REACT_APP_IP
ENV REACT_APP_IP $REACT_APP_IP

# add app
COPY . .

# start app
CMD ["npm", "start"]