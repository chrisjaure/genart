var color = new canvas.RgbColor(1, 0, 0.5);

var triangle = new canvas.Path.RegularPolygon(new canvas.Point(0,0), 6, 50);
triangle.opacity = 0.15;
triangle.style = {
	strokeColor: '#fff',
	strokeWidth: 1
};
triangle.rotate(90);

var triangle2 = triangle.clone();
// triangle2.fillColor = '#C1E6F0';
// triangle2.opacity = 0.75;
// triangle2.blendMode = 'screen';
// triangle2.translate(new canvas.Point(-50,0));
// triangle2.scale(0.5);

var triangle3 = triangle.clone();
triangle3.opacity = 0.1;
triangle3.fillColor = 'red';
triangle3.scale(0.5);

var triangle4 = triangle3.clone();
triangle4.rotate(90);
triangle4.fillColor = 'orange';
triangle4.scale(0.8);
triangle4.opacity = 0.2;

var group = new canvas.Group(triangle4, triangle3);

canvas.tile(group, function(item, i){
	if (i % 2) {
		item.rotate(90);
	}
});

canvas.tile(triangle, function(item, i) {
	var c = color.clone();
	c.green = Math.random();
	item.style.fillColor = c;
	item.scale(0.8);

	if (i % 2) {
		item.rotate(90);
	}
});

canvas.tile(triangle2, function(item, i) {
	item.scale(0.8);
	if (i % 2 === 0) {
		item.rotate(90);
	}
});

var texture = new canvas.Raster('/home/chris/Downloads/scribble_light.png');
texture.blendMode = 'multiply';
texture.opacity = 0.8;
canvas.tile(texture);

canvas.setBackgroundColor('orange');