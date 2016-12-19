var d3 = require('d3');
var pointpair = require('./lib/pointspolygon');
var branchtree = require('./lib/branchtree');
var Emblem = require('./lib/emblem');

var emblem = Emblem('#logo', ['Nicey','Test']);

emblem
.arcPadding(0)
.treeRandomness(0)
.innerRadiusModifer(0);

emblem();