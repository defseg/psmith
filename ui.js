(function () {
if (typeof window.Psmith === 'undefined') window.Psmith = {};

var UI = window.Psmith.UI = function () {
	this.db = db;
    this.in_el = document.getElementById('in');
    this.go_el = document.getElementById('go');
    this.res_el = document.getElementById('res');
    this.res_el.innerHTML = '';

    // init message pubs
    this.go_el.onclick = () => {window.Psmith.bus.publish('search', {'term': this.in_el.value})};

    // init message subs
    window.Psmith.bus.subscribe('search', function (d) {
    	var query = d.term;
    	this.search(query);
    }.bind(this))

    // if you hit enter, interpret that as a button click
    this.in_el.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            this.go_el.click();
        }
    }.bind(this));
}

UI.prototype.search = function (query) {
	//try {
	    var results = Psmith.psherlock.search(Psmith.psentence.parse(query));
	//} catch (error) {
	//    this.res_el.innerHTML = error;
	//    return;
	// }

	try {
	    var values = results[0].values;
	} catch (error) {
	    this.res_el.innerHTML = 'No results'
	    return;
	}

	var indices = build_indices(results[0]);

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

// ----------------
// -- templating --
// ----------------

function language_template(row, indices) {
	var language_el = document.createElement('tr');
	var columns = [phoible_link, ethnologue_link, phoneme_display];
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
	link.href = '#'; // TODO: maybe it should be possible to link straight to an inventory and/or search?

	// bind the event
	link.onclick = detail;

	return link;
}

function phoible_link(row, indices) {
	var id = row[indices['id']];
	var name = row[indices['language_name']];

	var link = document.createElement('a')

	link.href = `http://phoible.org/inventories/view/${id}`
	link.textContent = name;
	return link;
}

function ethnologue_link(row, indices) {
	var code = row[indices['language_code']]

	var link = document.createElement('a');
	
	link.href = `http://ethnologue.com/language/${code}'`;
	link.textContent = ` (${code})`;
	return link;
}

function phoneme_display(row, indices) {
	var phonemes = row[indices['phoneme']];

	var el = document.createElement('span');

	el.textContent = phonemes.join(' ');
	return el;
}

function build_indices(results) {
	var indices = {};
	for (let i = 0; i < results.columns.length; i++) {
		indices[results.columns[i]] = i;
	}
	return indices;
}

// ------------------
// -- phoneme view --
// ------------------

function detail () {
	var id = this.getAttribute('data-id');
	var results = Psmith.psherlock.get_inventory(id);
	var indices = build_indices(results[0]);
	var inventory = results[0].values;
	phoneme_view(inventory, indices);
}

function phoneme_view(inventory, indices) {

}

function place_of_articulation(row, indices) {

}

function method_of_articulation(row, indices) {

}

function secondary_articulation(row, indices) {

}

function phonation(row) {

}

// ----------------------------------------------
// -- PHOIBLE feature to POA, MOA etc. mappers --
// ----------------------------------------------



})();