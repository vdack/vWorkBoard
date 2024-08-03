# 使用 MySQL 官方镜像作为基础镜像
FROM mysql:latest

# 将初始化脚本复制到镜像中的 /docker-entrypoint-initdb.d 目录
COPY vwbdb_script.sql /docker-entrypoint-initdb.d/

ENV MYSQL_ROOT_PASSWORD=rootpassword