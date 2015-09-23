'use strict';

var request = require('request');
var fs      = require('fs');
var sys     = require('sys');
var path    = require('path');
var moment  = require('moment-timezone');
var htmlToText = require('html-to-text');
var Q = require("q");

//the processing
request({
	//this disables the ssl security (would accept a fake certificate). see:
	//http://stackoverflow.com/questions/20082893/unable-to-verify-leaf-signature
	'rejectUnauthorized': false,
	'url': 'https://api.tnyu.org/v2/jobs?include=employer&sort=%2b-created',
	'headers': {
		'x-api-key': process.env.ApiKey,
		'accept': 'application/vnd.api+json'
	},
	timeout: 100000
}, function(err, response, body) {
	var apiJson = JSON.parse(body);
	var jobs = apiJson.data;
	var employers = apiJson.included;
	var employerIdToName = {};
	employers.forEach(function(employer, idx){
		employerIdToName[employer.id] = employer.attributes.name;
	})
	jobs.forEach(function(job, idx){
		var descText = htmlToText.fromString(job.attributes.description, {
		    wordwrap: 130
		});
		require('./compiler').compile('template', {
            title: job.attributes.positionTitle,
            company: employerIdToName[job.links.employer.linkage.id],
            category: job.attributes.category,
            positionLevel: job.attributes.positionLevel,
            applicationUrl: job.attributes.applicationUrl,
            applicationEmail: job.attributes.applicationEmail,
            description: descText
        }, function(err, text) {
            if (err) {
                return console.log(err);
            } else {
                fs.writeFileSync(path.resolve(__dirname, '../_jobs/10000' + idx + '.md'), text);
            }
        });
	});
	// rebuild jekyll
	var parentDir = path.resolve(__dirname, '..');
	var exec = require('child_process').exec;
	var puts = function (error, stdout, stderr) {
		sys.puts(stdout);
	};
	exec('jekyll build', {cwd: parentDir}, puts);
});