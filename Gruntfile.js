module.exports = function (grunt) {

	var dirs = {
		dist: "dist",
		tests: "tests"
	}

	var secrets  = require("./.secrets.js");

	grunt.loadNpmTasks("grunt-shell");
	grunt.loadNpmTasks("grunt-screeps");

	grunt.initConfig({
		shell: {
			options: {
				execOptions: {
					stdinRawMode: true
				}
			},
			tsc: {
				command: [
					"rm -rf "+dirs.dist,
					"tsc --outDir "+dirs.dist
					].join(" && ")
			},
			cleandist: {
				command: "rm -rf "+dirs.dist+""
			},
			test: {
				command: [
					"tsc --outDir "+dirs.dist,
					"alsatian dist/tests/*.js"
				].join(" && ")
			}
		},
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

	grunt.registerTask("test", ["shell:test"]);
	grunt.registerTask("default", ["shell:tsc", "screeps"]);
}
