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
		Psmith.bus.publish('search_error', {'error': e});
	}
})

Psmith.bus.subscribe('detail', function (msg) {
	try {
		var segments = Psmith.psegmentizer.psegmentize(Psmith.psherlock.get_inventory(msg.term));
		var language_info = Psmith.psherlock.get_language_info(msg.term);
		window.Psmith.bus.publish('detail_results', {language_info: language_info, segments: segments});
	} catch (e) {
		Psmith.bus.publish('detail_error', {'error': e});
	}
});
})();