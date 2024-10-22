FROM node:18-alpine3.20

# Update CA certificates and add necessary tools
RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app

# Copy package.json and yarn.lock (if exists) first to leverage Docker cache
COPY package.json yarn.lock* ./
COPY packages/common/package.json ./packages/common/
COPY packages/gas-station/package.json ./packages/gas-station/

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Build the gas-station package
RUN yarn workspace gas-station build

# Set the command to run the application
CMD ["yarn", "workspace", "gas-station", "start"]
