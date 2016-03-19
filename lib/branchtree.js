var d3 = require('d3');

function branchtree() {
    
    var width = 300, height = 300;
    
    function tree(selection) {
        selection.each(function(d, i) {
            
        })
    };
    
    tree.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return tree;
    };
    
    tree.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return tree;
    };    
    
    return tree;
    
}