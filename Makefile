restart:
	git pull origin master
	rm -rf public
	hexo generate
	make commit-update
	docker rm -f blog
	docker rmi blog:latest
	docker build -t blog:latest  .
	docker run -d -p 8080:80 --name blog blog:latest

start:
	git pull origin master
	rm -rf public
	hexo generate
	make commit-update
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
