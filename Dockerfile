FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all application files
# NOTE: This will include your .env file so Vite can bake the VITE_ 
# variables into the static production bundle during the build step.
COPY . .

# Build the React application
RUN npm run build

# Expose Vite's default preview port
EXPOSE 4173

# Start the Vite preview server, serving the built assets
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
