
casper.adp.results = function ( ) {

    casper.then( function(){
        casper.withFrame('IFRM', function() {
            var result = this.evaluate(function( ) {
                return document.querySelector('#divStatusText').innerText ;
            });
            casper.echo('8. Result: ' + result);
            config.saveStepsScreenshots && this.capture( './screenshots/' + now + '.8.Result.png');
        });
    });
};