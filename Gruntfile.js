module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
	        prod: {
	          options: {
	          	report: 'gzip',
	            mangle: {
	              except: ['require', 'exports', 'module', 'window']
	            },
	            compress: {
	              global_defs: {
	                PROD: true
	              },
	              dead_code: true,
	              pure_funcs: [
	                "console.log",
	                "console.info"
	              ]
	            }
	          },
	  
	          files: [{
	              expand: true,
	              cwd: 'public',
	              src: 'js/*.js',
	              dest: 'public/dist',
	              ext:'.min.js'
	          }]
	        }
	      },
		cssmin: {
	        prod: {
	          options: {
	            report: 'gzip'
	          },
	          files: [
	            {
	              expand: true,
	              cwd: 'public',
	              src: 'css/*.css',
	              dest: 'public/dist',
	              ext:'.min.css'
	            }
	          ]
	        }
      },
      imagemin: {
        prod: {
          options: {
            optimizationLevel: 7,
            pngquant: true
          },
         files: [
           {expand: true, cwd: 'public', src: '[image/*.{png,jpg,jpeg,gif,webp,svg},image/*/*.{png,jpg,jpeg,gif,webp,svg}]', dest: 'public/dist'}
         ]
       }
     },
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.registerTask('default',['cssmin','uglify','imagemin']);
}