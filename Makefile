export PATH := $(shell pwd)/node_modules/.bin:$(PATH)

.PHONY: test build unit lint

test: build unit lint

build:
	rm -rf build
	./node_modules/.bin/tsc

unit:
	mocha build/test/bootstrap.js "build/test/unit/**/*.test.js"

lint:
	./node_modules/.bin/tslint --config tslint.json --project ./ --fix
