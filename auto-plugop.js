/* Obtain Host, plug.dj Admin, Silver Sub, Gold Sub and RCS ranks (it's just locally, you won't really get these ranks) */

API.chatLog('Applying Host, BA, Sub...');
_.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('role',5);
_.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('gRole',5);
_.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('silver',1);
_.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('sub',1);
setTimeout( function() {
	API.chatLog('Reloading RCS...');
	API.sendChat('/reload');
}, 1000);
var inject = setTimeout( function() {
	API.chatLog('Injecting RCS ranks...');
	setInterval( function() {
		rcs.specialRanks.developer.push(API.getUser().id);
		rcs.specialRanks.test.push(API.getUser().id);
		rcs.specialRanks.staff.push(API.getUser().id);
		rcs.specialRanks.exstaff.push(API.getUser().id);
		rcs.specialRanks.contributor.push(API.getUser().id);
		rcs.specialRanks.vip.push(API.getUser().id);
		rcs.specialRanks.verified.push(API.getUser().id);
		rcs.specialRanks.donator.patreon.push(API.getUser().id);
		rcs.specialRanks.donator.patreonGold.push(API.getUser().id);
		rcs.specialRanks.donator.bronze.push(API.getUser().id);
		rcs.specialRanks.donator.silver.push(API.getUser().id);
		rcs.specialRanks.donator.gold.push(API.getUser().id);
		rcs.specialRanks.donator.diamond.push(API.getUser().id);
		//rcs.specialRanks.donator.custom.push(API.getUser().id);
		rcs.specialRanks.translator.push(API.getUser().id);
	}, 10);
}, 1000);
setTimeout( function() {
	clearInterval(inject);
	API.chatLog('Done injecting RCS ranks.');
	API.chatLog('Congrats! You have unlocked client-side features of Hosts, BAs, Subs and all RCS ranks!');
}, 5000);
