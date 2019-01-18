(function () {
if (typeof window.Psmith === 'undefined') window.Psmith = {}; 
if (typeof window.Psmith.psegmentizer === 'undefined') window.Psmith.psegmentizer = {};

var features = window.Psmith.psegmentizer.features = {};

features.unknown = {
    meta: {
        order: 99999
    }, features: [{'syllabic': 'you should never see this'}]
}

features.place_and_secondary_articulation = [
    {
        meta: {
            name: 'labial',
            order: 0
        }, features: [{
            'labial':      '+'
        ,   'round':       '-'
        ,   'labiodental': '-'
        ,   'coronal':     '-'
        ,   'dorsal':      '-'
        }]
    }, {
        meta: {
            name: 'palatalized labial',
            order: 1
        }, features: [{
                'labial':      '+'
            ,   'round':       '-'
            ,   'labiodental': '-'
            ,   'dorsal':      '+'
            ,   'front':       '+'
            ,   'back':        '+' 
            }]
    }, {
        meta: {
            name: 'rounded labial',
            order: 2
        }, features: [{
            'labial':      '+'
        ,   'round':       '+'
        ,   'coronal':     '-'
        ,   'dorsal':      '-'
        }]
    }, {
        meta: {
            name: 'labiodental',
            order: 3
        }, features: [{
            'round':       '-'
        ,   'labiodental': '+'
        }]
    }, {
        meta: {
            name: 'rounded labiodental',
            order: 4
        }, features: [{
            'round':       '+'
        ,   'labiodental': '+'
        }]
    }, {
        meta: {
            name: 'dental',
            order: 5
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '+'
        ,   'dorsal':      '-'
        }]
    }, {
        meta: {
            name: 'rounded dental',
            order: 6
        }, features: [{
            'labial':      '+'
        ,   'round':       '+'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '+'
        ,   'dorsal':      '-'    
        }]
    }, {
        meta: {
            name: 'palatalized dental',
            order: 7
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '+'
        ,   'dorsal':      '+'
        ,   'front':       '+'
        ,   'back':        '+'
        }]
    }, {
        meta: {
            name: 'velarized dental',
            order: 8
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '+'
        ,   'dorsal':      '+'
        ,   'front':       '-'
        ,   'back':        '-'
        }]
    }, {
        meta: {
            name: 'alveolar',
            order: 9
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '-'
        ,   'dorsal':      '-'
        }]
    }, {
        meta: {
            name: 'rounded alveolar',
            order: 10
        }, features: [{
            'labial':      '+'
        ,   'round':       '+'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '-'
        ,   'dorsal':      '-'
        }]
    }, {
        meta: {
            name: 'palatalized alveolar',
            order: 11
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '-'
        ,   'dorsal':      '+'
        ,   'front':       '+'
        ,   'back':        '+'
        }]
    }, {
        meta: {
            name: 'rounded palatalized alveolar',
            order: 12
        }, features: [{
            'labial':      '+'
        ,   'round':       '+'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '-'
        ,   'dorsal':      '+'
        ,   'front':       '+'
        ,   'back':        '+'
        }]
    }, {
        meta: {
            name: 'velarized alveolar',
            order: 13
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '-'
        ,   'dorsal':      '+'
        ,   'front':       '-'
        ,   'back':        '+'
        }]
    }, {
        meta: {
            name: 'retroflex',
            order: 14
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '-'
        ,   'distributed': '-'
        ,   'dorsal':      '-'
        }]
    }, {
        meta: {
            name: 'rounded retroflex',
            order: 15
        }, features: [{
            'labial':      '+'
        ,   'round':       '+'
        ,   'coronal':     '+'
        ,   'anterior':    '-'
        ,   'distributed': '-'
        ,   'dorsal':      '-'
        }]
    }, {
        meta: {
            name: 'palatalized retroflex',
            order: 16
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '-'
        ,   'distributed': '-'
        ,   'dorsal':      '+'
        ,   'front':       '+'
        ,   'back':        '+'
        }] // no velarized or labiopalatalized retroflexes in PHOIBLE?
    }, {
        meta: {
            name: 'alveolopalatal',
            order: 17
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '-'
        ,   'distributed': '+'
        ,   'dorsal':      '-'
        }]
    }, {
        meta: {
            name: 'rounded alveolopalatal',
            order: 18
        }, features: [{
            'labial':      '+'
        ,   'round':       '+'
        ,   'coronal':     '+'
        ,   'anterior':    '-'
        ,   'distributed': '+'
        ,   'dorsal':      '-'
        }]
    }, {
        meta: {
            name: 'palatalized alveolopalatal',
            order: 19
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '-'
        ,   'distributed': '+'
        ,   'dorsal':      '+'
        ,   'front':       '+'
        ,   'back':        '+'
        }]
    },  {
        meta: {
            name: 'velarized alveolopalatal',
            order: 20
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '-'
        ,   'distributed': '+'
        ,   'dorsal':      '+'
        ,   'front':       '-'
        ,   'back':        '+'
        }]
    },  {
        meta: {
            name: 'palatoalveolar',
            order: 21
        }, features: [{ // only diff btwn these and palatalized dentals is these are -back. yeah, sure.
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '+'
        ,   'dorsal':      '+'
        ,   'front':       '+'
        ,   'back':        '-'
        }]
    },  {
        meta: {
            name: 'rounded palatoalveolar',
            order: 22
        }, features: [{ // and rounding makes palatoalveolars stop being +dorsal...
            'labial':      '+'
        ,   'round':       '+'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '+'
        ,   'dorsal':      '-'
        }, { // ...except for tɕʷ! what in tarnation?!
            'labial':      '+'
        ,   'round':       '+'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '+'
        ,   'dorsal':      '+'
        ,   'front':       '+'
        ,   'back':        '-'
        }]
    }, {
        meta: {
            name: 'rounded palatalized palatoalveolar',
            order: 24,
        }, features: [{
            'labial':      '+'
        ,   'round':       '+'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '+'
        ,   'dorsal':      '+'
        ,   'front':       '+'
        ,   'back':        '+'
        }]
    }, {
        meta: {
            name: 'palatal',
            order: 25
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '-'
        ,   'distributed': '+'
        ,   'dorsal':      '+'
        ,   'high':        '+'
        ,   'low':         '-'
        ,   'front':       '+'
        ,   'back':        '-'
        }, { // These used to be "prevelars". /j/ and some bizarre SPA segments.
             // k̟ʰ k̟ ŋɡ̟ appear in five languages: Ket, Hakka, Irish Gaelic, French, and Lithuanian.
             // In Ket, Hakka, and French, these should be velars. In Irish and Lithuanian, palatals.
             // French will display as having no velars but /N/, but that's on them, not me.
             // There's also EWONDO (UPSID) i͓ if you search under +consonantal, 
             // but that's a fricated vowel, I think.
            'labial':      '-' 
        ,   'coronal':     '-'
        ,   'dorsal':      '+'
        ,   'high':        '+'
        ,   'low':         '-'
        ,   'front':       '+'
        ,   'back':        '-'
        }]
    }, {
        meta: {
            name: 'rounded palatal',
            order: 26
        }, features: [{
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
        }]
    }, { // The IPA made some very good decisions and now I have to put up with this.
        meta: {
            name: 'sje',
            order: 28
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '+'
        ,   'anterior':    '-'
        ,   'distributed': '+'
        ,   'dorsal':      '+'
        ,   'high':        '+'
        ,   'low':         '-'
        ,   'front':       '-'
        ,   'back':        '+'
        }]
    }, {
        meta: {
            name: 'velar',
            order: 29
        }, features: [{
            'labial':      '-' // all velars except ɰ
        ,   'coronal':     '-'
        ,   'dorsal':      '+'
        ,   'high':        '+'
        ,   'low':         '-'
        ,   'front':       '-'
        ,   'back':        '-'
        }, { 
            'labial':      '-' // ɰ
        ,   'coronal':     '-'
        ,   'dorsal':      '+'
        ,   'high':        '+'
        ,   'low':         '-'
        ,   'front':       '-'
        ,   'back':        '+'
        }]
    }, {
        meta: {
            name: 'rounded velar',
            order: 32
        }, features: [{
            'labial':      '+' // most rounded velars
        ,   'round':       '+'
        ,   'coronal':     '-'
        ,   'dorsal':      '+'
        ,   'high':        '+'
        ,   'low':         '-'
        ,   'front':       '-'
        ,   'back':        '-'
        }, {
            'labial':      '+' // w
        ,   'round':       '+'
        ,   'coronal':     '-'
        ,   'dorsal':      '+'
        ,   'high':        '+'
        ,   'low':         '-'
        ,   'front':       '-'
        ,   'back':        '+'
        }, {
            'labial':      '+' // w˞ 
        ,   'round':       '+'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '+'
        ,   'dorsal':      '+'
        ,   'high':        '+'
        ,   'low':         '-'
        ,   'front':       '-'
        ,   'back':        '+'
        }]
    }, {
        meta: {
            name: 'palatalized velar',
            order: 33,
        }, features: [{
            'labial':      '-'
        ,   'coronal':     '-'
        ,   'dorsal':      '+'
        ,   'high':        '+'
        ,   'low':         '-'
        ,   'front':       '+'
        ,   'back':        '+'
        }]
    }, {
        meta: {
            name: 'labial-alveolar',
            order: 34
        }, features: [{
            'labial':      '+'
        ,   'round':       '-'
        ,   'labiodental': '-'
        ,   'coronal':     '+'
        ,   'anterior':    '+'
        ,   'distributed': '-'
        ,   'dorsal':      '+'
        }]
    }, { // labial-uvulars are AFAIK completely unattested
        meta: {
            name: 'labial-velar',
            order: 35
        }, features: [{
            'labial':      '+'
        ,   'coronal':     '-'
        ,   'dorsal':      '+'
        ,   'round':       '-'
        }]
    }, {
        meta: {
            name: 'uvular',
            order: 36
        }, features: [{
            'labial':      '-'
        ,   'dorsal':      '+'
        ,   'high':        '-'
        ,   'low':         '-'
        }]
    }, {
        meta: {
            name: 'rounded uvular',
            order: 37
        }, features: [{
            'labial':      '+'
        ,   'round':       '+'
        ,   'dorsal':      '+'
        ,   'high':        '-'
        ,   'low':         '-'
        }]
    }, {
        meta: {
            name: 'pharyngeal',
            order: 38
        }, features: [{
            'labial':      '-'
        ,   'dorsal':      '+'
        ,   'high':        '-'
        ,   'low':         '+'
        }]
    }, {
        meta: {
            name: 'rounded pharyngeal',
            order: 39
        }, features: [{
            'labial':      '+'
        ,   'round':       '+'
        ,   'dorsal':      '+'
        ,   'high':        '-'
        ,   'low':         '+'
        }]
    }, {
        meta: {
            name: 'glottal',
            order: 40,
        }, features: [{ // No features - we get this with string processing, for reasons I forget.
            'round': 'mu' // But we need a fake one.
        }]
    }
],

features.pharyngeal_configuration = [
    {
        meta: {
            name: 'plain',
            order: 0
        }, features: [{
            'advanced_tongue_root': '-', 
            'retracted_tongue_root': '-'
        }]
    }, {
        meta: {
            name: 'pharyngealized',
            order: 1
        }, features: [{
            'advanced_tongue_root': '-', 
            'retracted_tongue_root': '+'
        }]
    }, {
        meta: {
            name: 'ATR',
            order: 2
        }, features: [{
            'advanced_tongue_root': '+',
            'retracted_tongue_root': '-'
        }]
    }
];

features.manner = [ // TODO: fix prenasalized consonants
    {
        meta: {
            name: 'plosive',
            order: 0
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '-'
        ,   'continuant':      '-'
        ,   'delayed_release': '-'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'nasalized plosive',
            order: 1
        }, features: [{ // PHOIBLE is wrong. These aren't nasalized. They nasalize following V.
            'consonantal':     '+' // Except for the nasalized clicks, which are nasalized.
        ,   'sonorant':        '-' // TODO: separate grid for clicks
        ,   'continuant':      '-'
        ,   'delayed_release': '-'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '+'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'affricate',
            order: 2
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '-'
        ,   'continuant':      '-'
        ,   'delayed_release': '+'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'nasalized affricate',
            order: 3
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '-'
        ,   'continuant':      '-'
        ,   'delayed_release': '+'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '+'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'fricative',
            order: 4
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '-'
        ,   'continuant':      '+'
        ,   'delayed_release': '+'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'nasalized fricative',
            order: 5
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '-'
        ,   'continuant':      '+'
        ,   'delayed_release': '+'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '+'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'nasal',
            order: 6
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '+'
        ,   'continuant':      '-'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '+'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'resonant',
            order: 7
        }, features: [{
            'consonantal':     '-'
        ,   'sonorant':        '+'
        ,   'continuant':      '+'
        ,   'approximant':     '+'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '-'
        }, {
            'consonantal':     '+' // r\`
        ,   'sonorant':        '+'
        ,   'continuant':      '+'
        ,   'approximant':     '+'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '-'
        }, {
            'consonantal':     '-'
        ,   'sonorant':        '-'
        ,   'continuant':      '+'
        ,   'delayed_release': '+'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'nasalized resonant',
            order: 8
        }, features: [{
            'consonantal':     '-'
        ,   'sonorant':        '+'
        ,   'continuant':      '+'
        ,   'approximant':     '+'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '+'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'tap',
            order: 9
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '+'
        ,   'continuant':      '+'
        ,   'approximant':     '+'
        ,   'tap':             '+'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'nasalized tap',
            order: 10
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '+'
        ,   'continuant':      '+'
        ,   'approximant':     '+'
        ,   'tap':             '+'
        ,   'trill':           '-'
        ,   'nasal':           '+'
        ,   'lateral':         '-'
        }]
    }, {
        meta: { 
            name: 'fricated tap',
            order: 11,
        }, features: [{ // ɾ͓
            'consonantal':     '+'
        ,   'sonorant':        '-'
        ,   'continuant':      '+'
        ,   'delayed_release': '+'
        ,   'approximant':     '-'
        ,   'tap':             '+'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'trill',
            order: 12
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '+'
        ,   'continuant':      '+'
        ,   'approximant':     '+'
        ,   'tap':             '-'
        ,   'trill':           '+'
        ,   'nasal':           '-'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'nasalized trill',
            order: 13
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '+'
        ,   'continuant':      '+'
        ,   'approximant':     '+'
        ,   'tap':             '-'
        ,   'trill':           '+'
        ,   'nasal':           '+'
        ,   'lateral':         '-'
        }]
    }, {
        meta: { 
            name: 'fricated trill',
            order: 14,
        }, features: [{ // r͓̪ - what? looks like this is UPSID =rF
            'consonantal':     '+'
        ,   'sonorant':        '+'
        ,   'continuant':      '+'
        ,   'approximant':     '+'
        ,   'tap':             '-'
        ,   'trill':           '+'
        ,   'nasal':           '-'
        ,   'lateral':         '-'
        }]
    }, {
        meta: {
            name: 'lateral resonant',
            order: 7.5
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '+'
        ,   'continuant':      '+'
        ,   'approximant':     '+'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '+'
        }]
    }, {
        meta: {
            name: 'nasalized lateral resonant',
            order: 7.7
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '+'
        ,   'continuant':      '+'
        ,   'delayed_release': '+'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '+'
        ,   'lateral':         '+'
        }]
    }, {
        meta: {
            name: 'lateral fricative',
            order: 4.5
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '-'
        ,   'continuant':      '+'
        ,   'delayed_release': '+'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '+'
        }]
    }, {
        meta: {
            name: 'lateral affricate',
            order: 2.5
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '-'
        ,   'continuant':      '-'
        ,   'delayed_release': '+'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '+'
        }, { // n̤d̤ɮ̤
            'consonantal':     '+'
        ,   'sonorant':        '+,-'
        ,   'continuant':      '-'
        ,   'delayed_release': '+'
        ,   'approximant':     '-'
        ,   'tap':             '-'
        ,   'trill':           '-'
        ,   'nasal':           '+,-'
        ,   'lateral':         '+'
        }]
    }, {
        meta: {
            name: 'lateral tap',
            order: 9.5
        }, features: [{
            'consonantal':     '+'
        ,   'sonorant':        '+'
        ,   'continuant':      '+'
        ,   'approximant':     '+'
        ,   'tap':             '+'
        ,   'trill':           '-'
        ,   'nasal':           '-'
        ,   'lateral':         '+'
        }]
    }
];

features.voicing = [
    {
        meta: {
            name: 'breathy-voiced',
            order: 3
        }, features: [{
        'periodic_glottal_source': '+'
    ,   'spread_glottis':          '+'
        }]
    }, {
        meta: {
            name: 'voiced',
            order: 2
        }, features: [{
            'periodic_glottal_source': '+'
        ,   'spread_glottis':          '-'
        }]
    }, {
        meta: {
            name: 'aspirated',
            order: 0
        }, features: [{
            'periodic_glottal_source': '-'
        ,   'spread_glottis':          '+'
        }]
    }, {
        meta: {
            name: 'unvoiced',
            order: 1
        }, features: [{
            'periodic_glottal_source': '-'
        ,   'spread_glottis':          '-'
        }]
    }
];

features.airstream_mechanism = [
    {
        meta: {
            name: 'ejective',
            order: 2
        }, features: [{
            'ejective': '+'
        ,   'implosive': '-'
        ,   'constricted_glottis': '-'
        }]
    }, {
        meta: {
            name: 'implosive',
            order: 3
        }, features: [{
            'ejective': '-'
        ,   'implosive': '+'
        ,   'constricted_glottis': '-'
        }]
    }, {
        meta: {
            name: 'glottalized',
            order: 1
        }, features: [{
            'ejective': '-'
        ,   'implosive': '-'
        ,   'constricted_glottis': '+'
        }]
    }, {
        meta: {
            name: 'glottalized implosive',
            order: 4,
        }, features: [{ // these vary in their ejective feature but that distinction seems fake
        'implosive': '+'
    ,   'constricted_glottis': '+'
        }]
    }, {
        meta: {
            name: 'modal',
            order: 0
        }, features: [{
            'ejective': '-'
        ,   'implosive': '-'
        ,   'constricted_glottis': '-'
        }]
    }
]

features.duration = [
    {
        meta: {
            name: 'normal',
            order: 1
        }, features: [{
            'short': '-'
        ,   'long':  '-'
        }]
    }, {
        meta: {
            name: 'short',
            order: 0
        }, features: [{
            'short': '+'
        ,   'long':  '-'
        }]
    }, {
        meta: {
            name: 'half-long',
            order: 2
        }, features: [{
            'short': '+'
        ,   'long':  '+'
        }]
    }, {
        meta: {
            name: 'long',
            order: 3
        }, features: [{
            'short': '-'
        ,   'long':  '+'
        }]
    }
];

features.strength = [
    {
        meta: {
            name: 'normal',
            order: 0
        }, features: [{
            'fortis': '-'
        }]
    }, {
        meta: {
            name: 'fortis',
            order: 1
        }, features: [{
            'fortis': '+'
        }]
    }
]

})();