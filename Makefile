.DEFAULT_GOAL := all

.PHONY: all
all: bin/style.css bin/script.js

.PHONY: clean
clean:
	rm -rf bin

bin:
	mkdir bin

bin/script.js: src/script/*.js bin
	browserify src/script/vaporwave.js -o bin/script.js

bin/style.css: src/style/vaporwave.scss bin
	sass src/style/vaporwave.scss bin/style.css
