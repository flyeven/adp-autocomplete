
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

    casper.then( function() {
        this.echo('4. Landing this month timecard at '  + this.getCurrentUrl());
        config.saveStepsScreenshots && this.capture( './screenshots/' + now + '.4.LandingThisMonthTimecard.png');
    });
};