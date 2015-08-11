
casper.adp.login = function ( username, password ) {

    casper.setHttpAuth( username, password );

    // Login to ADP
    casper.thenOpen( config.address, function() {
        this.echo('1. Logged in into ADP. URL: ' + this.getCurrentUrl());
        config.saveStepsScreenshots && this.capture( './screenshots/' + now + '.1.LoggedIn.png');

    });
};

casper.adp.requirePasswordChange = function (  ) {
    casper.then(function(){
        if( this.exists('form[name=PWChange]') ){
            this.echo("WARNING:");
            this.echo("Your ADP password has expired. Please change it in ADP, update your adp.config.json with the new pass and run this script again.");
            this.exit();
        }
    });
};