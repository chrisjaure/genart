var texture = new canvas.Raster('/home/chris/Downloads/bgnoise_lg.png');
texture.blendMode = 'multiply';
texture.opacity = 0.5;
canvas.tile(texture);

/*
new Raster({
	file: '/home/chris/Downloads/bgnoise_lg.png',
	blendMode: 'multiply',
	opacity: 0.5;
}).tile();
*/

var circle = new canvas.Path.Circle(new canvas.Point(0, 0), 50);
circle.style = {
	fillColor: 'red',
	strokeColor: 'green',
	strokeWidth: 2
};
circle.opacity = 0.2;
circle.blendMode = 'overlay';

canvas.tile(circle, function(item, i) {

	if (i % 14 === 0) {
		item.style.fillColor = 'yellow';
	}

	if (i % 6 === 0 || i % 5 === 0) {
		item.remove();
	}

});

/*
var circle = new Circle({
	point: [0,0],
	radius: 50,
	fillColor: 'red',
	strokeColor: 'green',
	strokeWidth: 2,
	opacity: 0.2,
	blendMode: 'overlay'
}).tile()
	.nthChild(14, function() {
		this.fillColor = 'yellow';
	})
	.nthChild(6, function() {
		this.remove();
	});
*/

var circle2 = circle.clone();
circle2.scale(0.5);
circle2.style.fillColor = 'blue';

canvas.tile(circle2, function(item, i) {

	if (i % 15 === 0) {
		item.style.fillColor = 'yellow';
	}

	if (i % 6 === 0) {
		item.scale(0.5);
	}

});

/*
circle.clone({
	scale: 0.5,
	fillColor: 'blue'
}).tile()
	.nthChild(15, function() {
		this.fillColor = 'yellow';
	})
	.nthChild(6, function() {
		this.scale(0.5);
	});
*/

var circle3 = circle.clone();
circle3.scale(3);
circle3.style.fillColor = 'orange';

canvas.tile(circle3, function(item, i) {

	item.opacity = Math.min(Math.random(), 0.3);

});

/*
circle.clone({
	scale: 0.3,
	fillColor: 'orange'
}).tile(function() {
	this.opacity = Math.min(Math.random(), 0.3);
});
*/

canvas.setBackgroundColor('pink');