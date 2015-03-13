(function () {
    'use strict';
    
    var gulp = require('gulp'),
        sass = require('gulp-ruby-sass'),
        plumber = require('gulp-plumber');
    
    // SASS Task
    gulp.task('sass', function () {
        return sass('style/scss', {
                        style: 'compressed',
                        sourcemap: false
                    })
                    .pipe(gulp.dest('style/css'));
    });
    
    // Watch Task
    gulp.task('watch', function () {
         gulp.watch('style/scss/**/*.scss', ['sass']);
    });
    
    // Default Task
    gulp.task('default', ['watch']);
    
}());