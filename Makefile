ifndef BABEL_ENV
$(info Using BABEL_ENV=development)
export BABEL_ENV = "development"
else
export BABEL_ENV
endif

.DEFAULT_GOAL := all

.PHONY: all
all: bin/style.css bin/script.js

.PHONY: clean
clean:
	rm -rf bin

bin:
	mkdir bin

bin/script.js: src/script/*.js bin node_modules/.bin/babel
	./node_modules/.bin/babel src/script/vaporwave.js -o bin/script.js

bin/style.css: src/style/vaporwave.scss bin
	sass src/style/vaporwave.scss bin/style.css

node_modules/.bin/babel :
	npm install
