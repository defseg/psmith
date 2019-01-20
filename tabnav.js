(function () {
    if (typeof window.Psmith === 'undefined') window.Psmith = {}; 

    var Tabnav = window.Psmith.Tabnav = function () {
        this.container_el = document.getElementById('tabnav');
        this.nav_el = document.getElementById('navs');

        // The tabs are stored as a map of elements, {name: element}.
        this.tabs = new Map([['Help', document.getElementById('help')]]);
        this.curr_tab = 'Help';

        // Init the navs.
        var help_nav = this.nav_el.children[0]; 
        this.navs = new Map([['Help', help_nav]]);
        for (let nav_kv of this.navs) {
            this.bind_nav_event(nav_kv[1]);
        }

        Psmith.bus.subscribe('detail_results', function (msg) {
            this.yeet('Detail', msg.res.consonants.to_html())
        }.bind(this));
    }

    Tabnav.prototype.yeet = function (name, contents) {
        this.add(name);
        this.set(name, contents);
        this.show(name);
    }

    // TODO: Most of this stuff should be private, I think.

    Tabnav.prototype.add = function (name) {
        // Add a div to the tabnav if it doesn't exist.
        if (this.tabs.has(name)) return;

        var new_el = document.createElement('div');
        new_el.className = 'hidden';

        this.container_el.appendChild(new_el);
        this.tabs.set(name, new_el);

        this.add_nav(name, new_el);
    }

    Tabnav.prototype.set = function (name, contents) {
        // Set the contents of a tab.
        this.tabs.get(name).innerHTML = contents;
    }

    Tabnav.prototype.show = function (name) {
        // Show a tab.
        this.tabs.get(this.curr_tab).className = 'hidden';
        this.tabs.get(name).className = '';

        this.navs.get(this.curr_tab).className = 'nav-link';
        this.navs.get(name).className = 'nav-link active';
        this.curr_tab = name;
    }

    Tabnav.prototype.add_nav = function (name) {
        if (this.navs.has(name)) return;

        var new_el = document.createElement('a');
        new_el.className = 'nav-link';
        new_el.innerText = name;

        // Set tabindex so Bootstrap styles it like a link. TODO maybe style this better.
        new_el.setAttribute('tabindex', '0');
        new_el.setAttribute('data-nav', name);
        this.bind_nav_event(new_el);

        this.nav_el.appendChild(new_el);
        this.navs.set(name, new_el);
    }

    Tabnav.prototype.bind_nav_event = function (nav_el) {
        nav_el.onclick = function (e) {
            var name = e.target.getAttribute('data-nav');
            this.show(name);
        }.bind(this);
    }
})();