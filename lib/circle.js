var d3 = require('d3');

function circle(w, h, r, styles) {

    var width = w || 400;
    var height = h || 400;
    var r = r || 2;
    var styles = styles || {};

    function c(selection) {
        selection.each(function(d) {
            d3.select(this).append('circle')
                .attr('cx', function() { return width / 2 })
                .attr('cy', function() { return height / 2 })
                .attr('r', function() { return width / r })
                .style(styles);
        })
    };
    
    c.setStyle = function(_) {
      if (!arguments) return styles;
      
      Object.keys(_).forEach(function(d) {
          styles[d] = _[d]
      });
      
      return c;  
    };
    c.width = function(_) {
        if (!arguments) return width;
        width = _;
        return c;
    };
    c.height = function(_) {
        if (!arguments) return height;
        height = _;
        return c;
    };
    c.radiusModifer = function(_) {
        if (!arguments) return r;
        r = _;
        return c;
    };
    
    return c

};

module.exports = circle;