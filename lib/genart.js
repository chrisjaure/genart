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
	color = require('color'),
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

Genart.repeat = function (path, fn) {

	var i = 0;

	while(fn(path.clone(), i)) {
		i++;
	}

};

Genart.stream = function () {

	this.view.draw();
	return this._genart.canvas.createPNGStream();

};

Genart.buffer = function () {

	this.view.draw();
	return this._genart.canvas.toBuffer();

};

Genart.tile = function (item, fn) {

	var
		dimensions = item.bounds,
		max_x = this.view.size.width / dimensions.width + 1,
		max_y = this.view.size.height / dimensions.height + 1,
		clone,
		i = 0,
		x,
		y;

	fn = fn || function(){};

	for (y = 0; y <= max_y; y++) {

		for (x = 0; x <= max_x; x++) {

			clone = item.clone();
			clone.position = new this.Point(x * dimensions.width, y * dimensions.height);
			fn(clone, i);
			i++;

		}

	}

	item.remove();

};

function init (paper, options) {

	options = u.defaults(options || {}, DEFAULTS);

	paper._genart = {
		options: options,
		canvas: options.canvas || new Canvas(options.width, options.height),
	};

	paper._genart.ctx = paper._genart.canvas.getContext('2d');

	paper = u.extend(paper, Genart);

	paper.setup(paper._genart.canvas);

	paper.setBackgroundColor(options.backgroundColor);

};

module.exports = function(paper, options) {

	init(paper, options);

	return paper;

};