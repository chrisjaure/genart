# genart

Generative art for the rest of us. This is an attempt to create a nice api for creating generative art. Built on top of a modified [Paper.js](https://github.com/paperjs/paper.js).

## Getting Started
Install the module with: `npm install genart`

Generate some art!

```
genart -i ../examples/circle.js -o ~/genart.png
```

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

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

## License
Copyright (c) 2012 Chris Jaure  
Licensed under the MIT license.
