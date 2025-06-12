#Giai đoạn 1: Runtime image nhẹ chỉ để chạy ứng dụng
FROM node:18-alpine AS build

WORKDIR /app
# Thiết lập thư mục làm việc trong container

# Cấu hình để React lắng nghe trên mọi địa chỉ IP, cổng 80
COPY package*.json ./
# Copy tất cả các file csproj của các project con

#Copy toàn bộ source code vào container
COPY . .

#Tạo lại cấu trúc thư mục dựa trên tên csproj để restore đúng
RUN npm install 

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
