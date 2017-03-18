var autoSkipInterval = null;
var pendingSkip = false;
var running = false;
API.sendChat('/me AutoSelfSkip initialised!');
function initAutoSkip() {
	autoSkipInterval = setInterval(function () {
		if (API.getTimeRemaining() <= -1 && running == false) {
			running = true;
			setTimeout(function () {
				if (API.getTimeRemaining() <= -1 && !pendingSkip) {
					$.ajax({type: "POST", url: "/_/booth/skip/me"})
					API.sendChat('/me if I was playing, I skipped myself.');
					pendingSkip = true;
					setTimeout(function () {
						running = false;
						pendingSkip = false;
					}, 1000);
				}
			}, 5000);
		}
	}, 1000);
}
function stopAutoSkip() {
	clearInterval(autoSkipInterval);
}
initAutoSkip();