# Use an official Node.js runtime as a parent image
FROM node:18

# Install Python and build-essential for node-gyp
RUN apt-get update && apt-get install -y python3 python3-dev python3-pip build-essential

# Set Python version for npm to use
RUN npm config set python /usr/bin/python3

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
