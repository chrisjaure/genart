var color = new canvas.RgbColor(1, 0, 0.5);

var hexagon = new canvas.Path.RegularPolygon([0,0], 6, 50)
	.set({
		opacity: 0.15,
		strokeColor: '#fff',
		strokeWidth: 1,
		rotate: 90
	});

var hexagon2 = hexagon.clone();

var hexagon3 = hexagon.clone()
	.set({
		opacity: 0.1,
		fillColor: 'red',
		scale: 0.5
	});

var hexagon4 = hexagon3.clone()
	.set({
		rotate: 90,
		fillColor: 'orange',
		scale: 0.8,
		opacity: 0.2
	});

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

var texture = new canvas.Raster('/home/chris/Downloads/scribble_light.png')
	.set({
		blendMode: 'multiply',
		opacity: 0.3
		
	})
	.tile();

canvas.setBackgroundColor('orange');