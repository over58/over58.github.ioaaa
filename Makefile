restart:
	git checkout .
	git pull origin master
	#cnpm install
	hexo clean
	hexo generate
	docker rm -f blog
	docker rmi blog:latest
	docker build -t blog:latest  .
	docker run -d -p 8080:80 --name blog blog:latest

start:
	git checkout .
	git pull origin master
	#cnpm install
	hexo clean
	hexo generate
	docker build -t blog:latest  .
	docker run -d -p 8080:80 --name blog blog:latest
rm:	
	docker rm -f blog
rmi:
	docker rmi blog:latest
commit-update:
	git add .
	git commit -m 'update article'
	git push origin master
commit-add:
	git add .
	git commit -m 'add article'
	git push origin master
