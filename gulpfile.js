var gulp = require('gulp');
var gAll = require('gulp-load-plugins')(); //加载全部
var open = require('open');


//html处理
gulp.task('html',function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('build/'))
        .pipe(gAll.minifyHtml())
        .pipe(gulp.dest('dist/'))
        .pipe(gAll.connect.reload());
})

//js处理
gulp.task('js',function () {
    gulp.src('src/js/*.js')
        .pipe(gAll.concat('main.js'))
        .pipe(gulp.dest('build/js/'))
        .pipe(gAll.uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(gAll.connect.reload());
})

//css处理
gulp.task('css',function () {
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('build/css/'))
        .pipe(gAll.cssmin())
        .pipe(gulp.dest('dist/css/'))
        .pipe(gAll.connect.reload());
})
//图片处理

//lib库复制
gulp.task('lib',function () {
    gulp.src("bower_components/*/dist/*.js")
        .pipe(gulp.dest("build/lib/"))
        .pipe(gulp.dest("dist/lib/"))
})

//删除
gulp.task('clean',function () {
    gulp.src(['dist/','build/'])
        .pipe(gAll.clean());
})

gulp.task('server',['build'],function () {
    gAll.connect.server({
        root:'build/',
        livereload: true,
        port: 8082
    });

    open('http://localhost:8082');

    gulp.watch('src/*.html',['html']);
    gulp.watch('src/css/*.css',['css']);
    gulp.watch('src/js/*.js',['js']);


})



gulp.task('build',['html','css','js','lib']);

gulp.task('default',['server']);