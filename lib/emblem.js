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
  };
  
  /**
   * Tree config
   */
  em.treeRandomness = function(_) {
      if (!arguments) return branchtree.randomness();
      branchtree.randomness(_)
      return em;
  };
  
  /**
   * Inner circle config
   */
  em.innerWidth = function(_) {
      if (!arguments) return innercircle.width();
      innercircle.width(_)
      return em;      
  };
  em.innerRadiusModifer = function(_) {
      if (!arguments) return innercircle.radiusModifer();
      innercircle.radiusModifer(_)
      return em;      
  };  
  em.innerSetStyles = function(_) {
      if (!arguments) return innercircle.setStyles();
      innercircle.setStyles(_)
      return em;      
  };
  em.innerHeight = function(_) {
      if (!arguments) return innercircle.height();
      innercircle.height(_)
      return em;      
  };  

  /**
   * Base circle config
   */
  em.baseWidth = function(_) {
      if (!arguments) return basecircle.width();
      innercircle.width(_)
      return em;      
  };
  em.baseRadiusModifer = function(_) {
      if (!arguments) return basecircle.radiusModifer();
      innercircle.radiusModifer(_)
      return em;      
  };  
  em.baseSetStyles = function(_) {
      if (!arguments) return basecircle.setStyles();
      innercircle.setStyles(_)
      return em;      
  };
  em.baseHeight = function(_) {
      if (!arguments) return basecircle.height();
      innercircle.height(_)
      return em;      
  };  
    
  return em;
    
};

module.exports = Emblem;