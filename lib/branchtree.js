var d3 = require('d3');

var w = 230, h = 230;

// Tree configuration
var branches = [];
var maxDepth = 5;

var seed = {
    i: 0,
    x: w / 2,
    y: h,
    a: 0,
    l: h / 5,
    d: 0
}; // a = angle, l = length, d = depth
var da = 0.6; // Angle delta
var dl = 0.8; // Length delta (factor)
var ar = 0.3; // Randomness
var svg;

function branch(b) {
    var end = endPt(b),
        daR, newB;
    branches.push(b);

    if (b.d === maxDepth)
        return;

    // Left branch
    daR = ar * Math.random() - ar * 0.5;
    newB = {
        i: branches.length,
        x: end.x,
        y: end.y,
        a: b.a - da + daR,
        l: b.l * dl,
        d: b.d + 1,
        parent: b.i
    };
    branch(newB);

    // Right branch
    daR = ar * Math.random() - ar * 0.5;
    newB = {
        i: branches.length,
        x: end.x,
        y: end.y,
        a: b.a + da + daR,
        l: b.l * dl,
        d: b.d + 1,
        parent: b.i
    };
    branch(newB);
};

function endPt(b) {
    // Return endpoint of branch
    var x = b.x + b.l * Math.sin(b.a);
    var y = b.y - b.l * Math.cos(b.a);
    return {
        x: x,
        y: y
    };
};

function x1(d) {
    return d.x;
}

function y1(d) {
    return d.y;
}

function x2(d) {
    return endPt(d).x;
}

function y2(d) {
    return endPt(d).y;
}

function create() {
    setTimeout(function() {
        svg = d3.select('.innergroup');

        branches = [];
        branch(seed);

        svg.selectAll('line')
            .data(branches)
            .enter()
            .append('line')
            .attr('class', 'branchline')
            .style('stroke-width', function(d) {
                return parseInt(maxDepth + 2 - d.d) + 'px';
            })
            .attr('id', function(d) {
                return 'id-' + d.i;
            })
            .transition()
            .duration(500)
            .delay(function(d, i) {
                return i * 10;
            })
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2);

        //setTimeout(update, 2000);

    }, 400)
};

var timeoutid;
var update = function() {

    branches = [];
    branch(seed);

    svg.selectAll('line')
        .data(branches)
        .transition()
        .duration(2500)
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)

    timeoutid = setTimeout(update, 4000)

};

var kill = function() {
    clearTimeout(timeoutid);
};

module.exports = create;