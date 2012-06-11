var texture = new canvas.Raster('/home/chris/Downloads/bgnoise_lg.png');
texture.blendMode = 'multiply';
texture.opacity = 0.5;
texture.tile();
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
/*
var circle = new Circle({
	point: [0,0],
	radius: 50,
	fillColor: 'red',
	strokeColor: 'green',
	strokeWidth: 2,
	opacity: 0.2,
	blendMode: 'overlay'
})
*/

var circle2 = circle.clone();
circle2.scale(0.5);
circle2.style.fillColor = 'blue';

circle2.tile(function(item, i) {

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

circle3.tile(function(item, i) {

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

circle.tile(function(item, i) {

	if (i % 14 === 0) {
		item.style.fillColor = 'yellow';
	}

	if (i % 6 === 0 || i % 5 === 0) {
		item.remove();
	}

});
/*
circle.tile()
	.nthChild(14, function() {
		this.fillColor = 'yellow';
	})
	.nthChild(6, function() {
		this.remove();
	});
*/

canvas.setBackgroundColor('pink');