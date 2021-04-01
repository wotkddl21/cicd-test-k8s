FROM node:12.2.0-alpine

# set working directory
COPY . .
WORKDIR /react-test/client
RUN npm install


WORKDIR /react-test
RUN npm install 
# 앱 실행
CMD ["npm", "run", "dev"]
