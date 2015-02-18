#!/usr/bin/env node
	//This hook installs all required cordova plugins.
	var fs = require('fs');
	var path = require('path');
	var sys = require('sys')
	var exec = require('child_process').exec;
    var rootdir = process.argv[2];
    var pluginsfilePath = rootdir.concat('/plugins.json');
    
    //Plugins list array extracted from "plugins.json", which is placed on the project root folder. 
    var pluginsFileContent = fs.readFileSync(pluginsfilePath, 'utf8');
    var pluginslist = JSON.parse(pluginsFileContent).pluginsList;
    
    //Callback for the "cordova plugin add" command.
	function puts(error, stdout, stderr) {
		if(stderr)
            console.log(stderr);
        console.log(stdout);
	}

    console.log('adding cordova plugins to project...');
	pluginslist.forEach(function(plugin) {
        exec("cordova plugin add " + plugin, puts);
	});