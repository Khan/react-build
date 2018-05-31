OUTPUT_DIR = build
OUTPUT_FILES = $(OUTPUT_DIR)/react.prod.js \
			   $(OUTPUT_DIR)/react.dev.js

$(OUTPUT_FILES):
	RUN_FROM_MAKE=1 ./build.sh

.PHONY: install
install: $(OUTPUT_FILES)
ifndef WEBAPP
	$(error "'WEBAPP' is not defined. Invoke as 'make install WEBAPP=/path/to/webapp'.")
else
	cp $(OUTPUT_FILES) $(WEBAPP)/third_party/javascript-khansrc/react-compiled
endif

.PHONY: clean
clean:
	rm -rf node_modules
	rm build/*.js
	@git status --short | diff -q - /dev/null >/dev/null 2>&1 || \
		echo "Note: you have unstaged changes or untracked files. " \
			 "Consider removing these with 'git reset --hard' or 'git clean -f'."
