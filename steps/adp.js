casper.adp = {};

phantom.injectJs( './steps/adp.login.js');
phantom.injectJs( './steps/adp.gotoMyTimecard.js');
phantom.injectJs( './steps/adp.fillMyTimecard.js');
phantom.injectJs( './steps/adp.results.js');
phantom.injectJs( './steps/adp.logout.js');

