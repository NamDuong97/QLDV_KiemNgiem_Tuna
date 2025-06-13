#Giai đoạn 1: Cài đặt image kế thừa
FROM node:18-alpine AS build

WORKDIR /app
# Thiết lập thư mục làm việc trong container

COPY package*.json ./
# Copy tất cả các file package

#Copy toàn bộ source code vào container
COPY . .

#Cài lại chương trình các thư viện
RUN npm install

# Build dự án
RUN npm run build

# Xuất dự án tại cổng 3000 trong containner
EXPOSE 3000

# Cuối cùng chạy câu lệnh để khởi động dự án
CMD ["npm", "run", "dev"]
