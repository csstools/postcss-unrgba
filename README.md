# UnRGBA [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[UnRGBA] changes `rgba()` values to hex. This can be useful for outputting CSS for older browsers like Internet Explorer 8.

```css
/* before */

.hero {
	background: rgba(153, 221, 153, .8);
	border: solid 1px rgba(100, 102, 103, .8);
	border-right-color: rgba(100, 102, 103, 0);
}

/* after */

.hero {
	background: #99dd99;
	border: solid 1px #646667;
	border-right-color: transparent;
}
```

## Usage

Add [UnRGBA] to your build tool:

```bash
npm install postcss-unrgba --save-dev
```

#### Node

```js
require('postcss-unrgba')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [UnRGBA] as a PostCSS plugin:

```js
postcss([
    require('postcss-unrgba')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [UnRGBA] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('postcss-unrgba')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [UnRGBA] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-unrgba')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

## Options

#### `method`

Type: `String`  
Default: `'replace'`

##### `clone`
Copies any properties with `rgba` values to new properties using hex.
```css
/* before */

.hero {
	background: rgba(153, 221, 153, .8);
}

/* after */

.hero {
	background: #99dd99;
	background: rgba(153, 221, 153, .8);
}
```

##### `replace`
Copies any properties with `rgba` values to new properties using hex while removing the original.
```css
/* before */

.hero {
	background: rgba(153, 221, 153, .8);
}

/* after */

.hero {
	background: #99dd99;
}
```

##### `warn`
Warns whenever a property with an `rgba` value is found.

#### `filter`

Type: `Boolean`  
Default: `false`

##### `true`
Uses the Internet Explorer proprietary filter to preserve alpha-transparent backgrounds.
```css
/* before */

.hero {
	background: rgba(153, 221, 153, .8);
}

/* after */

.hero {
	filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#8099dd99',endColorstr='#8099dd99');
}
```

##### `false`
Uses regular hexadecimal values when processing backgrounds.
```css
/* before */

.hero {
	background: rgba(153, 221, 153, .8);
}

/* after */

.hero {
	background: #99dd99;
}
```

#### `properties`

Type: `Array`  
Default: `['background', 'background-color', 'color', 'border', 'border-bottom', 'border-bottom-color', 'border-color', 'border-left', 'border-left-color', 'border-right', 'border-right-color', 'border-top', 'border-top-color', 'outline', 'outline-color']`

Specifies the properties on which rgba values will be processed. If a falsey value is passed then all properties will be processed.

[ci]: https://travis-ci.org/jonathantneal/postcss-unrgba
[ci-img]: https://travis-ci.org/jonathantneal/postcss-unrgba.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[UnRGBA]: https://github.com/jonathantneal/postcss-unrgba
