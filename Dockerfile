# Base image with Node.js and slim variant to reduce image size
FROM node:19.6-bullseye-slim AS base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the package files (package.json, package-lock.json) for layer caching
COPY package*.json ./

# Development stage
FROM base AS development

# Cache npm dependencies
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm install

# Copy all files for development (this will include source code)
COPY . .

# Expose port 3000 for the development server
EXPOSE 3000

# Command to run the app in development mode
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production

# Cache npm dependencies
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm ci --only=production

# Switch to non-root user (security best practice)
USER node

# Copy the source code and set file ownership
COPY --chown=node:node . ./

# Expose port 3000 for the production server
EXPOSE 3000

# Command to run the app in production mode
CMD ["node", "index.js"]