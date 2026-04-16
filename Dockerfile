# make me a Dockerfile for statis NextJS

FROM node:22-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json .
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Copy built application from base stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]