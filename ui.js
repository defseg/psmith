(function () {
if (typeof window.Psmith === 'undefined') window.Psmith = {};

var UI = window.Psmith.UI = function () {
    this.in_el = document.getElementById('in');
    this.go_el = document.getElementById('go');
    this.res_el = document.getElementById('res');
    this.res_el.innerHTML = '';

    // init tabnav
    this.tabnav = new Psmith.Tabnav();

    // init message pubs
    this.go_el.onclick = () => {window.Psmith.bus.publish('search', {'term': this.in_el.value})};

    // init message subs
    window.Psmith.bus.subscribe('search_results', this.display_search_results.bind(this));
    window.Psmith.bus.subscribe('search_error', this.display_error_or_no_results.bind(this));
    window.Psmith.bus.subscribe('detail_error', (msg) => console.error(msg.error)); // TODO handle this better?

    window.Psmith.url.init_url_handler();

    // if you hit enter, interpret that as a button click
    this.in_el.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            this.go_el.click();
        }
    }.bind(this));
}

UI.prototype.display_error_or_no_results = function (msg) {
	this.res_el.innerHTML = msg.error;
	console.error(msg.error);
}

UI.prototype.display_search_results = function (msg) {
	var results = msg.res;

	var values = results[0].values;
	var indices = Psmith.psherlock.build_indices(results[0]);

	// later on, this will be taken care of in the backend. TODO
	values = munge_results(values, indices);

	// build the actual element
	var res_contents = document.createElement('table');

	for (let row of values) {
	    res_contents.appendChild(language_template(row, indices))
	}

	this.res_el.innerHTML = '';
	this.res_el.appendChild(res_contents)
}

function munge_results(results, indices) {
	var new_results = [];
	var processed = {};
	for (let i of results) {
		if (!processed.hasOwnProperty(i[indices.id])) {
			i[indices.phoneme] = [i[indices.phoneme]];
			new_results.push(i);
			processed[i[indices.id]] = true;
		} else {
			new_results[new_results.length-1][indices.phoneme].push(i[indices.phoneme]);
		}
	}
	return new_results;
}

// -----------------
// -- detail view --
// -----------------

UI.language_detail = function (res) {
	var info = Psmith.psherlock.indexify(res.language_info)[0];
	var segments = res.segments;

	var el = document.createElement('div');


	var el_html = `
	<h3 class='language-name'>${info.language_name} (${info.source})</h3>
		<div class='language-phoible'>
			<a href="https://phoible.org/inventories/view/${info.inventory_id}">
				View on phoible.org
			</a>
		</div>
		<div class='language-family'>Family: ${info.language_family_genus}</div>
		<div class='language-code'>ISO 639-3: 
			<a href='https://www.ethnologue.com/language/${info.language_code}'>
				${info.language_code}
			</a>
		</div>
	<h4 class='language-segments'>Consonants (${segments.consonants.size()})</h4>
		${segments.consonants.to_html()}`;

	if (segments.clicks.size() > 0) {
		el_html += `<h4 class='language-segments'>Clicks (${segments.clicks.size()})</h4>
		${segments.clicks.to_html()}`;
	}

	el_html += `<h4 class='language-segments'>Vowels (${segments.vowels.size()})</h4>
	${segments.vowels.to_html()}`

	if (segments.syllabic_consonants.size() > 0) {
		el_html += `<h4 class='language-segments'>Syllabic consonants (${segments.syllabic_consonants.size()})</h4>
		${segments.syllabic_consonants.to_html()}`;
	}

	if (segments.tones.size() > 0) {
		el_html += `<h4 class='language-segments'>Tones (${segments.tones.size()})</h4>
		${segments.tones.to_html()}`;
	}

	el.innerHTML = el_html;

	return el;
}

// ------------------------------
// -- search result templating --
// ------------------------------

function language_template(row, indices) {
	var language_el = document.createElement('tr');
	var columns = [detail_link, phoible_link, ethnologue_link, phoneme_display];
	columns.forEach(f => {
		var td = document.createElement('td');
		td.appendChild(f(row, indices));
		language_el.appendChild(td);
	})
	return language_el;
}

function detail_link(row, indices) {
	var id = row[indices['id']];
	var name = row[indices['language_name']];

	var link = document.createElement('a');

	// dataset is slow and has poor cross-browser performance
	link.setAttribute('data-id', id);
	link.textContent = name;
	link.setAttribute('tabindex', '0'); // TODO: these should be real links with hrefs and all. need to get detail URL handling first tho

	// bind the event
	link.onclick = detail;

	return link;
}

function phoible_link(row, indices) {
	var id = row[indices['id']];
	var name = row[indices['language_name']];

	var link = document.createElement('a')

	link.href = `http://phoible.org/inventories/view/${id}`
	link.innerText = row[indices['source']];
	return link;
}

function ethnologue_link(row, indices) {
	var code = row[indices['language_code']]

	var link = document.createElement('a');
	
	link.href = `http://ethnologue.com/language/${code}`;
	link.textContent = ` (${code})`;
	return link;
}

function phoneme_display(row, indices) {
	var phonemes = row[indices['phoneme']];

	var el = document.createElement('span');

	el.textContent = phonemes.join(' ');
	return el;
}

// ------------------
// -- phoneme view --
// ------------------

function detail () {
	var id = this.getAttribute('data-id');
	window.Psmith.bus.publish('detail', {term: id});
}


})();