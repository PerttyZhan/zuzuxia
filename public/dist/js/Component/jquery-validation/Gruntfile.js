module.exports=function(a){"use strict";var b,c,d,e,f,g,h;b="/*!\n * jQuery Validation Plugin v<%= pkg.version %>\n *\n * <%= pkg.homepage %>\n *\n * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>\n * Released under the <%= _.pluck(pkg.licenses, 'type').join(', ') %> license\n */\n",c='(function( factory ) {\n	if ( typeof define === "function" && define.amd ) {\n',d="	} else {\n		factory( jQuery );\n	}\n}(function( $ ) {\n\n",e="\n}));",f='		define( ["jquery"], factory );\n',g='		define( ["jquery", "./jquery.validate"], factory );\n',h='		define( ["jquery", "../jquery.validate"], factory );\n',a.initConfig({pkg:a.file.readJSON("package.json"),concat:{dist:{options:{banner:b+c+f+d,footer:e},files:{"dist/jquery.validate.js":["src/core.js","src/*.js"]}},extra:{options:{banner:b+c+g+d,footer:e},files:{"dist/additional-methods.js":["src/additional/additional.js","src/additional/*.js"]}}},uglify:{options:{preserveComments:!1,banner:"/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('m/d/yyyy') %>\n * <%= pkg.homepage %>\n * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>; Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */\n"},dist:{files:{"dist/additional-methods.min.js":"dist/additional-methods.js","dist/jquery.validate.min.js":"dist/jquery.validate.js"}},all:{expand:!0,cwd:"dist/localization",src:"**/*.js",dest:"dist/localization",ext:".min.js"}},compress:{dist:{options:{mode:"zip",level:1,archive:"dist/<%= pkg.name %>-<%= pkg.version %>.zip",pretty:!0},src:["changelog.txt","demo/**/*.*","dist/**/*.js","Gruntfile.js","lib/**/*.*","package.json","README.md","src/**/*.*","test/**/*.*"]}},qunit:{files:"test/index.html"},jshint:{options:{jshintrc:!0},core:{src:"src/**/*.js"},test:{src:"test/*.js"},grunt:{src:"Gruntfile.js"}},watch:{options:{atBegin:!0},src:{files:"<%= jshint.core.src %>",tasks:["concat"]}},jscs:{all:["<%= jshint.core.src %>","<%= jshint.test.src %>","<%= jshint.grunt.src %>"]},copy:{dist:{options:{process:function(a){return c+h+d+a+e}},src:"src/localization/*",dest:"dist/localization",expand:!0,flatten:!0,filter:"isFile"}},replace:{dist:{src:"dist/**/*.min.js",overwrite:!0,replacements:[{from:"./jquery.validate",to:"./jquery.validate.min"}]}}}),a.loadNpmTasks("grunt-contrib-jshint"),a.loadNpmTasks("grunt-contrib-qunit"),a.loadNpmTasks("grunt-contrib-uglify"),a.loadNpmTasks("grunt-contrib-concat"),a.loadNpmTasks("grunt-contrib-compress"),a.loadNpmTasks("grunt-contrib-watch"),a.loadNpmTasks("grunt-jscs"),a.loadNpmTasks("grunt-contrib-copy"),a.loadNpmTasks("grunt-text-replace"),a.registerTask("default",["concat","copy","jscs","jshint","qunit"]),a.registerTask("release",["default","uglify","replace","compress"]),a.registerTask("start",["concat","watch"])};