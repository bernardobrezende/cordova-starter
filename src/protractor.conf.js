'use strict';

exports.config = {
	baseAddress: 'http://localhost:9000',
	specs: [ 'www/**/*_spec.js' ],
	jasmineNodeOpts: {
		showColors: true, // Use colors in the command line report.
	}
};