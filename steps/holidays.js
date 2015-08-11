casper.getHolidays = function ( ) {
    var fs = require('fs');

    var holidaysFile = "steps/holidays." + (new Date()).toJSON().replace(/[:\-\.]/g,"").substr(0,4) + ".json";

    if( fs.exists( holidaysFile ) ){

        holidays = fs.read(holidaysFile);

    } else {

        //Get holidays
        casper.thenOpen( "http://nolaborables.com.ar/API/v1/actual?excluir=opcional", function( response ) {

            var data = [];

            var result = JSON.parse(this.getPageContent());
            var i, day;

            for ( i = result.length - 1; i >= 0; i--) {

                day = (new Date()).getFullYear().toString() + 
                    ('0' + result[i].mes).substr(-2) + 
                    ( result[i].tipo == 'trasladable' ? 
                        ('0' + result[i].traslado).substr(-2) :
                        ('0' + result[i].dia).substr(-2) );
                data.push( day );
            };
            holidays =  JSON.stringify( data );
            console.log('holidays loaded from web service');

            fs.write( holidaysFile, holidays , 'w');
        });

    }
};
