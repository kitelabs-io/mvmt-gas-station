FROM node:18-alpine3.20 AS builder

# Update CA certificates and add necessary tools
RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

# Copy package.json and yarn.lock (if exists) first to leverage Docker cache
COPY package.json yarn.lock* ./
COPY packages/common/package.json ./packages/common/
COPY packages/gas-station/package.json ./packages/gas-station/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the gas-station package
RUN yarn workspace gas-station build

# Production image
FROM node:18-alpine3.20

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/packages/gas-station/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/gas-station/package.json ./
COPY --from=builder /app/packages/gas-station/next.config.mjs ./

# Set the command to run the application
CMD ["yarn", "start"]
