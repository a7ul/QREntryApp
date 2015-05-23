module.exports = function (grunt) {
	grunt.registerTask('jshint', [
		'jshint',
		'watch:jshint'
	]);
};