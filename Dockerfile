# Stage 1: Build the Angular application
FROM node:lts-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN NODE_OPTIONS=--openssl-legacy-provider npm run build --configuration=production

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist/arabic-frontend /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]