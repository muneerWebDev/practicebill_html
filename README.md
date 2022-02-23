CSS Framework used: UIkit 3. Check src/sass/main.scss for dependant css files.

NPM 6.9.0
NodeJs 12.4.0 Using NVM

## 1. Install dev dependencies
$ npm install --save-dev                 *(This will install devDependencies mentioned in package.json)*
$ npm install *module_name* --save-dev   *(This will install dependency named module_name. Find modules in npmjs.com.)*

## 2. Install other plugins as dependencies
$ npm install --save                 *(This will install dependencies mentioned in package.json)*
$ npm install *module_name* --save   *(This will install dependency named module_name. Find modules in npmjs.com.)*

---

## Gulp tasks available
1. $ gulp sass     *(To compile scss files)*
2. $ gulp useref   *(To minifiy css and js files and copy them from /src to /dist directory)*
3. $ gulp images   *(To minify and copy image files if any from /src/img to /dist/img)*
4. $ gulp fonts    *(To copy font files if any from /src/fonts to /dist/fonts)*
5. $ gulp assets   *(To copy files if any from /src/assets to /dist/assets)*
6. $ gulp          *(Combination of above tasks to create the dist package)*