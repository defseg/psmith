(function () {
if (typeof window.Psmith === 'undefined') window.Psmith = {}; 
if (typeof window.Psmith.psegmentizer === 'undefined') window.Psmith.psegmentizer = {};

var features = window.Psmith.psegmentizer.features = {};

// Cache metadata objects, because we'll store them in a set later.
// If we make them on the fly with no caching, there could be two different 
// objects with the same properties.
// Have to hoist this so f() doesn't get confused.
var metas = {};

features.unknown = f('unknown', 100, {})

// TODO: This whole thing should be rewritten.
// Define feature metadata first and only once,
// then associate binary feature bundles with the feature metadata.
// That way nothing is duplicated and the code will look nicer -
// - since feature metadata lines won't be broken up by feature bundles.
// Also it'll mean the ugly caching stuff won't be needed anymore.

features.place_and_secondary_articulation = [
    f('labial', 0, {
        'labial':      '+'
    ,   'round':       '-'
    ,   'labiodental': '-'
    ,   'coronal':     '-'
    ,   'dorsal':      '-'
    }),   
    f('palatalized labial', 1, {
        'labial':      '+'
    ,   'round':       '-'
    ,   'labiodental': '-'
    ,   'dorsal':      '+'
    ,   'front':       '+'
    ,   'back':        '+' 
    }),
    f('rounded labial', 2, {
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '-'
    ,   'dorsal':      '-'
    }),
    f('labiodental', 3, {
        'round':       '-'
    ,   'labiodental': '+'
    }),     
    f('rounded labiodental', 4, {
        'round':       '+'
    ,   'labiodental': '+'
    }),     
    f('dental', 5, {
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '+'
    ,   'dorsal':      '-'
    }),     
    f('rounded dental', 6, {
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '+'
    ,   'dorsal':      '-'    
    }),     
    f('palatalized dental', 7, {
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '+'
    ,   'dorsal':      '+'
    ,   'front':       '+'
    ,   'back':        '+'
    }),     
    f('velarized dental', 8, {
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '+'
    ,   'dorsal':      '+'
    ,   'front':       '-'
    ,   'back':        '-'
    }),     
    f('alveolar', 9, {
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '-'
    ,   'dorsal':      '-'
    }),     
    f('rounded alveolar', 10, {
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '-'
    ,   'dorsal':      '-'
    }),
    f('palatalized alveolar', 11, {
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '-'
    ,   'dorsal':      '+'
    ,   'front':       '+'
    ,   'back':        '+'
    }),     
    f('rounded palatalized alveolar', 12, {
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '-'
    ,   'dorsal':      '+'
    ,   'front':       '+'
    ,   'back':        '+'
    }),     
    f('velarized alveolar', 13, {
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '-'
    ,   'dorsal':      '+'
    ,   'front':       '-'
    ,   'back':        '+'
    }),     
    f('retroflex', 14, {
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '-'
    ,   'distributed': '-'
    ,   'dorsal':      '-'
    }),     
    f('rounded retroflex', 15, {
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '+'
    ,   'anterior':    '-'
    ,   'distributed': '-'
    ,   'dorsal':      '-'
    }),     
    f('palatalized retroflex', 16, {
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '-'
    ,   'distributed': '-'
    ,   'dorsal':      '+'
    ,   'front':       '+'
    ,   'back':        '+'
    }), // no velarized or labiopalatalized retroflexes in PHOIBLE?
    f('alveolopalatal', 17, {
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '-'
    ,   'distributed': '+'
    ,   'dorsal':      '-'
    }),     
    f('rounded alveolopalatal', 18, {
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '+'
    ,   'anterior':    '-'
    ,   'distributed': '+'
    ,   'dorsal':      '-'
    }),     
    f('palatalized alveolopalatal', 19, { // what?
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '-'
    ,   'distributed': '+'
    ,   'dorsal':      '+'
    ,   'front':       '+'
    ,   'back':        '+'
    }),     
    f('velarized alveolopalatal', 20, { // really?
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '-'
    ,   'distributed': '+'
    ,   'dorsal':      '+'
    ,   'front':       '-'
    ,   'back':        '+'
    }),     
    f('palatoalveolar', 21, { // only diff btwn these and palatalized dentals is these are -back. yeah, sure.
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '+'
    ,   'dorsal':      '+'
    ,   'front':       '+'
    ,   'back':        '-'
    }),     
    f('rounded palatoalveolar', 22, { // and rounding makes palatoalveolars stop being +dorsal...
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '+'
    ,   'dorsal':      '-'
    }),     
    f('rounded palatoalveolar', 23, { // ...except for tɕʷ! what in tarnation?!
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '+'
    ,   'dorsal':      '+'
    ,   'front':       '+'
    ,   'back':        '-'
    }),     
    f('rounded palatalized palatoalveolar', 24, { // %@*$%*$@#!!!! pray there are no labiopalatalized dentals?
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '+'
    ,   'dorsal':      '+'
    ,   'front':       '+'
    ,   'back':        '+'
    }),     
    f('palatal', 25, {
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '-'
    ,   'distributed': '+'
    ,   'dorsal':      '+'
    ,   'high':        '+'
    ,   'low':         '-'
    ,   'front':       '+'
    ,   'back':        '-'
    }),     
    f('rounded palatal', 26, {
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '+'
    ,   'anterior':    '-'
    ,   'distributed': '+'
    ,   'dorsal':      '+'
    ,   'high':        '+'
    ,   'low':         '-'
    ,   'front':       '+'
    ,   'back':        '-'
    }),     
    f('sje', 27, { // IPA sure does make good decisions!! this is basically a rounded dorsal, lbr. TODO?
        'labial':      '-'
    ,   'coronal':     '+'
    ,   'anterior':    '-'
    ,   'distributed': '+'
    ,   'dorsal':      '+'
    ,   'high':        '+'
    ,   'low':         '-'
    ,   'front':       '-'
    ,   'back':        '+'
    }),     
    f('velar', 28, { // ɰ is also special-cased. TODO maybe move all this %#@^$% to errata
        'labial':      '-'
    ,   'coronal':     '-'
    ,   'dorsal':      '+'
    ,   'high':        '+'
    ,   'low':         '-'
    ,   'front':       '-'
    ,   'back':        '+'
    }),     
    f('rounded velar', 29, { // this is w˞   it is also exceedingly silly. TODO
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '+'
    ,   'dorsal':      '+'
    ,   'high':        '+'
    ,   'low':         '-'
    ,   'front':       '-'
    ,   'back':        '+'
    }),     
    f('prevelar', 30, { // what? do these contrast with palatals? TODO
        'labial':      '-'
    ,   'coronal':     '-'
    ,   'dorsal':      '+'
    ,   'high':        '+'
    ,   'low':         '-'
    ,   'front':       '+'
    ,   'back':        '-'
    }),     
    f('velar', 31, {
        'labial':      '-'
    ,   'coronal':     '-'
    ,   'dorsal':      '+'
    ,   'high':        '+'
    ,   'low':         '-'
    ,   'front':       '-'
    ,   'back':        '-'
    }),     
    f('rounded velar', 32, {
        'labial':      '+'
    ,   'round':       '+'
    ,   'coronal':     '-'
    ,   'dorsal':      '+'
    ,   'high':        '+'
    ,   'low':         '-'
    ,   'front':       '-'
    ,   'back':        '-'
    }),     
    f('rounded velar', 32, { // w
    	'labial': 	   '+'
    ,	'round':       '+'
    ,   'coronal':     '-'
    ,   'dorsal':      '+'
    ,	'high':        '+'
    ,   'low':         '-'
    ,   'front':       '-'
    ,   'back':        '+'
    }),
    f('palatalized velar', 33, { 
        'labial':      '-'
    ,   'coronal':     '-'
    ,   'dorsal':      '+'
    ,   'high':        '+'
    ,   'low':         '-'
    ,   'front':       '+'
    ,   'back':        '+'
    }),     
    f('labial-alveolar', 34, {
        'labial':      '+'
    ,   'round':       '-'
    ,   'labiodental': '-'
    ,   'coronal':     '+'
    ,   'anterior':    '+'
    ,   'distributed': '-'
    ,   'dorsal':      '+'
    }),     
    f('labial-velar', 35, {
        'labial':      '+'
    ,   'coronal':     '-'
    ,   'dorsal':      '+'
    ,   'round':       '-'
    }),     
    f('uvular', 36, { // NB: no palatalized uvulars - Ubykh isn't in PHOIBLE
        'labial':       '-'
    ,   'dorsal':      '+'
    ,   'high':        '-'
    ,   'low':         '-'
    }),     
    f('rounded uvular', 37, {
    	'labial':      '+'
    ,   'round':       '+'
    ,   'dorsal':      '+'
    ,   'high':        '-'
    ,   'low':         '-'
    }),     
    f('pharyngeal', 38, {
        'labial':      '-'
    ,   'dorsal':      '+'
    ,   'high':        '-'
    ,   'low':         '+'
    }),     
    f('rounded pharyngeal', 39, {
    	'labial':      '+'
    ,   'round':       '+'
    ,   'dorsal':      '+'
    ,   'high':        '-'
    ,   'low':         '+'
    }),
    f('glottal', 40, { 
    	// no features - we get this with string processing
    	// but we need a fake one
    	'round': 'mu'
    })
];

features.pharyngeal_configuration = [
    f('plain',          0, {'advanced_tongue_root': '-', 'retracted_tongue_root': '-'}),
    f('pharyngealized', 1, {'advanced_tongue_root': '-', 'retracted_tongue_root': '+'}),
    f('ATR'           , 2, {'advanced_tongue_root': '+', 'retracted_tongue_root': '-'})
];

features.manner = [ // TODO: fix prenasalized consonants
    f('plosive', 0, {
        'consonantal':     '+'
    ,   'sonorant':        '-'
    ,   'continuant':      '-'
    ,   'delayed_release': '-'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '-'
    }),
    f('nasalized plosive', 1, { // actually nasality-conditioning, I think
        'consonantal':     '+'
    ,   'sonorant':        '-'
    ,   'continuant':      '-'
    ,   'delayed_release': '-'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '+'
    ,   'lateral':         '-'
    }),
    f('affricate', 2, {
        'consonantal':     '+'
    ,   'sonorant':        '-'
    ,   'continuant':      '-'
    ,   'delayed_release': '+'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '-'
    }),
    f('nasalized affricate', 3, { // actually nasality-conditioning again
        'consonantal':     '+'
    ,   'sonorant':        '-'
    ,   'continuant':      '-'
    ,   'delayed_release': '+'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '+'
    ,   'lateral':         '-'
    }),
    f('fricative', 4, {
        'consonantal':     '+'
    ,   'sonorant':        '-'
    ,   'continuant':      '+'
    ,   'delayed_release': '+'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '-'
    }),
    f('nasalized fricative', 5, {
        'consonantal':     '+'
    ,   'sonorant':        '-'
    ,   'continuant':      '+'
    ,   'delayed_release': '+'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '+'
    ,   'lateral':         '-'
    }),
    f('nasal', 6, {
        'consonantal':     '+'
    ,   'sonorant':        '+'
    ,   'continuant':      '-'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '+'
    ,   'lateral':         '-'
    }),
    f('resonant', 7, {
        'consonantal':     '-'
    ,   'sonorant':        '+'
    ,   'continuant':      '+'
    ,   'approximant':     '+'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '-'
    }),
    f('nasalized resonant', 8, {
        'consonantal':     '-'
    ,   'sonorant':        '+'
    ,   'continuant':      '+'
    ,   'approximant':     '+'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '+'
    ,   'lateral':         '-'
    }),
    f('tap', 9, {
        'consonantal':     '+'
    ,   'sonorant':        '+'
    ,   'continuant':      '+'
    ,   'approximant':     '+'
    ,   'tap':             '+'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '-'
    }),
    f('nasalized tap', 10, {
        'consonantal':     '+'
    ,   'sonorant':        '+'
    ,   'continuant':      '+'
    ,   'approximant':     '+'
    ,   'tap':             '+'
    ,   'trill':           '-'
    ,   'nasal':           '+'
    ,   'lateral':         '-'
    }),
    f('fricated tap', 11, { // ɾ͓
        'consonantal':     '+'
    ,   'sonorant':        '-'
    ,   'continuant':      '+'
    ,   'delayed_release': '+'
    ,   'approximant':     '-'
    ,   'tap':             '+'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '-'
    }),
    f('trill', 12, {
        'consonantal':     '+'
    ,   'sonorant':        '+'
    ,   'continuant':      '+'
    ,   'approximant':     '+'
    ,   'tap':             '-'
    ,   'trill':           '+'
    ,   'nasal':           '-'
    ,   'lateral':         '-'
    }),
    f('nasalized trill', 13, {
        'consonantal':     '+'
    ,   'sonorant':        '+'
    ,   'continuant':      '+'
    ,   'approximant':     '+'
    ,   'tap':             '-'
    ,   'trill':           '+'
    ,   'nasal':           '+'
    ,   'lateral':         '-'
    }),
    f('fricated trill', 14, { // r͓̪ - what? looks like this is UPSID =rF
        'consonantal':     '+'
    ,   'sonorant':        '+'
    ,   'continuant':      '+'
    ,   'approximant':     '+'
    ,   'tap':             '-'
    ,   'trill':           '+'
    ,   'nasal':           '-'
    ,   'lateral':         '-'
    }),
    f('resonant', 7, { // r\`
        'consonantal':     '+'
    ,   'sonorant':        '+'
    ,   'continuant':      '+'
    ,   'approximant':     '+'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '-'
    }),
    f('resonant', 7, { // W
        'consonantal':     '-'
    ,   'sonorant':        '-'
    ,   'continuant':      '+'
    ,   'delayed_release': '+'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '-'
    }),
    f('lateral resonant', 7.5, {
        'consonantal':     '+'
    ,   'sonorant':        '+'
    ,   'continuant':      '+'
    ,   'approximant':     '+'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '+'
    }),
    f('nasalized lateral resonant', 7.7, {
        'consonantal':     '+'
    ,   'sonorant':        '+'
    ,   'continuant':      '+'
    ,   'delayed_release': '+'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '+'
    ,   'lateral':         '+'
    }),
    f('lateral fricative', 4.5, {
        'consonantal':     '+'
    ,   'sonorant':        '-'
    ,   'continuant':      '+'
    ,   'delayed_release': '+'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '+'
    }),
    f('lateral affricate', 3.5, {
        'consonantal':     '+'
    ,   'sonorant':        '-'
    ,   'continuant':      '-'
    ,   'delayed_release': '+'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '+'
    }),
    f('prenasalized lateral affricate', 3.7, { // n̤d̤ɮ̤
        'consonantal':     '+'
    ,   'sonorant':        '+,-'
    ,   'continuant':      '-'
    ,   'delayed_release': '+'
    ,   'approximant':     '-'
    ,   'tap':             '-'
    ,   'trill':           '-'
    ,   'nasal':           '+,-'
    ,   'lateral':         '+'
    }),
    f('lateral tap', 9.5, {
        'consonantal':     '+'
    ,   'sonorant':        '+'
    ,   'continuant':      '+'
    ,   'approximant':     '+'
    ,   'tap':             '+'
    ,   'trill':           '-'
    ,   'nasal':           '-'
    ,   'lateral':         '+'
    })
];

features.voicing = [
    f('breathy-voiced', 3, {
        'periodic_glottal_source': '+'
    ,   'spread_glottis':          '+'
    }),
    f('voiced', 2, {
        'periodic_glottal_source': '+'
    ,   'spread_glottis':          '-'
    }),
    f('aspirated', 0, {
        'periodic_glottal_source': '-'
    ,   'spread_glottis':          '+'
    }),
    f('unvoiced', 1, {
        'periodic_glottal_source': '-'
    ,   'spread_glottis':          '-'
    }),
];

features.airstream_mechanism = [
    f('ejective', 2, {
        'ejective': '+'
    ,   'implosive': '-'
    ,   'constricted_glottis': '-'
    }),
    f('implosive', 3, {
        'ejective': '-'
    ,   'implosive': '+'
    ,   'constricted_glottis': '-'
    }),
    f('glottalized', 1, {
        'ejective': '-'
    ,   'implosive': '-'
    ,   'constricted_glottis': '+'
    }),
    f('glottalized implosive', 4, { // these vary in their ejective feature but that distinction seems fake
        'implosive': '+'
    ,   'constricted_glottis': '+'
    }),
    f('modal', 0, {
        'ejective': '-'
    ,   'implosive': '-'
    ,   'constricted_glottis': '-'
    })
];

features.duration = [
    f('normal', 1, {
        'short': '-'
    ,   'long':  '-'
    }),
    f('short', 0, {
        'short': '+'
    ,   'long':  '-'
    }),
    f('half-long', 2, {
        'short': '+'
    ,   'long':  '+'
    }),
    f('long', 3, {
        'short': '-'
    ,   'long':  '+'
    })
];

features.strength = [
	f('normal', 0, {
		'fortis': '-'
	}),
	f('fortis', 1, {
		'fortis': '+'
	})
];

function f(name, order, features) {
	if (metas.hasOwnProperty(name + order)) {
		var meta = metas[name + order];
	} else {
		var meta = {'name': name, 'order': order};
		metas[name + order] = meta;
	}
    return {
    	'meta': meta
    ,	'features': features
	}
}

})();