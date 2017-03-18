/* There is an issue with RCS Autojoin. This will do the job. v1.1 */

var run = true;
var join = null;
function interval (newstate) {
	if ( newstate ) {
		join = setInterval(function () {
			if ( API.getDJ() == null ) {
				API.djJoin();
			}
		}, 2000);
	}
	else {
		clearInterval(join);
	}
}
API.on(API.CHAT_COMMAND, data => {
	var args = data.split(" ");
	if ( args[0] == "/autojoinoff" && run ) {
		API.chatLog("AutoJoin disabled. Run /autojoinon to re-enable.");
		run = false;
		interval(false);
	}
	else if ( args[0] == "/autojoinon" && !run ) {
		API.chatLog("AutoJoin re-enabled. Run /autojoinoff to disable.");
		run = true;
		interval(true);
	}
});
API.chatLog('AutoJoin enabled. Run /autojoinoff to disable.');
interval(true);
