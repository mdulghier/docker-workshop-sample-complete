.PHONY: all clean install build

all: clean install build

clean:
	rm -rf node_modules

install: clean
	npm install

build: install
	docker build -t mdulghier/workshop-worker:local .

run-fg:
	docker run --rm \
				--env-file ../../config/worker-env.list \
				--link redis:redis \
				--link mongodb:mongodb \
				--name worker mdulghier/workshop-worker:local

run-bg:
	docker run -d \
				--env-file ../../config/worker-env.list \
				--link redis:redis \
				--link mongodb:mongodb \
				--name worker mdulghier/workshop-worker:local
	
run: run-fg

stop:
	docker stop worker || true
	docker rm worker || true

debug:
	docker run --rm --env-file ../../config/worker-env.list --name worker_debug mdulghier/workshop-worker:local node-debug app.js

