module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: ["public/dist/*"],
      tmp: ["public/tmp/*", "public/tmp/**/*"]
    },

    less: {
       main: {
         files: {"public/styles/main.css": "public/styles/main.less"}
       },
       admin: {
         files: {"public/styles/admin.css": "public/styles/admin.less"}
       }
    },

    uglify: {
      main: {
        options: {
          banner: '/*! <%= pkg.name %> -main <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/dist/<%= pkg.name %>-main.<%= pkg.version %>.min.js': ['public/tmp/combined-main.js']
        }
      },
      admin: {
        options: {
          banner: '/*! <%= pkg.name %> -admin <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/dist/<%= pkg.name %>-admin.<%= pkg.version %>.min.js': ['public/tmp/combined-admin.js']
        }
      }
    },

    cssmin: {
      main: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          // 'public/dist/<%= pkg.name %>-vendor.<%= pkg.version %>.min.css': ['public/tmp/combined-vendor.css'],
          'public/dist/<%= pkg.name %>-main.<%= pkg.version %>.min.css': ['public/tmp/combined-main.css']
        }
      },
      admin: {
        options: {
          banner: '/*! <%= pkg.name %> -admin <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'public/dist/<%= pkg.name %>-admin.<%= pkg.version %>.min.css': ['public/tmp/combined-admin.css']
        }
      }
    },

    concatBlocks: {
      html: ['views/layout.jade', 'views/admin/index.jade'],
      root: 'public'
    },

    shell: {
      dev: {
        options: { stdout: true },
        command: [
          //'mng',
          //'redis-server',
          'node app.js'
        ].join('&&')
      }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-concat-blocks');
  grunt.loadNpmTasks('grunt-shell');


  // Default task(s).
  grunt.registerTask('default', ['clean', 'less', 'concatBlocks', 'concat', 'uglify', 'cssmin', 'clean:tmp']);

  grunt.registerTask('server', ['shell:dev']);


};
