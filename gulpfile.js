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

	config: 'src/config/',
	frameworks: 'src/frameworks/',
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
	watch(path.blocks + '*.scss', styles);
	watch(path.config + '*.scss', styles);
	watch(path.frameworks + '*.scss', styles);
	watch(path.pages + '*.html', pages);
}

function scripts() {

	return src(path.blocks + '*.js')
	.pipe(concat('concat.js'))
	.pipe(dest(path.build, {overwrite: true}))
	.pipe(browserSync.stream())
}

function styles() {

	return src([
		path.frameworks + '*.scss',
		path.config + '*.scss',
		path.blocks + '*.scss'
		])
	.pipe(concat('concat.scss'))
	.pipe(sass())
	.pipe(gcmq())
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
	.pipe(cleancss( { level: { 1: { specialComments: 0 } } , format: 'beautify'  } ))
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

exports.default = parallel(styles, scripts, pages, browsersync, startwatch);