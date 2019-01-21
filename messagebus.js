(function () {
	if (typeof window.Psmith === undefined) window.Psmith = {};

	function MessageBus(events) {
		this.subscriptions = {};
		this.states = {};
		events.forEach(e => {this.subscriptions[e] = new Set();});
	}

	MessageBus.prototype.subscribe = function(event, callback) {
		this.subscriptions[event].add(callback);
	}

	MessageBus.prototype.remove = function(event, callback) {
		this.subscriptions[event].remove(callback);
	}

	MessageBus.prototype.publish = function(event, details) {
		this.subscriptions[event].forEach(f => f(details));
		this.states[event] = details;
	}

	window.Psmith.bus = new MessageBus([
		'search'          // defines 'term'
	,	'search_results'  // defines 'res'
	,	'search_error'    // defines 'error'
	,	'detail'          // defines 'term'
	,	'detail_results'  // defines 'language_info, segments'
	,   'detail_error'    // defines 'error'
	]);
})();