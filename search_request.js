(function () {
Psmith.bus.subscribe('search', function (msg) {
	try {
		var results = Psmith.psherlock.search(Psmith.psentence.parse(msg.term));
		if (results[0] === undefined) {
			Psmith.bus.publish('search_error', {'error': 'No results'});
		} else {
			Psmith.bus.publish('search_results', {'res': results});
		}
	} catch (e) {
		Psmith.bus.publish('search_error', {'error': e})
	}
})
})();