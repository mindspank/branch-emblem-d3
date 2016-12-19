var d3 = require('d3');

function branchtree() {

    var seed;
    var branches = [];
    var depth = 5;
    var minLineWeight = 1;
    var animateDuration = 600;
    var linelength = 8;
    var w, h;

    var align = 'middle';
    var alignSettings = {
        middle: function() { return (h / 3) * 2.2; },
        bottom: function() { return h; }
    };

    var da = 0.6; // Angle delta
    var dl = 0.82; // Length delta (factor)
    var ar = 0.3; // Randomness

    function branch(b) {
        var end = endPt(b), daR, newB;
        branches.push(b);

        if (b.d === depth) return;

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

    // Endpoint
    function endPt(b) {
        var x = b.x + b.l * Math.sin(b.a);
        var y = b.y - b.l * Math.cos(b.a);
        return {
            x: x,
            y: y
        };
    };

    // Accessors
    function x1(d) { return d.x; };
    function y1(d) { return d.y; };
    function x2(d) { return endPt(d).x; };
    function y2(d) { return endPt(d).y; };

    var tree = function(selection) {
        selection.each(function(d) {

            if( this.nodeName === 'g' ) {
                w = this.parentNode.getBBox().width;
                h = this.parentNode.getBBox().height;
            } else {
                w = this.getBBox().width;
                h = this.getBBox().height;
            };
                        
            seed = {
                i: 0,
                x: w / 2,
                y: alignSettings[align](),
                a: 0,
                l: align === 'middle' ? h / 9 : (h / 100 ) * linelength,
                d: 0
            };

            branches = [];
            branch(seed);
            console.log(d3.select(this))
            var lines = d3.select(this).selectAll('.branchline')
                .data(branches, function(d) { return d.i; });

            lines.enter()
                .append('line')
                .attr('class', 'branchline')
                .style('stroke-width', function(d) {
                    return parseInt(depth + minLineWeight - d.d) + 'px';
                })
                .style('stroke', 'rgb(14, 14, 14)')
                .attr('id', function(d) {
                    return 'id' + d.i;
                });

            lines.transition()
                .ease("linear")
                .duration(animateDuration)
                .attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2);

        });
    };

    /**
     * Configuration methods
     */
    tree.minLineWeight = function(_) {
        if (!arguments) return minLineWeight;
        minLineWeight = _;
        return tree;
    };
    tree.angle = function(_) {
        if (!arguments) return da;
        da = _;
        return tree;
    };
    tree.lengthdelta = function(_) {
        if (!arguments) return dl;
        dl = _;
        return tree;
    };
    tree.randomness = function(_) {
        if (!arguments) return ar;
        ar = _;
        return tree;
    };
    tree.animateDuration = function(_) {
        if (!arguments) return animateDuration;
        animateDuration = _;
        return tree;
    };
    tree.depth = function(_) {
        if (!arguments) return depth;
        depth = _;
        return tree;
    };
    tree.align = function(_) {
        if (!arguments) return align;
        align = _;
        return tree;
    };
    tree.linelength = function(_) {
        if (!arguments) return linelength;
        linelength = _;
        return tree;
    };
    
    return tree;

};

module.exports = branchtree;