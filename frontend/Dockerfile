FROM node:20

WORKDIR /app
COPY . .
RUN npm install && npm run build

# Usar un servidor estático para servir el frontend
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
