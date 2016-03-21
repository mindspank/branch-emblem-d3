var d3 = require('d3');
var branchtree = require('./branchtree')();
var Circle = require('./circle');
var textarc = require('./arc')();

function Emblem(element, data) {
  if(!arguments) return new Error('Needs a DOM node')
  
  var svg, g;
  
  var element = d3.select(element);
  var data = data;

  var margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };
  
  var width = parseInt(element.style('width'), 10) - margin.left - margin.right;
  var height = parseInt(element.style('height'), 10) - margin.top - margin.bottom;
  
  /**
   * The base circle
   */
  var basecircle = new Circle(width, height, 2, {
      stroke: '#464646',
      'stroke-width': '5px',
      fill: '#fff'
  });
  /**
   * Inner circle
   */
  var innercircle = new Circle(width, height, 4, {
      fill: '#464646'
  });
    
  function em() {
  
    var svg = element.html('').append("svg")
        .attr('width', width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
      
    g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    g.datum(data)
        .call(basecircle)
        .call(innercircle)
        .call(branchtree)
        .call(textarc);
      
  };
  
  em.redraw = function() {
      return em();
  };
  
  em.setText = function(_) {
    data = _;
    return em;
  };
  
  em.arcPadding = function(_) {
      if (!arguments) return textarc.padding();
      textarc.padding(_)
      return em;
  }
  
  return em;
    
};

module.exports = Emblem;