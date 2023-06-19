FROM node:16-alpine AS install-dependencies

WORKDIR /user/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production=false

COPY . .

FROM node:16-alpine AS build

WORKDIR /user/src/app

COPY --from=install-dependencies /user/src/app ./

RUN yarn build

FROM nginx:1.25.1-alpine

COPY --from=build /user/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
