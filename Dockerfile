FROM --platform=linux/amd64 node:18.18

WORKDIR /usr/src/app

# Copy only package.json and yarn.lock for dependency installation
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application files, including tsconfig.json
COPY . ./

# Build the application
RUN yarn build

# Expose the application's port
EXPOSE 4002

# Start the application
CMD ["yarn", "start:prod"]
