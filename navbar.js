(function () {
    if (typeof window.Psmith === 'undefined') window.Psmith = {}; 

    var Navbar = window.Psmith.Navbar = function () {
        this.detail = document.getElementById('detail');
        this.detail_pre = document.getElementById('detail-pre');

        this.detail_pre.onclick = this.toggle.bind(this);

        Psmith.bus.subscribe('detail_results', this.yeet.bind(this));
    }

    Navbar.prototype.show = function () {
        this.detail.className = '';
        this.detail_pre.innerText = 'v';
    }
    Navbar.prototype.hide = function () {
        this.detail.className = 'hidden';
        this.detail_pre.innerText = '^';
    }

    Navbar.prototype.is_shown = function () {
        return this.detail.className === '';
    }
    Navbar.prototype.is_hidden = function () {
        return this.detail.className === 'hidden';
    }

    Navbar.prototype.toggle = function () {
        if (this.is_shown()) {
            this.hide();
        } else if (this.is_hidden()) {
            this.show();
        }
    }

    Navbar.prototype.yeet = function (stuff) {
        this.detail.innerHTML = stuff.res.consonants.to_html();
        this.show();
    }
})();