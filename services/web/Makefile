.PHONY: all clean install build

all: clean install build

clean:
	rm -rf node_modules

install: clean
	npm install

build: install
	docker build -t mdulghier/workshop-web:local .

build-pro:
	docker build -t mdulghier/workshop-web:build -f Dockerfile.build .
	docker run --rm mdulghier/workshop-web:build > app.tgz
	docker build -t mdulghier/workshop-web:dist -f Dockerfile.dist .

run-fg:
	docker run --rm \
				-p 3000:3000 \
				--env-file ../../config/web-env.list \
				--name web \
				--link redis:redis \
				mdulghier/workshop-web:local

run-bg:
	docker run -d \
				-p 3000:3000 \
				--env-file ../../config/web-env.list \
				--link redis:redis \
				--name web \
				mdulghier/workshop-web:local
	
run: run-fg

stop:
	docker stop web || true
	docker rm web || true

test-unit:
	@echo > /dev/null; \
	docker run --rm mdulghier/workshop-web:local ./node_modules/.bin/mocha test/unit.js

PWD = $(shell pwd)

test-integration:
	@echo > /dev/null; \
	REDISCID=$$(docker run -d redis); \
	REDISNAME=$$(docker inspect --format='{{.Name}}' $$REDISCID | sed 's/.//'); \
	CID=$$(docker run -d --link $$REDISNAME:redis -e REDISHOST=redis -v $(PWD):/app mdulghier/workshop-web:local); \
	CNAME=$$(docker inspect --format='{{.Name}}' $$CID | sed 's/.//'); \
	docker run --rm -e APP_ADDRESS=http://web:3000 --link $$CNAME:web mdulghier/workshop-web:local ./node_modules/.bin/mocha test/integration.js; \
	TEST_RESULT=$$?; \
	docker rm -f -v $$CNAME > /dev/null; \
	docker rm -f -v $$REDISNAME > /dev/null; \
	exit $$TEST_RESULT

test-ui:
	@echo > /dev/null; \
	REDISCID=$$(docker run -d redis); \
	REDISNAME=$$(docker inspect --format='{{.Name}}' $$REDISCID | sed 's/.//'); \
	CID=$$(docker run -d -P --link $$REDISNAME:redis -e REDISHOST=redis -v $(PWD):/app mdulghier/workshop-web:local); \
	CNAME=$$(docker inspect --format='{{.Name}}' $$CID | sed 's/.//'); \
	SELENIUM_CID=$$(docker run -d -P --link $$CNAME:web --link $$CNAME:web mdulghier/selenium-phantomjs); \
	SELENIUM=$$(docker inspect --format='{{.Name}}' $$SELENIUM_CID | sed 's/.//'); \
	SELENIUM_PORT=$$(docker inspect --format='{{(index (index .NetworkSettings.Ports "4444/tcp") 0).HostPort}}' $$SELENIUM); \
	until $$(curl --output /dev/null --silent --head --fail http://localhost:$$SELENIUM_PORT); do \
	    printf '.'; \
		sleep 1; \
	done; \
	echo "Selenium ready..."; \
	docker run --rm -v $(PWD):/app \
		--link $$CNAME:web \
		--link $$SELENIUM:selenium \
		-e APP_ADDRESS=http://web:3000 \
		mdulghier/workshop-web:local /app/node_modules/.bin/mocha test/ui.js; \
	TEST_RESULT=$$?; \
	docker rm -f -v $$CNAME > /dev/null; \
	docker rm -f -v $$REDISNAME > /dev/null; \
	docker rm -f -v $$SELENIUM > /dev/null; \
	exit $$TEST_RESULT
