/* Obtain Brand Ambassador and RCS Developer (it's just locally, you won't really get these ranks) */

API.chatLog('Applying BA...');
_.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('gRole',3);
setTimeout( function() {
	API.chatLog('Reloading RCS...');
	API.sendChat('/reload');
}, 1000);
var inject = setTimeout( function() {
	API.chatLog('Injecting RCS rank...');
	setInterval( function() {
		rcs.specialRanks.developer.push(API.getUser().id);
	}, 10);
}, 1000);
setTimeout( function() {
	clearInterval(inject);
	API.chatLog('Done injecting RCS rank.');
	API.chatLog('Congrats! You have unlocked client-side features of BAs and RCS Dev!');
}, 5000);
