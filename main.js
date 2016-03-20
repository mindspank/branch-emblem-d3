var d3 = require('d3');
var tree = require('./lib/branchtree')

var inputw = 400, inputh = 400;

var margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

var width = inputw - margin.left - margin.right;
var height = inputh - margin.top - margin.bottom;


var data = ['Innovate', 'Collaborate', 'Evangelize'];

var svg = d3.select("#logo").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var computetext = svg.append('text').style('fill', 'none').text('Test');

var outerRadius = (width / 2) - (computetext.node().getBBox().height / 4);
var outerRingWidth = width / 6;

var arc = d3.svg.arc()
    .innerRadius(outerRadius - outerRingWidth)
    .outerRadius(outerRadius)

var angle = (180 / data.length) * -1
var pie = d3.layout.pie()
    .startAngle(angle * Math.PI / 180)
    .endAngle(angle * Math.PI / 180 + 2 * Math.PI)
    .value(function(d) { return d.length < 3 ? 1 : data.length; })
    //.padAngle(.02)
    .sort(null);

/**
 * The base circle
 */
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
    })
    .style({
        stroke: '#464646',
        'stroke-width': '5px',
        fill: '#fff'
    })

/**
 * Inner Circle / Background for tree
 */
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
        
var g = svg.append('g').attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
var path = g.selectAll(".donutArcs")
    .data(pie(data))
    .enter().append("path")
    .attr('id', function(d, i) { return 'arc' + i })
    .attr("class", "donutArcs")
    .attr("d", arc)
    .each(function(d, i) {
        var firstArcSection = /(^.+?)L/;
        var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
        newArc = newArc.replace(/,/g, " ");

        if (d.endAngle > 90 * Math.PI / 180) {
            var startLoc = /M(.*?)A/,
                middleLoc = /A(.*?)0 0 1/,
                endLoc = /0 0 1 (.*?)$/;
            var newStart = endLoc.exec(newArc)[1];
            var newEnd = startLoc.exec(newArc)[1];
            var middleSec = middleLoc.exec(newArc)[1];

            newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
        };

        svg.append("path")
            .attr("class", "hiddenDonutArcs")
            .attr("id", "donutArc" + i)
            .attr("d", newArc)
            .style("fill", "none");
    });

g.selectAll(".donutText")
    .data(pie(data))
    .enter().append("text")
    .attr("class", "donutText")
    .attr("dy", function(d, i) {
        var offset = 10;
        var textoffset = (computetext.node().getBBox().height / 4);
        var arcoffset = (outerRingWidth / 2); 
        return (d.endAngle > 90 * Math.PI / 180) ? (arcoffset * -1) + textoffset : arcoffset + textoffset; 
    })
    .append("textPath")
    .attr("startOffset", "50%")
    .style("text-anchor", "middle")
    .attr("xlink:href", function(d, i) { return "#donutArc" + i; })
    .text(function(d) { return d.data; });


tree();