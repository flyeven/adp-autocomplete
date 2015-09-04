casper.adp._changePeriod = function ( periodText ) {
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
        var periodSelector = document.querySelectorAll("[id='ctrlDtRangeSelector_SelectionItem']")[0];

        eventFire(periodSelector, 'mouseover');
        eventFire(periodSelector, 'click');
        var newOption, oldOption;

        oldOption = periodSelector.options[ periodSelector.selectedIndex ];
        newOption = oldOption.text == periodText ? newOption = oldOption : null;

        for ( var i = 0 ; i < periodSelector.options.length && !newOption; i++){
            if( periodSelector.options[i].text == periodText){
                newOption = periodSelector.options[i];
            };
        };  

        if( newOption ){
            periodSelector.selectedIndex = newOption.index;
            eventFire(periodSelector, 'change');
        }

        output.push({
            'oldOption' : {
                'index': oldOption.index,
                'value': oldOption.value,
                'text': oldOption.text
            },
            'newOption' : {
                'index': newOption.index,
                'value': newOption.value,
                'text': newOption.text
            }
        });

    } catch( e ) {
        output.push( e );
    }

    return output;
}

casper.adp.gotoMyTimecard = function (  ) {

    // Navigate to My Timecard page and get the iframe url
    casper.thenOpen( "https://portal.adp.com/wps/myportal/sitemap/Employee/TimeAttendance/MyTimecard/!ut/p/c5", function() {
        
        this.echo('2. Opened My Timecard page: ' + this.getCurrentUrl());
        config.saveStepsScreenshots && this.capture( './screenshots/' + now + '.2.OpenedMyTimecard.png');

    });


    casper.withFrame('IFRM', function() {
        this.echo('3. Click My Timecard button');
        config.saveStepsScreenshots && this.capture( './screenshots/' + now + '.3.ClickMyTimecard.png');

        this.mouseEvent('mouseover', '#UI4_ctBody_UCTodaysActivities_btnTimeSheet');
        this.mouseEvent('click', '#UI4_ctBody_UCTodaysActivities_btnTimeSheet');
 

    });
};

casper.adp.thisMonthTimecard = function (  ) {


    casper.withFrame('IFRM', function() {
        
        config.saveStepsScreenshots && this.capture( './screenshots/' + now + '.4.1.LandingMyTimecard.png');

        var result = this.evaluate( casper.adp._changePeriod, "This Month"); 

        if( result && result.length && result[0].newOption && result[0].oldOption ){
            newOption = result[0].newOption;
            oldOption = result[0].oldOption;
            this.echo("Previous period: (" + oldOption.value + ") " + oldOption.text);
            this.echo("Changed to period: (" + newOption.value + ") " + newOption.text);
        }

    });

    casper.then( function() {

        this.echo('4. Opened this month timecard at '  + this.getCurrentUrl());
        config.saveStepsScreenshots && this.capture( './screenshots/' + now + '.4.2.OpenedThisMonthPeriod.png');
    });
};