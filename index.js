var parser  = require('postcss-value-parser');
var postcss = require('postcss');

module.exports = postcss.plugin('postcss-color-rgba-fallback', function (opts) {
	var method = opts && /^(clone|warn)$/i.test(opts.method) ? opts.method.toLowerCase() : 'replace';
	var props  = opts && 'properties' in opts ? opts.properties : ['background', 'background-color', 'color', 'border', 'border-bottom', 'border-bottom-color', 'border-color', 'border-left', 'border-left-color', 'border-right', 'border-right-color', 'border-top', 'border-top-color', 'outline', 'outline-color'];
	var filter = opts && opts.filter;

	return function (css, result) {
		css.walkRules(function (rule) {
			var decls = {};

			rule.nodes.forEach(function (decl) {
				if (decl.prop in decls) decls[decl.prop] = false;
				else decls[decl.prop] = (!props || ~props.indexOf(decl.prop)) && /\brgba\b/i.test(decl.value) ? decl : false;
			});

			Object.keys(decls).forEach(function (name) {
				var decl = decls[name];

				if (!decl) return;

				var value = parser(decl.value).walk(function (node) {
					if (node.type === 'function' && node.value === 'rgba') {
						if (method === 'warn') return result.warn('rgba() detected', { node: decl });

						var rgba = [node.nodes[0], node.nodes[2], node.nodes[4], node.nodes[6]].map(function (word, index) {
							return (0 + Math.round(word.value * (index === 3 ? 255 : 1)).toString(16)).slice(-2);
						});

						var argb = rgba.slice(-1).concat(rgba.slice(0, -1)).join('');

						node.value = filter && /^background/i.test(decl.prop) ?
						'progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=\'#' + argb + '\',endColorstr=\'#' + argb + '\')' :
						'#' + rgba.slice(0, 3).join('');

						node.type  = 'word';
					}
				}).toString();

				if (method !== 'warn' && value !== decl.value) {
					if (method === 'clone') decl = decl.cloneBefore({ value: value });
					else decl.value = value;

					if (filter && /^background/.test(decl.prop)) decl.prop = 'filter';
				}
			});
		});
	};
});
