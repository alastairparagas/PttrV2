(function () {
    'use strict';
    
    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        plumber = require('gulp-plumber');
    
    // SASS Task
    gulp.task('sass', function () {
        return gulp.src('style/scss/**/*.scss')
                    .pipe(sass({
                        outputStyle: "compressed",
                        errLogToConsole: true
                    }))
                    .pipe(gulp.dest('style/css'));
    });
    
    // Watch Task
    gulp.task('watch', function () {
         gulp.watch('style/scss/**/*.scss', ['sass']);
    });
    
    // Default Task
    gulp.task('default', ['watch']);
    
}());