restart:
	git checkout .
	git pull origin master
	yarn install
	hexo clean
	hexo generate
	docker rm -f hexo
	docker rmi hexo:latest
	docker build -t hexo:latest  .
	docker run -d -p 80:80 --name hexo hexo:latest

start:
	hexo clean
	git checkout .
	git pull origin master
	yarn install
	hexo generate
	docker build -t hexo:latest  .
	docker run -d -p 80:80 --name hexo hexo:latest
rm:	
	docker rm -f hexo
rmi:
	docker rmi hexo:latest
commit-update:
	git add .
	git commit -m 'update article'
	git push origin myblog
commit-add:
	git add .
	git commit -m 'add article'
	git push origin myblog
deploy:
	make commit-update
	hexo d -g