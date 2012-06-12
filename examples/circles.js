new canvas.Raster('/home/chris/Downloads/bgnoise_lg.png')
	.set({
		blendMode: 'multiply',
		opacity: 0.5
	})
	.tile();

var circle = new canvas.Path.Circle([0, 0], 50)
	.set({
		fillColor: 'red',
		strokeColor: 'green',
		strokeWidth: 2,
		opacity: 0.2,
		blendMode: 'overlay'
	});

circle.clone()
	.set({
		scale: 0.5,
		fillColor: 'blue'
	})
	.nthChild('15n', function() {
		this.fillColor = 'yellow';
	})
	.nthChild('6n', function() {
		this.scale(0.5);
	})
	.tile();


circle.clone()
	.set({
		scale: 3,
		fillColor: 'orange'
	})
	.tile(function(i) {
		this.opacity = Math.min(Math.random(), 0.3);
	});

circle
	.nthChild('14n', function() {
		this.fillColor = 'yellow';
	})
	.nthChild('6n', function() {
		this.remove();
	})
	.tile();

canvas.setBackgroundColor('pink');