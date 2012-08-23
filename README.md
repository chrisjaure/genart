[![build status](https://secure.travis-ci.org/chrisjaure/genart.png)](http://travis-ci.org/chrisjaure/genart)
# genart
Generative art for the rest of us. This is an attempt to create a nice api for creating generative art. Built on top of a modified [Paper.js](https://github.com/paperjs/paper.js) to run on node.js.

## Getting Started
Install the module with: `npm install -g genart`

Generate some art!

```
genart -i path/to/examples/circles.js -o ~/genart.png
```

Running that will produce a png similar to the following:
![circles.js result](http://cleverchris.com/genart.png)

## Documentation
Since genart is simply extending paper.js, take a look at the [paper.js docs](http://paperjs.org/reference/) for more details.

_More docs coming soon._

## Examples
The extensions can be seen in this example:
```javascript
var circle = new canvas.Path.Circle([0, 0], 50)
	.set({
		fillColor: 'red',
		strokeColor: 'green',
		strokeWidth: 2,
		opacity: 0.2,
		blendMode: 'overlay'
	})
	.nthChild('15n', function() {
		this.fillColor = 'yellow';
	})
	.nthChild('6n', function() {
		this.scale(0.5);
	})
	.tile();
```

## License
Copyright (c) 2012 Chris Jaure  
Licensed under the MIT license.
