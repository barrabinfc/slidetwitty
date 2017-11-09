ROLLUP=./node_modules/.bin/rollup

js:
	$(ROLLUP) -c
	$(ROLLUP) -c rollup.config.gui.js

bundle_js:
	browserify dist/app.js -s app > dist/bundle.js
	#browserify dist/gui.js -s mgui > dist/mgui.js 

watch:
	watchmedo shell-command \
		--command="make all" \
		--recursive \
		--patterns="./src/*.js;./src/css/app.scss"


assets: 
	cp src/index.html dist
	cp src/css/{*.css,*.map} dist
	cp node_modules/dat.gui/build/dat.gui.min.js dist/libs

build: assets js


bundle: bundle_js
	@echo "Done."


http:
	@(cd dist && python -m http.server &)


server: build http watch


dev: build http watch


all: build bundle