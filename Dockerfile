FROM registry.dpool.sina.com.cn/library/nginx:alpine

ADD nginx.conf /etc/nginx/nginx.conf
ADD public/ /var/www/html/
