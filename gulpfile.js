var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var gulpConnect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('learn', function(){
  console.log('Yay I do it');
});

gulp.task('min-css',function(){
  return gulp.src('css/*')
        .pipe(minifyCSS())
        .pipe(gulp.dest('build'));
});

gulp.task('min-js',function(){
  return gulp.src('js/*')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task('min-html',function(){
  return gulp.src('*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('build-html'));
});

gulp.task('bundle-css', function() {
  return gulp.src([ //list file yang akan digabungkan
          'css/style.css',
          'css/main.css',
        ])
        .pipe(sourcemaps.init()) //mulai sourcemaps
        .pipe(minifyCSS()) //lakukan minify
        .pipe(concat('bundle.min.css')) //gabungkan file di .src menjadi satu file
        .pipe(sourcemaps.write('source-maps')) //generate sourcemaps
        .pipe(gulp.dest('build')) //compile ke folder build
});

gulp.task('server', function() {
  gulpConnect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('sass', function() {
  gulp.src('sass/main.sass')
      .pipe(sass())
      .pipe(gulp.dest('build-sass'));
});

gulp.task('automate', function() {
  gulp.watch('js/*.js', ['min-js']);
  gulp.watch('css/*.css', ['min-css', 'bundle-css']);
  gulp.watch('*.html', ['min-html']);
});
