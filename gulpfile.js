var gulp = require('gulp'), // Подключаем Gulp

    sass = require('gulp-sass')(require('sass')), //Подключаем Sass пакет,
    pug = require('gulp-pug'), //Подключаем PUG пакет
    //uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    //concat= require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    //rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    //pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

//html
//команда- gulp code
gulp.task('code', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist')); // Выгружаем в папку dist/css
});

//pug
//команда- gulp pug
gulp.task('pug', function () {
    return gulp.src('src/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'))
});

//scss
//команда- gulp sass
gulp.task('scss', function () { // Создаем таск Sass
    return gulp.src('src/scss/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(cssnano()) // Сжимаем
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('dist/css')) // Выгружаем результата в папку dist/css
});

//js
//команда- gulp scripts
gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js') // Берем источник
        //.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        //.pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('dist/js')); // Выгружаем в папку dist/js
});

//img
//команда- gulp img
gulp.task('img', function () {
    return gulp.src('src/img/**/*') // Берем все изображения из src
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

//fonts
//команда- gulp fonts
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))
});

// Удаление папки dist перед сборкой
gulp.task('clean', async function () {
    return del.sync('dist');
});


gulp.task('watch', function () {
    gulp.watch('src/**/*.scss', gulp.parallel('scss')); // Наблюдение за sass файлами
    gulp.watch('src/*.html', gulp.parallel('code')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('src/**/*.js', gulp.parallel('scripts')); // Наблюдение за главным JS файлом и за библиотеками
    gulp.watch('src/**/*.pug', gulp.parallel('pug'));
});


gulp.task('build', gulp.parallel('clean', 'code', 'pug', 'scss', 'scripts', 'img', 'fonts'));

gulp.task('default', gulp.parallel('watch'));
