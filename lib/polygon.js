var d3 = require('d3');

var n = 10;
var radius = 200;
var width = 500;
var height = 500;
var j = 2;

function createPointsPoly(n, radius, width, height) {
    var base = 2 * Math.PI / n;
    poly = new Array();
    
    for(i = 0; i < n; i++) {
        fi_i = base * i + Math.PI / 2;
        x_i = radius * Math.cos(fi_i) + width /2;
        y_i = radius * Math.sin(fi_i) + height /2;
        poly.push({"x":x_i, "y":y_i});
    }
    return poly;
}

var polyN = new Array();
for(i=3; i<=n; i++) polyN.push(i);

d3.select('html')
.append('svg')
.attr("width", width)
.attr("height", height)
.append('polygon')
.attr("points",function(d) {
    // Init with a triangle
    poly = createPointsPoly(3, radius, width, height);
    return poly.map(function(d) { return [d.x,d.y].join(","); }).join(" ");})
.attr("stroke","red")
.attr("fill","#069")
.attr("stroke-width",5); 

// Draw polygon
d3.select('svg')
.data(polyN)
.on("mousedown", function() {
    if(j > n) j = 3;
    else j++;
    d3.selectAll("polygon").remove();
    console.log(j);
    poly = createPointsPoly(j, radius, width, height);
    d3.selectAll("svg").selectAll("polygon")
    .data([poly])
    .enter()
    .append('polygon')
    .attr("points",function(d) { 
        return d.map(function(d) { return [d.x,d.y].join(","); }).join(" ");})
    .attr("stroke","red")
    .attr("fill","#069")
    .attr("stroke-width",5); 
});