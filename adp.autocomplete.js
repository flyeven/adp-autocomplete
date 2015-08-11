/*jslint stupid: true, debug: true, evil: false, vars: true */

var casper = require('casper').create({
    verbose: true,
    logLevel: 'info'
});

var config = require('adp.config.json');
var now = (new Date()).toJSON().replace(/[:\-\.]/g,"").substr(0,15);

var utils = require('utils');

var holidays = [];

phantom.injectJs( './steps/holidays.js');
phantom.injectJs( './steps/adp.js');


try {

    casper
        .start()
        .then( function(){
            casper.getHolidays();
        })

        .then(function(){
            casper.adp.login( config.username, config.password );
        }) 
        .then(function(){
            casper.adp.requirePasswordChange();
        }) 
        .then(function(){
            casper.adp.gotoMyTimecard();
        }) 
        .then(function(){
            casper.adp.thisMonthTimecard();
        }) 
        .then(function(){
            casper.adp.fillMyTimecard();
        }) 
        .then(function(){
            casper.adp.results();
        }) 
        .then(function(){
            casper.adp.logout();
        })
        ;

} catch( error ){

    utils.dump(error);
}
casper.run(function() {
    this.exit();
});
