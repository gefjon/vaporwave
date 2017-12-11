.DEFAULT_GOAL := all

.PHONY: all
all: bin/style.css bin/script.js

.PHONY: clean
clean:
	rm -rf bin/*

bin/script.js: src/vaporwave.ts
	tsc --outfile bin/script.js src/vaporwave.ts

bin/style.css: src/vaporwave.scss
	sass src/vaporwave.scss bin/style.css
