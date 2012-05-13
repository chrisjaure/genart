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
	color = require('color'),
	DEFAULTS = {
		width: 500,
		height: 500
	};

function Genart (options) {

	this.init(options);

}

Genart.prototype.init = function (options) {

	options = options || {}
	this.options = u.defaults(options, DEFAULTS);
	this.canvas = options.canvas || new Canvas(this.options.width, this.options.height);
	this.ctx = this.canvas.getContext('2d');

	var centerX = this.canvas.width / 2;
	var centerY = this.canvas.height / 2;
	var radius = 70;

	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = "#8ED6FF";
	ctx.fill();
	ctx.lineWidth = 5;
	ctx.strokeStyle = "black";
	ctx.stroke();

};

Genart.prototype.fill = function (style) {

	this.ctx.fillStyle = style;
	this.ctx.fill();
	
};

Genart.prototype.stream = function () {

	return this.canvas.createPNGStream();

};

Genart.prototype.buffer = function () {

	return this.canvas.toBuffer();

};


module.exports = function(options) {

	return new Genart(options);

};