# Stage 1: Build the Angular application
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist/arabic-frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]