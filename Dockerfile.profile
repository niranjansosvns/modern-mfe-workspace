# Stage 1: Build the Remote application
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps 
COPY . .
RUN npx ng build shared-assets --configuration production
RUN npx ng build profile-mfe --configuration production

# Stage 2: Serve using Nginx
FROM nginx:alpine
# Fixed path: Removed /browser to match direct root build output location
COPY --from=build /app/dist/profile-mfe /usr/share/nginx/html
COPY nginx.profile.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
