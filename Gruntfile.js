module.exports = function (grunt) {

	var dirs = {
		dist: "dist"
	}

	var secrets  = require("./.secrets.js");

	grunt.loadNpmTasks("grunt-shell");
	grunt.loadNpmTasks("grunt-screeps");
	grunt.loadNpmTasks("grunt-contrib-clean");

	grunt.initConfig({
		shell: {
			options: {
				execOptions: {
					stdinRawMode: true
				}
			},
			tsc: {
				command: [
					"tsc --outDir "+dirs.dist
					].join(" && ")
			},
			test: {
				command: [
					"tsc --outDir "+dirs.dist,
					"alsatian dist/test/*.js"
				].join(" && ")
			}
		},
		clean: ['dist'],
		screeps: {
			options: {
				email: secrets.email,
				password: secrets.password,
				branch: secrets.branch,
				ptr: false
			},
			dist: {
				src: [dirs.dist + "/*.js"]
			}
		}
	});

	grunt.registerTask("test", ["clean", "shell:test"]);
	grunt.registerTask("default", ["clean", "shell:tsc", "screeps"]);
}
