publish:
		npm publish --dry-run

install:
		npm ci

gendiff:
		node bin/gendiff.js

lint:
		npx eslint .

test:
		node --experimental-vm-modules "node_modules/.bin/jest"
