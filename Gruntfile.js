module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ["public/dist/*"],
      tmp: ["public/tmp/*", "public/tmp/**/*"]
    },

    less: {
       prod: {
           files: {"public/tmp/<%= pkg.name %>.<%= pkg.version %>.css": "public/styles/main.less"}
       }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'public/dist/<%= pkg.name %>.<%= pkg.version %>.min.js': ['public/js/*.js', 'public/js/**/*.js']
        }
      }
    },

    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/dist/<%= pkg.name %>.<%= pkg.version %>.min.css': ['public/tmp/<%= pkg.name %>.<%= pkg.version %>.css']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'less:prod', 'uglify', 'cssmin', 'clean:tmp']);

};