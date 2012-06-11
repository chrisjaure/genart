var color = new canvas.RgbColor(1, 0, 0.5);

var hexagon = new canvas.Path.RegularPolygon(new canvas.Point(0,0), 6, 50);
hexagon.opacity = 0.15;
hexagon.style = {
	strokeColor: '#fff',
	strokeWidth: 1
};
hexagon.rotate(90);

var hexagon2 = hexagon.clone();


var hexagon3 = hexagon.clone();
hexagon3.opacity = 0.1;
hexagon3.fillColor = 'red';
hexagon3.scale(0.5);

var hexagon4 = hexagon3.clone();
hexagon4.rotate(90);
hexagon4.fillColor = 'orange';
hexagon4.scale(0.8);
hexagon4.opacity = 0.2;

var group = new canvas.Group(hexagon4, hexagon3);

group
	.nthChild('2n', function() {
		this.rotate(90);
	})
	.tile(function() {
		this.scale(0.9);
	});

hexagon
	.nthChild('2n', function() {
		this.rotate(90);
	})
	.tile(function(i) {
		var c = color.clone();
		c.green = Math.random();
		this.style.fillColor = c;
		this.scale(0.8);
	});

hexagon2
	.nthChild('2n+1', function() {
		this.rotate(90);
	})
	.tile(function(i) {
		this.scale(0.8);
	});

var texture = new canvas.Raster('/home/chris/Downloads/scribble_light.png');
texture.blendMode = 'multiply';
texture.opacity = 0.3;
texture.tile();

canvas.setBackgroundColor('orange');