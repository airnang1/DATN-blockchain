FROM node:14-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

#Serve (production)
FROM nginx:1.23.2-alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3003

CMD ["nginx", "-g", "daemon off;"]
