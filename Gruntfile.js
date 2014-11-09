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
           files: {"public/styles/main.css": "public/styles/main.less"}
       }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'public/dist/<%= pkg.name %>.<%= pkg.version %>.min.js': ['public/tmp/combined.js']
        }
      }
    },

    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/dist/<%= pkg.name %>.<%= pkg.version %>.min.css': ['public/tmp/combined.css']
        }
      }
    },

    concatBlocks: {
        html: 'views/layout.jade',
        root: 'public'
    },


  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-concat-blocks');
  

  // Default task(s).
  grunt.registerTask('default', ['clean', 'less:prod', 'concatBlocks', 'concat', 'uglify', 'cssmin', 'clean:tmp']);

  grunt.registerTask('build', [
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'usemin'
  ]);

  grunt.registerTask('t', [
    'useref',
    'concat'
  ]);

grunt.registerTask('m', [
    'concatBlocks',
    'concat'
  ]);

};