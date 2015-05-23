module.exports = function(grunt) {

	grunt.config.set('jshint', {
      options: {
        jshintrc: '.jshintrc',
//        reporter: require('jshint-stylish')
      },
      all: ['Gruntfile.js', '**/*.js'] 
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};
