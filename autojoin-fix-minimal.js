/* AutoJoin Fix for RCS, minimal version. Requires RCS!
Looking for a more extensive script? Use autojoin-fix.js */

setInterval(function () {
  if ( rcs.settings.autoJoin ) {
    if ( API.getDJ() == null ) {
      API.djJoin();
    }
  }
}, 2000);
