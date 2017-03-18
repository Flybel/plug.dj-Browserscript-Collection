/* Obtain Host, Brand Ambassador (4), Silver Sub, Gold Sub and RCS ranks (it's just locally, you won't really get these ranks) */

_.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('role',5);
_.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('gRole',4);
_.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('silver',1);
_.find(require.s.contexts._.defined, (m) => { return m && m._l}).set('sub',1);
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
