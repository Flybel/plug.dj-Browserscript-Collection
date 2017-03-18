/* Obtain Brand Ambassador (it's just locally, you won't really get that rank) */

API.chatLog('Applying BA...');
_.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('gRole',3);
setTimeout( function() {
	API.chatLog('Reloading RCS...');
	API.sendChat('/reload');
}, 1000);
setTimeout( function() {
	API.chatLog('Congrats! You have unlocked client-side features of BAs!');
}, 2000);
