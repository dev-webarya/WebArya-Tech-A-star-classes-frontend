# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all application files
# NOTE: This will include your .env file so Vite can securely bake the VITE_ 
# variables into the static production bundle during the build step.
COPY . .

# Build the React application
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy built assets to Nginx server directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default Nginx configuration to properly serve Single Page Applications like React.
# This prevents 404 errors when refreshing the page on routes managed by React Router.
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $$uri $$uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
