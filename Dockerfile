# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app

# Take the API Key from the build setting
ARG GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$GEMINI_API_KEY

COPY package*.json ./
RUN npm install
COPY . .

# Create the .env.local file for the build process
RUN echo "VITE_GEMINI_API_KEY=${GEMINI_API_KEY}" > .env.local

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the build output to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
