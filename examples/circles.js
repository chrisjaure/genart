var texture = new canvas.Raster('/home/chris/Downloads/bgnoise_lg.png');
texture.blendMode = 'multiply';
texture.opacity = 0.5;
canvas.tile(texture);

var circle = new canvas.Path.Circle(new canvas.Point(0, 0), 50);
circle.style = {
	fillColor: 'red',
	strokeColor: 'green',
	strokeWidth: 2
};
circle.opacity = 0.2;
circle.blendMode = 'overlay';

var circle2 = circle.clone();
circle2.scale(0.5);
circle2.style.fillColor = 'blue';

var circle3 = circle.clone();
circle3.scale(3);
circle3.style.fillColor = 'orange';

canvas.tile(circle2, function(item, i) {

	if (i % 15 === 0) {
		item.style.fillColor = 'yellow';
	}

	if (i % 6 === 0) {
		item.scale(0.5);
	}

});

canvas.tile(circle3, function(item, i) {

	item.opacity = Math.min(Math.random(), 0.3);

});

canvas.tile(circle, function(item, i) {

	if (i % 14 === 0) {
		item.style.fillColor = 'yellow';
	}

	if (i % 6 === 0 || i % 5 === 0) {
		item.remove();
	}

});

canvas.setBackgroundColor('pink');