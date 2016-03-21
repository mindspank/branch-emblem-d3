var d3 = require('d3');
var Emblem = require('./lib/emblem');


var emblem = Emblem('#logo', ['Nick', 'Brian', 'Alex']);

emblem
.arcPadding(0.1)
.treeRandomness(0)
.innerRadiusModifer(3);

emblem();