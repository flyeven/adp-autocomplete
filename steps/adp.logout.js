
casper.adp.logout = function (  ) {

    casper.then( function() {
        this.mouseEvent('mouseover', '.menuLogOff a');
        this.mouseEvent('click', '.menuLogOff a');
    });
    casper.then( function() {
        this.echo('9. Logout');
        config.saveStepsScreenshots && this.capture( './screenshots/' + now + '.9.Logout.png');
    });
        
};
