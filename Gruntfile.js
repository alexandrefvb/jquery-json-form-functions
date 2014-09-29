module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON("package.json"),
		jshint : {
			all : [ "Gruntfile.js", "src/js/**/*.js", "src/spec/**/*.js" ],
			options: {
				jshintrc: ".jshintrc",
			}
		},
		uglify : {
			build : {
				src : "src/js/<%= pkg.name %>.js",
				dest : "dist/<%= pkg.version %>/<%= pkg.name %>-<%= pkg.version %>.min.js"
			}
		},
		watch: {
			files: ["package.json","Gruntfile.js","src/**/*.js","src/**/*.html", "spec/**/*.js"],
			tasks: ["default"]
		},
		targethtml: {
			dist: {
				options: {
					curlyTags: {
						version: "<%= pkg.version %>"
					}
				},				
				files: {
					"dist/<%= pkg.version %>/example.html" : "src/html/example.html"					
				}
			}
		},
		jasmine: {
			src: {
				src: "src/js/**/*.js",
				options: {
					specs: "src/spec/*Spec.js",
					vendor: "https://code.jquery.com/jquery-1.11.1.min.js",
					helpers: "https://cdnjs.cloudflare.com/ajax/libs/sinon.js/1.7.3/sinon-min.js",
					template: require("grunt-template-jasmine-istanbul"),
					templateOptions: {
						coverage: "test-coverage/<%= pkg.version %>/coverage.json",
						report: "test-coverage/<%= pkg.version %>/report"
					}
				},
			},
			dist: {
				src: "dist/<%= pkg.version %>/*.js",
				options: {
					specs: "src/spec/*Spec.js",
					vendor: "https://code.jquery.com/jquery-1.11.1.min.js",
					helpers: "https://cdnjs.cloudflare.com/ajax/libs/sinon.js/1.7.3/sinon-min.js"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-targethtml");
	grunt.loadNpmTasks("grunt-contrib-jasmine");

	grunt.registerTask("default", ["jshint", "jasmine:src", "uglify", "jasmine:dist", "targethtml:dist"]);
};