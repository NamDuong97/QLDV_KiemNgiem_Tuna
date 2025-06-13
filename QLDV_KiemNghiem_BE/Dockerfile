#Giai đoạn 1: Runtime image nhẹ chỉ để chạy ứng dụng
FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /app
# Thiết lập thư mục làm việc trong container
EXPOSE 80
# Mở cổng 80 để ứng dụng có thể truy cập từ bên ngoài
ENV ASPNETCORE_URLS=http://+:80
# Cấu hình để ASP.NET Core lắng nghe trên mọi địa chỉ IP, cổng 80

#Giai đoạn 2: SDK image dùng để build source code
FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build
WORKDIR /src
# Thư mục làm việc cho quá trình build

#Copy file .sln (nếu có) và tất cả các file .csproj vào thư mục build
COPY ./*.sln .
# Copy file solution nếu có (có thể bỏ nếu không dùng)
COPY */*.csproj ./
# Copy tất cả các file csproj của các project con

#Tạo lại cấu trúc thư mục dựa trên tên csproj để restore đúng
RUN for proj in ./*.csproj; do \
    mkdir -p "$(basename "$proj" .csproj)" && \
    mv "$proj" "$(basename "$proj" .csproj)"/; \
    done

#Restore tất cả các project (tải dependency về)
RUN for dir in */; do dotnet restore "$dir"; done

#Copy toàn bộ source code vào container
COPY . .

#Build toàn bộ solution ở chế độ Release và xuất ra thư mục tạm
ARG PROJECT_NAME=QLDV_KiemNghiem_BE
WORKDIR /src/${PROJECT_NAME}
RUN dotnet build ${PROJECT_NAME}.csproj --configuration Release --output /app/build

#Giai đoạn 3: Publish ứng dụng (tối ưu kích thước, loại bỏ file không cần thiết)
FROM build AS publish
RUN dotnet publish --configuration Release --output /app/publish /p:UseAppHost=false

#Giai đoạn 4: Tạo image cuối cùng chỉ chứa runtime + code đã publish
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# Copy code đã publish từ bước trước sang image cuối

#Chạy ứng dụng bằng file DLL tương ứng với tên project
ENTRYPOINT ["dotnet", "QLDV_KiemNghiem_BE.dll"]
