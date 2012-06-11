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
		clone,
		i = 0,
		x,
		y,
		new_y;

	fn = fn || function(){};

	for (y = bounds.y / bounds.height; y <= max_y; y++) {

		new_y = y * bounds.height;

		for (x = bounds.x / bounds.width; x <= max_x; x++) {

			clone = item.clone();
			clone.position = new this.Point(x * bounds.width, new_y);
			fn(clone, i);
			i++;

		}

	}

	item.visible = false;

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

	return paper;

};

module.exports = function(options) {

	return init(options);

};