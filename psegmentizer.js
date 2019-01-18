(function () {
if (typeof window.Psmith === 'undefined') window.Psmith = {}; 
if (typeof window.Psmith.psegmentizer === 'undefined') window.Psmith.psegmentizer = {};
// TODO:
// - do vowel stuff
window.Psmith.psegmentizer.psegmentize = function (segments) {
    // Pass in the raw results of get_inventory.

    segments = indexify(segments.values, build_indices(segments));
    var mapped = segments.map(x => segment_info(x));

    var consonants = [];
    var clicks = []; // Yes, these are consonants, but they need a separate table. Like lanthanides and actinides.
    var vowels = [];
    var tones = [];
    var unknowns = [];

    mapped.forEach(x => {
        if (x && x.klass === 'consonant') {
            consonants.push(x)
        } else if (x && x.klass === 'click') {
            clicks.push(x)
        } else if (x && x.klass === 'vowel') {
            vowels.push(x)
        } else if (x && x.klass === 'tone') {
            tones.push(x);
        }
    });

    return {
        'consonants': build_grid(consonants),
        'clicks': build_grid(clicks),
        'vowels': new PhonemeArray(vowels), // TODO make a nice grid for these too
        'tones': new PhonemeArray(tones)
    }
}

function build_grid(phonemes) {
    var ys = new Set();
    var xs = new Set();

    // First iteration over phonemes: build X and Y axes
    for (let p of phonemes) {
        let [y, x] = get_y_x(p);
        ys.add(y);
        xs.add(x);
    }

    // Now sort them and initialize the grid
    var comparem = (a, b) => a.order - b.order;
    var mappem   = x => x.name;
    xs = [...xs].sort(comparem).map(mappem);
    ys = [...ys].sort(comparem).map(mappem);

    var phoneme_matrix = new PhonemeMatrix(ys, xs);
    
    // Second iteration over phonemes: populate the grid
    for (let p of phonemes) {
        var foo = get_y_x(p).map(mappem)
        phoneme_matrix.get(foo[0],foo[1]).push(p);
    }

    return phoneme_matrix
}

function PhonemeMatrix(ys, xs) {
    this.map = new Map();
    this.y_headers = [];
    this.x_headers = [];

    for (let y of ys) this.y_headers.push(y);
    for (let x of xs) this.x_headers.push(x);

    for (let y of ys) {
        this.map.set(y, new Map());
        for (let x of xs) {
            this.map.get(y).set(x, []);
        }
    }
}
PhonemeMatrix.prototype.get = function (y, x) {
    return this.map.get(y).get(x);
}
PhonemeMatrix.prototype.count_y = function (y) {
    // Return the number of distinct phonemes in a chart row.
    return [...this.map.get(y).entries()].reduce((acc, cur) => acc + cur[1].length, 0)
}
PhonemeMatrix.prototype.count_x = function (x) {
    // Return the number of distinct phonemes in a chart column.
    return [...this.map.entries()].reduce((acc, cur) => acc + cur[1].get(x).length, 0)
}
PhonemeMatrix.prototype.merge_columns = function (merge_from, merge_into) {
    // TODO
}

PhonemeMatrix.prototype.to_html = function () {
    // just build a string for now. TODO maybe do it right (build nodes) later
    var res = '<table>';
    
    // need to build x headers first
    res += '<tr><th></th>';
    for (let x_header of this.x_headers) res += `<th>${x_header}</th>`;

    for (let y of this.map.entries()) {
        var [y_header, y_contents] = y;
        res += `<tr><th>${y_header}</th>`;
        for (let x of y_contents.entries()) {
            var [x_header, x_contents] = x;
            res += `<td>${x_contents.map(i => i.phoneme).join(' ')}</td>`;
        }
        res += '</tr>';
    }
    res += '</table>';
    return res;
}

// We want tones to also have a to_html, so we'll make a one-dimensional array too. TODO test this
function PhonemeArray (phonemes) {
    this.phonemes = phonemes;
}
PhonemeArray.prototype.to_html = function () {
    return `<span>${this.phonemes.join(' ')}</span>`
}


function get_y_x(phoneme) {
    if (phoneme.klass === 'consonant' || phoneme.klass === 'click') return [phoneme.manner, phoneme.place];
    throw new Error('TODO: get_x_y for vowels');
}

// TODO: move this to a utils file or something - I think there's some code duplication here
function indexify(values, indices) {
  var new_results = [];
  for (let res of values) {
    var new_res = {};
    for (let index in indices) {
      new_res[index] = res[indices[index]];
    }
    new_results.push(new_res);
  }
  return new_results;
}

function build_indices(results) {
    var indices = {};
    for (let i = 0; i < results.columns.length; i++) {
        indices[results.columns[i]] = i;
    }
    return indices;
}

function segment_info(segment) {
    // vowels
    if (segment.syllabic !== '-' && segment.consonantal === '-') return vowel_info(segment);
    if (segment.syllabic && segment.syllabic.indexOf(',') > -1) return vowel_info(segment); // aj, aw etc. - erroneous diphthongs

    // tones
    if (segment.tone === '+') return tone_info(segment);

    // click consonants
    if (segment.click === '+') return consonant_info(segment, true);

    // if it's not a vowel or a tone, it's a consonant
    return consonant_info(segment);
}

function vowel_info(segment) {
    // TODO
    return {
        phoneme: segment.segment
    ,   klass: 'vowel'
    }
}

function tone_info(segment) {
    // TODO?
    return {
        phoneme: segment.segment
    ,   klass: 'tone'
    }
}

function consonant_info(segment, is_click = false) {
    return {
        phoneme: segment.segment
    ,   klass: is_click ? 'click' : 'consonant'
    ,   place: get_place_and_secondary_articulation(segment)
    ,   pharyngeal_configuration: get('pharyngeal_configuration', segment)
    ,   manner: get('manner', segment)
    ,   voicing: get('voicing', segment)
    ,   airstream_mechanism: get('airstream_mechanism', segment)
    ,   duration: get('duration', segment) // probably shouldn't call this "length"
    ,   strength: get('strength', segment)
    }
}

function get_place_and_secondary_articulation(segment) {
    var seg = segment.segment;
    // TODO also epiglottals.

    // Glottals are hard
    if (seg[0] === 'h' || seg[0] === 'ʔ' || seg[0] === 'ɦ') return get_by_name('place_and_secondary_articulation', 'glottal');

    // Errata
    if (seg === 'ŋm') return get_by_name('place_and_secondary_articulation', 'labial-velar'); // given as -,+labial - this should be +labial
    if (seg === 'ɠɓ') return get_by_name('place_and_secondary_articulation', 'labial-velar'); 
    if (seg === 'ɡbʲ') return get_by_name('place_and_secondary_articulation', 'palatalized labial-velar');
    if (seg === 'ɡbʷ') return get_by_name('place_and_secondary_articulation', 'rounded labial-velar');
    if (seg === 'nɡ') return get_by_name('place_and_secondary_articulation', 'velar');
    if (seg === 'nɟ') return get_by_name('place_and_secondary_articulation', 'palatal');
    if (seg === 'ndzʲ') return get_by_name('place_and_secondary_articulation', 'palatalized alveolar'); // should be +back but isn't
    if (seg === 'ɹ' || seg === 'ɹ' || seg === 'ɹˤ' || seg === 'ɹ̰ˤ' || seg === 'ɹ̝') return get_by_name('place_and_secondary_articulation', 'alveolar') // given as alveolopalatal
    if (seg === 'ŋmkpɾ') return get_by_name('place_and_secondary_articulation', 'labial-velar');
    if (seg === 'nɡɾ') return get_by_name('place_and_secondary_articulation', 'velar');

    return get('place_and_secondary_articulation', segment)
}

function get(form, segment) {
    var res = window.Psmith.psegmentizer.features[form].find(x => test(segment, x));
    if (res === undefined) return window.Psmith.psegmentizer.features.unknown;
    return res.meta;
}

function get_by_name(form, name) {
    var res = window.Psmith.psegmentizer.features[form].find(x => x.meta.name === name);
    return res.meta;
}

function test(segment, foo_oa) {
    // Compares the beginning - beware time-variant features.
    for (let feature_bundle of foo_oa.features) {
        var matches = Object.keys(feature_bundle).every(function (x) {
            return !(segment[x] === undefined) && !(segment[x] === null) &&
                    segment[x].indexOf(feature_bundle[x]) === 0;
        });
        if (matches) return true;
    }
    return false;
}

// TODO: unknown doesn't work
})();