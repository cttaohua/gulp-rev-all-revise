var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var Buffer = require('buffer').Buffer;
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var map = require('event-stream').map;

//var FILE_DECL = /(?:href=|src=|url\()['|"]([^\s>"']+?)\?rev=([^\s>"']+?)['|"]/gi;
var FILE_DECL = /(?:templateUrl\: {0,}|href=|src=|url\()['|"]([^\s>"']+?)['|"]/gi;

var revPlugin = function revPlugin(options) {

  return map(function(file, cb) {

    var contents;
    var lines;
    var i, length;
    var line;
    var groups;
    var dependencyPath;
    var data, hash;
    var isNgRoute; // true if the file is contain angular-js's route

    if(!file) {
      throw new PluginError('gulp-rev-append', 'Missing file option for gulp-rev-append.');
    }

    if(!file.contents) {
      throw new PluginError('gulp-rev-append', 'Missing file.contents required for modifying files using gulp-rev-append.');
    }
    
    isNgRoute = file.path.indexOf('/app.js') > -1;

    contents = file.contents.toString();
    lines = contents.split('\n');
    length = lines.length;


    if (isNgRoute) {
      line = lines[0];
      result = line.match(FILE_DECL);

      for(i = 0; i < result.length; i++) {
        groups = FILE_DECL.exec(result[i]);

        if(groups && groups.length > 1) {
          // are we an "absoulte path"? (e.g. /js/app.js)
          var normPath = path.normalize(groups[1]);
          if (normPath.indexOf(path.sep) === 0) {
            dependencyPath = path.join(file.base, normPath);
          }
          else {
            normPath = '../' + normPath;
            dependencyPath = path.resolve(path.dirname(file.path), normPath);
          }

          try {
            data = fs.readFileSync(dependencyPath);
            hash = crypto.createHash('md5');
            hash.update(data.toString(), 'utf8');
            //line = line.replace(groups[2], hash.digest('hex'));
            line = line.replace(groups[1], groups[1] + '?v=' + hash.digest('hex'));
          }
          catch(e) {
            // fail silently.
          }
        }
        FILE_DECL.lastIndex = 0;
      }
      lines[0] = line;

    } else {

      for(i = 0; i < length; i++) {
        line = lines[i];
        groups = FILE_DECL.exec(line);

        if(groups && groups.length > 1) {
          // are we an "absoulte path"? (e.g. /js/app.js)
					
					
					var vindex = groups[1].indexOf('?');
					if(vindex!=-1) {
						var newgroups = groups[1].substring(0,vindex);
					}else {
						var newgroups = groups[1];
					}
					
          var normPath = path.normalize(groups[1]);
					
					if(options.assets!= undefined) {
						normPath = options.assets + normPath;
					}
					
          if (normPath.indexOf(path.sep) === 0) {
            dependencyPath = path.join(file.base, normPath);
          }
          else {
            dependencyPath = path.resolve(path.dirname(file.path), normPath);
          }
					
					var vindex2 = dependencyPath.indexOf('?');
					if(vindex2!=-1) {
						dependencyPath = dependencyPath.substring(0,vindex2);
					}
					
          try {
            data = fs.readFileSync(dependencyPath);
            hash = crypto.createHash('md5');
            hash.update(data.toString(), 'utf8');
            //line = line.replace(groups[2], hash.digest('hex'));
            line = line.replace(groups[1], newgroups + '?v=' + hash.digest('hex'));
          }
          catch(e) {
            // fail silently.
          }
        }
        lines[i] = line;
        FILE_DECL.lastIndex = 0;
      }

    }



    file.contents = new Buffer(lines.join('\n'));
    cb(null, file);

  });

};

module.exports = revPlugin;
