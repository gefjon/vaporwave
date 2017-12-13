ifndef BABEL_ENV
$(info Using BABEL_ENV=development)
export BABEL_ENV = development
else
export BABEL_ENV
endif

scripts = src/script
styles = src/style
bins = node_modules/.bin

.DEFAULT_GOAL := all

.PHONY : all
all : bin/style.css bin/script.js

.PHONY : clean
clean :
	rm -rf bin build

build :
	mkdir build

bin :
	mkdir bin

build/browserified.js : $(scripts)/vaporwave.js $(scripts)/*.js build $(bins)/browserify
	./$(bins)/browserify $< -o $@

bin/script.js : build/browserified.js bin node_modules/.bin/babel
	./$(bins)/babel $< -o $@

bin/style.css : $(styles)/vaporwave.scss $(styles)/*.scss bin
	sass $< $@

$(bins)/* :
	npm install
