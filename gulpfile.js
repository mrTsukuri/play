const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const autoprefixer = require('gulp-autoprefixer');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 2 versions'], {cascade: true}))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',

		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js/'));	
});

gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});
 
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('clean', function() {
    return del.sync('dest');
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	}))
	.pipe(gulp.dest('dest/img'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
    const buildCss = gulp.src([
    	'app/css/main.css',
    	'app/css/libs.min.css',
    	'app/css/normalize.css',
    ])
    	.pipe(gulp.dest('dest/css'));

    const buildFonts = gulp.src('app/fonts/**/*')
      .pipe(gulp.dest('dest/fonts'));

    const buildLibs = gulp.src('app/libs/**/*')
	   .pipe(gulp.dest('dest/libs'));    

    const buildJs = gulp.src('app/js/**/*')
      .pipe(gulp.dest('dest/js'));

    const buildHtml = gulp.src('app/*.html')
      .pipe(gulp.dest('dest'));
});