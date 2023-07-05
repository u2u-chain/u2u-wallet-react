FROM node:16-alpine AS install-dependencies

WORKDIR /user/src/app

COPY package.json package-lock.json .npmrc ./

RUN npm install --frozen-lockfile --production=false

COPY . .

FROM node:16-alpine AS build

WORKDIR /user/src/app

COPY --from=install-dependencies /user/src/app ./

ENV VITE_APP_API_BASE=https://u2-api.uniultra.xyz
ENV VITE_APP_NODE_ADDRESS=13.250.24.138:50211
ENV VITE_APP_NODE_ACCOUNT_ID=3
ENV VITE_APP_SCAN_API_BASE=https://apitestscan.uniultra.xyz

RUN npm run build

FROM nginx:1.25.1-alpine

COPY --from=build /user/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
