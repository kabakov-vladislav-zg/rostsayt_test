const { src, dest, parallel, series, watch } = require('gulp');
 
const browserSync = require('browser-sync').create();
 
const concat = require('gulp-concat');
 
const uglify = require('gulp-uglify-es').default;

const autoprefixer = require('gulp-autoprefixer');
 
const cleancss = require('gulp-clean-css');

const imagemin = require('gulp-imagemin');
 
const newer = require('gulp-newer');
 
const del = require('del');

const gcmq = require('gulp-group-css-media-queries');

const sass = require('gulp-sass');

const postcss = require("gulp-postcss");

const sourcemaps = require("gulp-sourcemaps");

const path = {

	lib: 'src/lib/**/',
	blocks: 'src/blocks/**/**/',
	pages: 'src/pages/',
	build: 'build/'
}

function browsersync() {

	browserSync.init({
		server: {baseDir: path.build},
		notify: false,
		online: true
	})
}

function startwatch() {
 
	watch(path.blocks + '*.js', scripts);

	watch(path.lib + '*.scss', stylesLib);

	watch(path.blocks + '*.css', styles);

	watch(path.pages + '*.html', pages);
}

function scripts() {

	return src(path.blocks + '*.js')
	.pipe(concat('main.js'))
	.pipe(dest(path.build, {overwrite: true}))
	.pipe(browserSync.stream())
}

function stylesLib() {

	return src(path.lib + '*.scss')
	.pipe(sass())
	.pipe(concat('lib.css'))
	.pipe(dest(path.build, {overwrite: true}))
	.pipe(browserSync.stream())
}

function styles() {

	return src(path.blocks + '*.css')
	.pipe(concat('main.css'))
	//.pipe(sass())
	//.pipe(gcmq())
	//.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	//.pipe(cleancss( { level: { 1: { specialComments: 0 } } , format: 'beautify'  } ))
	.pipe(dest(path.build, {overwrite: true}))
	.pipe(browserSync.stream())
}

function pages() {
	
	return src(path.pages + '*.html')
	.pipe(dest(path.build, {overwrite: true}))
	.pipe(browserSync.stream())
}

exports.browsersync = browsersync;

exports.scripts = scripts;

exports.styles = styles;

exports.pages = pages;

exports.default = parallel(styles, scripts, stylesLib, pages, browsersync, startwatch);