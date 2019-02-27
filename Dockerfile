FROM nginx:latest
RUN apt-get install -y npm
RUN npm install -g cnpm
RUN npm install
RUN npm install -g hexo-cli
RUN hexo generate
ADD nginx.conf /etc/nginx/nginx.conf
ADD public/ /var/www/html/