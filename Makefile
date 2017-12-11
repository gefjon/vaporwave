.DEFAULT_GOAL := all

.PHONY: all
all: bin/style.css bin/script.js

.PHONY: clean
clean:
	rm -rf bin

bin:
	mkdir bin

bin/script.js: src/vaporwave.ts bin
	tsc --outfile bin/script.js src/vaporwave.ts

bin/style.css: src/vaporwave.scss bin
	sass src/vaporwave.scss bin/style.css
