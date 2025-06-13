FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY . ./

ARG PROJECT_NAME=QLDV_KiemNghiem_BE
# Chỉ restore mà không chỉ định runtime
RUN dotnet restore "$PROJECT_NAME/$PROJECT_NAME.csproj"

# Publish với cấu hình đơn giản
RUN dotnet publish "$PROJECT_NAME/$PROJECT_NAME.csproj" \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
ENV ASPNETCORE_ENVIRONMENT=Production
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80
ENTRYPOINT ["dotnet", "QLDV_KiemNghiem_BE.dll"]

