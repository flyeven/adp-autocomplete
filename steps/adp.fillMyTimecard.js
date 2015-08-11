var autocompleteMonthTimecard = function( dw, hld ){
    var eventFire = function eventFire(el, etype){
      if (el.fireEvent) {
       (el.fireEvent('on' + etype));
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }
    var output = [];
    try {

        var days =  document.querySelectorAll('[id*=TOTALHOURS_]').length;

        output.push( '6. Prefilling timecard ' + days + ' days found.' );

        for (var i = 0; i < days; i++) {
            var day = i;
            var current_date = new Date( document.querySelector('#INTIMEdt_' + day ).innerText );
            var dayLog = current_date.format("yyyyMMdd");

            // Skip Saturday and Sunday
            if( current_date.getDay() % 6 == 0){
                dayLog += ' is Saturday or Sunday'
                output.push(dayLog);
                continue;
            }

            var code = dw.code;
            // Skip if it's a holiday
            if( hld.indexOf( current_date.format("yyyyMMdd") ) >= 0 ){
                code = dw.holidaycode;
                dayLog += ' is Holiday';
            }

            eventFire( document.querySelector('#TOTALHOURS_' + day), 'mouseover');
            eventFire( document.querySelector('#TOTALHOURS_' + day), 'click');
            TCMS.setActiveFocus();
            document.activeElement.value = dw.hours;


            eventFire(document.querySelectorAll("[id='31_" + day + "']")[0], 'mouseover');
            eventFire(document.querySelectorAll("[id='31_" + day + "']")[0], 'click');
            eventFire(document.querySelectorAll("[id='31_" + day + "']")[0], 'click');

            document.querySelectorAll("[id='z_31_" + day + "']")[0].value = code;


            eventFire(document.querySelectorAll("[id='17_" + day + "']")[0], 'mouseover');
            eventFire(document.querySelectorAll("[id='17_" + day + "']")[0], 'click');
            TCMS.setActiveFocus();
            document.activeElement.value = dw.customer;

            eventFire(document.querySelectorAll("[id='18_" + day + "']")[0], 'mouseover');
            eventFire(document.querySelectorAll("[id='18_" + day + "']")[0], 'click');
            TCMS.setActiveFocus();
            document.activeElement.value = dw.project;

            eventFire(document.querySelectorAll("[id='DAILYTOTALS_" + day + "']")[0], 'mouseover');
            eventFire(document.querySelectorAll("[id='DAILYTOTALS_" + day + "']")[0], 'click');

            dayLog += ' ' + dw.hours + 'hs ' + code + ' for ' + dw.customer + ' - ' + dw.project;

            output.push(dayLog);
        };

        output.push( '7. Submitting: ' + days + " days" );
        eventFire( document.querySelector( '#btnSubmit' ), 'click');

    } catch( e ) {
        output.push( {
            "day": day,
            "dayLog": dayLog,
            "code": code
        } );
        output.push( e );
    }

    return output;
}

casper.adp.fillMyTimecard = function ( ) {


    casper.withFrame('IFRM', function() {

        var result = [];

        var currentURL = this.getCurrentUrl();

        this.echo('5. Filling current month Timecard. URL: ' + currentURL);
        config.saveStepsScreenshots && this.capture( './screenshots/' + now + '.5.FillingThisMonthTimecard.png');

        var result = this.evaluate( autocompleteMonthTimecard, config.defaultWeek, config.holidays); 
        
        if( result && result.length )
            for (var i = 0; i < result.length; i++) {
                this.echo(result[i]);
            };
    });

};