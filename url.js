(function () {
	if (typeof window.Psmith === 'undefined') window.Psmith = {};

	Psmith.url = {};

	Psmith.url.init_url_handler = function () {
		window.Psmith.bus.subscribe('search', function (event) {
			set_hash('search', event.term)
		});
		window.Psmith.bus.subscribe('detail', function (event) {
			set_hash('detail', event.term)
		});

		var hash = get_hash();
		if (hash === null) return;

		for (let k of Object.keys(hash)) {
			window.Psmith.bus.publish(k, {'term': hash[k]});
		}
	}

	var get_hash = Psmith.url.get_hash = function () { // could cache this but eh
		var hash = window.location.hash;
		if (hash === '') return null;
		hash = hash.slice(1, window.location.hash.length); // discard initial #
		hash = hash.split('&');

		var res = {};
		for (let el of hash) {
			let tmp = el.split('=');
			res[decode(tmp[0])] = decode(tmp[1]);
		}
		return res;
	}

	function set_hash(k, v) {
		var hash = get_hash();
		if (hash === null) hash = {};
		hash[k] = v;
		write_hash(hash);
	}

	function write_hash(hash) {
		var res = Object.keys(hash).map(k => `${encode(k)}=${encode(hash[k])}`);
		window.location.hash = res.join('&');
	}

	function encode(thing) {
		// OK, this is a little tricky.
		// Negative lookbehind is ES2018, and I don't feel like looking up how well it's supported.
		// Since we want to use & to separate key-value pairs, and = to separate keys from values,
		// we'll want to split on *unescaped* & and =. Which is... negative lookbehind!
		// So instead we'll just escape them to something else.
		// & shouldn't appear anywhere else, but who knows what the future may hold!
		return encodeURIComponent(thing.replace(/\\/g,'\\\\').replace(/&/g,'\\+').replace(/=/g,'\\e'));
	}
	function decode(thing) { // TODO: I'm not researching this at 6am lol. Do we *need* the URIComponent stuff?
		return decodeURIComponent(thing.replace(/\\e/g,'=').replace(/\\\+/g,'&').replace(/\\\\/g,'\\'));
	}
})();