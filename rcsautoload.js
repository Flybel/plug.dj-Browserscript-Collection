if ( realGRole == undefined ) {
  var realGRole = API.getUser().gRole;
  _.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('gRole',3);
  setTimeout( function() {
  	API.sendChat('/reload');
  }, 1000);
  setInterval(function(){if(rcs.settings.autoJoin){if(API.getDJ()==null){API.djJoin();}}},2000);
  /*setTimeout( function () { //plugCubed
    $.getScript('https://plugcubed.net/scripts/release/plugCubed.js');
  }, 2000);
  setTimeout( function () { //plug_p0ne
    $.getScript('https://cdn.p0ne.com/scripts/plug_p0ne.js');
  }, 2500);
  setTimeout( function () { //Plug-It
    $.getScript('https://rawgit.com/Plug-It/pi/pre-release/js/pi.js');
  }, 3000);
  setTimeout( function () { //ExtPlug
    $.getScript('https://extplug.github.io/ExtPlug/extplug.js');
  }, 3500);*/
}
