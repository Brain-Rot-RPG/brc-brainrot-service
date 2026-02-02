FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY src ./src
COPY tsconfig.json .
RUN npm run build

ENV PORT=4001
EXPOSE 4001

CMD ["npm", "start"]
