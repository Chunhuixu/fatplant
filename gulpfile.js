var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task("sass", function () {
    return gulp.src("./sass/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./public/css"));

});

gulp.task('default', function () {
    return gulp.watch('sass/**/*.scss', gulp.series('sass'));
});
