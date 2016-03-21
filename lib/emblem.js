var d3 = require('d3');
var branchtree = require('./branchtree');
var Circle = require('./circle');

function emblem() {
    
    var base = 400, angle, pie;
    
    var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };

    var width = base - margin.left - margin.right;
    var height = base - margin.top - margin.bottom;
    
    /**
     * The base circle
     */
    var basecircle = new Circle(width, height, 2, {
        'stroke': '#464646',
        'stroke-width': '5px',
        'fill': '#fff'
    });
    /**
     * Inner Circle / Background for tree
     */
    var innercircle = new Circle(width, height, 2, {
        'fill': '#464646'
    });
    
    function chart(selection) {
        selection.each(function(d) {
            
            
            
        })
    };
    
    return chart;
    
}


module.exports = emblem;