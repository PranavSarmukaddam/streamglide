# Base image
FROM node:18-alpine

# Install system dependencies (python3 for yt-dlp, ffmpeg for media merging)
RUN apk add --no-cache python3 ffmpeg

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the server port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
