FROM node:14-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve the built app using a simple static server
RUN npm install -g serve
CMD ["serve", "-s", "build"]