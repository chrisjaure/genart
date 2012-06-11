/*
 * genart
 * https://github.com/chrisjaure/genart
 *
 * Copyright (c) 2012 Chris Jaure
 * Licensed under the MIT license.
 */

var
	u = require('underscore'),
	Canvas = require('canvas'),
	fs = require('fs'),
	paper = require('paper'),
	DEFAULTS = {
		width: 500,
		height: 500,
		backgroundColor: '#F0ACAC'
	};

var Genart = {};

Genart.setBackgroundColor = function (color) {

	if (!this._genart.background) {
		this._genart.background = new this.Path.Rectangle(this.view.bounds);
	}

	this._genart.background.fillColor = color;

};

Genart.tile = function (item, fn) {

	var
		bounds = item.bounds,
		max_x = Math.ceil(this.view.size.width / bounds.width) + 1,
		max_y = Math.ceil(this.view.size.height / bounds.height) + 1,
		Point = this.Point,
		clone,
		i = 0,
		x,
		y,
		new_y,
		n,
		ncb_source = compileNthChildCallbacks(item.ncb);

	fn = fn || function(){};

	for (y = bounds.y / bounds.height; y <= max_y; y++) {

		new_y = y * bounds.height;

		for (x = bounds.x / bounds.width; x <= max_x; x++) {

			clone = item.clone();
			clone.position = new Point(x * bounds.width, new_y);
			ncb_source.forEach(function(obj) {
				if (obj.test(i)) {
					obj.cbs.forEach(function(cb) {
						cb.call(clone);
					});
				}
			});
			fn.call(clone, i, {col: x, row: y});
			i++;

		}

	}

	item.visible = false;

	return this;
};

Genart.stream = function () {

	this.view.draw();
	return this._genart.canvas.createPNGStream();

};

Genart.buffer = function () {

	this.view.draw();
	return this._genart.canvas.toBuffer();

};

function init (options) {

	options = u.defaults(options || {}, DEFAULTS);

	paper._genart = {
		options: options,
		canvas: options.canvas || new Canvas(options.width, options.height),
	};

	paper._genart.ctx = paper._genart.canvas.getContext('2d');

	paper = u.extend(paper, Genart);

	paper.setup(paper._genart.canvas);

	paper.setBackgroundColor(options.backgroundColor);

	paper.Item.prototype.tile = function(fn) {
		paper.tile(this, fn);
	};
	paper.Item.prototype.nthChild = function(n, fn) {

		if (!this.ncb) {
			this.ncb = {};
		}

		if (!this.ncb[n]) {
			this.ncb[n] = [];
		}

		this.ncb[n].push(fn);
		return this;

	};

	return paper;

};

function compileNthChildCallbacks(ncb) {

	var source = [],
		test,
		b,
		a;

	for (n in ncb) {

		b = n.match(/(-?\d+)$/);
		if (b) {
			b = new Number(b[1])
		}
		else {
			b = 0;
		}

		a = n.match(/(-?\d*)n/);
		if (a) {
			a = new Number(a[1]);
		}
		else {
			a = 0;
		}


		(function(a, b) {
			if (b < 1 && a > 1) {
				test = function(n) {
					return ( n - b ) % a == 0;
				};
			}
			else if (a > 1) {
				test = function(n) {
					return n >= b && ( n - b ) % a == 0;
				};
			}
			else if (a < -1) {
				test = function(n) {
					return n <= b && ( n - b) % a == 0;	
				};
			}
			else if (a === 0) {
				test = function(n) {
					return n == b;
				};
			}
			else if (a == -1) {
				test = function(n) {
					return n <= b;
				};
			}
			else {
				test = function(n) {
					return n >= b;
				};
			}
		})(a, b);

		source.push({
			test: test,
			cbs: ncb[n]
		});
	}

	return source;

}

module.exports = function(options) {

	return init(options);

};