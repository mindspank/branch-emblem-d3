var d3 = require('d3');

var inputw = 500, inputh = 500;
var arcscale = d3.scale.linear().domain([0, 100]).range([0, 2 * Math.PI]);

var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

var width = inputw - margin.left - margin.right;
var height = inputh - margin.top - margin.bottom;

var outerRadius = (width / 2) - 15;
var outerRingWidth = 80;

var svg = d3.select("#logo").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var toparc = d3.svg.arc()
    .innerRadius(outerRadius - outerRingWidth)
    .outerRadius(outerRadius)
    .startAngle(arcscale(75))
    .endAngle(arcscale(125));
    
var bottomarc = d3.svg.arc()
    .innerRadius(outerRadius - outerRingWidth)
    .outerRadius(outerRadius)
    .startAngle(arcscale(75))
    .endAngle(arcscale(25));


svg.append('circle')
.attr('class', 'base')
.attr('cx', function() {
    return width / 2;
})
.attr('cy', function() {
    return height / 2;
})
.attr('r', function() {
    return width / 2;
});

svg.append('circle') 
.attr('class', 'innercircle')
.attr('cx', function() {
    return width / 2;
})
.attr('cy', function() {
    return height / 2;
})
.attr('r', function() {
    return (width / 4);
});

/**
 * Top Arc
 */
svg.append("path")
.attr("id", "toparc")
.attr("d", toparc)
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
svg.append("text")
.attr("x", 8)
.attr("dy", 28)
.append("textPath")
.attr("class", "textpath")
.attr("xlink:href", "#toparc")
.text("Hello, curved textPath!");

/**
 * Bottom Arc
 */
svg.append("path")
.attr("id", "toparc")
.attr("d", toparc)
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
svg.append("text")
.attr("x", 8)
.attr("dy", 28)
.append("textPath")
.attr("class", "textpath")
.attr("xlink:href", "#toparc")
.text("Hello, curved textPath!");    