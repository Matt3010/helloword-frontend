# Stage 1: Build the Angular application
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code and build for production
COPY . .
RUN npm run build -- --configuration production

# ---

# Stage 2: Serve the application with Nginx
FROM nginx:1.27-alpine

# Copy the built application from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Change ownership of Nginx directories to the nginx user
# This allows the non-root process to write necessary temp/cache files.
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Best practice: run Nginx as a non-root user
USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
