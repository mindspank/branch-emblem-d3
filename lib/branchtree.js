var d3 = require('d3');

function branchtree() {

    var element, w, h, seed;
    var branches = [];
    var depth = 5;
    var minLineWeight = 1;

    var da = 0.6; // Angle delta
    var dl = 0.8; // Length delta (factor)
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

    function tree(selection) {
        selection.each(function(d) {
            element = d3.select(this);
            w = parseInt(element.style('width'), 10); 
            h = parseInt(element.style('height'), 10);
            seed = {
                i: 0,
                x: w / 2,
                y: (h / 3) * 2,
                a: 0,
                l: h / 11,
                d: 0
            };            
            
            branches = [];
            branch(seed);

            element.selectAll('line')
                .data(branches)
                .enter()
                .append('line')
                .attr('class', 'branchline')
                .style('stroke-width', function(d) {
                    return parseInt(depth + minLineWeight - d.d) + 'px';
                })
                .style('stroke', '#fff')
                .attr('id', function(d) {
                    return 'id-' + d.i;
                })
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
        if(!arguments) return minLineWeight;
        minLineWeight = _;
        return tree;
    };
    
    tree.randomness = function(_) {
        if(!arguments) return ar;
        ar = _;
        return tree;
    };
    
    tree.depth = function(_) {
        if(!arguments) return depth;
        depth = _;
        return tree;
    };

    return tree;
    
};

module.exports = branchtree;