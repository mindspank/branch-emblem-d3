/*
var svg = d3.select('#chart')
    .selectAll('svg')
    .data([null])
    .enter()
    .append('svg')
    .attr('width', 400 + 'px')
    .attr('height', 400 + 'px')


 svg.append('polygon')
    .attr('points', function(d) {
        return pointpair(6, 200, 400, 400).map(function(d) {
            return [d.x,d.y].join(",");
        }).join(" ");
    })
    .attr("stroke", 'RGB(14,14,14)')
    .attr('fill', outer)
    .attr("fill-opacity","1")
    .attr("stroke-width", 3);
   
svg.selectAll('.dots2')
    .data(pointpair(6, 200, 400, 400))
    .enter()
    .append('circle')
    .attr('cx', function(d) {
        return d.x;
    })
    .attr('cy', function(d) {
        return d.y
    })
    .attr('r', cr)
    .style('fill-opacity', 0)
    .style('fill', colorString)
    
svg.selectAll('.dots4')
    .data(pointpair(6, 120, 400, 400))
    .enter()
    .append('circle')
    .attr('cx', function(d) {
        return d.x;
    })
    .attr('cy', function(d) {
        return d.y
    })
    .attr('r', cr)
    .style('fill-opacity', 0)
    .style('fill', colorString)    
    
svg.append('g')
    //.style('transform', 'skew(5deg, -5deg)')
    .selectAll('.dots1')
    .data(pointpair(6, 100, 400, 400))
    .enter()
    .append('circle')
    .attr('cx', function(d) {
        return d.x;
    })
    .attr('cy', function(d) {
        return d.y
    })
    .attr('r', cr)
    .style('fill', colorString)

svg.append('g')
    //.style('transform', 'skew(5deg, -5deg)')
    .selectAll('.dots3')
    .data(pointpair(5, 170, 400, 400))
    .enter()
    .append('circle')
    .attr('cx', function(d) {
        return d.x;
    })
    .attr('cy', function(d) {
        return d.y
    })
    .attr('r', cr)
    .style('fill', colorString);
    
*/

var dots = d3.shuffle(svg.selectAll('circle')[0]);
console.log(dots)
/*   
svg.selectAll('circle').each(function(d, i) {
    var next = d3.select(dots[i+1]).data()[0];
    
    if(next) {       
        svg.append('line')
            .attr('x1', d.x)
            .attr('x2', next.x)
            .attr('y1', d.y)
            .attr('y2', next.y)
            .style('fill', colorString)
            .style('stroke', colorString) 
            .style('stroke-width', 2)           
    }
});
*/
svg.append('polygon')
//.style('transform', 'skew(5deg, -5deg)')
.attr('points', function(d) {
    return pointpair(6, 200, 400, 400).map(function(d) {
        return [d.x,d.y].join(",");
    }).join(" ");
})
.attr("stroke", inner)
.attr('fill', inner)
.attr("fill-opacity", 0)
.attr("stroke-width", 0); 

var sq = 200
var g = svg.append('g')
    .attr('transform', 'translate(50, 50)');
/*
var rect = svg.append('rect')
    .attr('x', sq - sq / 2)
    .attr('y', sq - sq / 2)
    .attr('width', sq)
    .attr('height', sq)
    .style('stroke', '#ccc')
    .style('stroke-width', 3)
    .style('fill', '#c7c7c7')
    .style('fill-opacity', 0)
*/
var tree = branchtree();
tree.minLineWeight(5).randomness(0).linelength(15).align('bottom')
console.log(tree)

//svg.call(tree);

svg.append('text')
    .attr('y', 200)
    .attr('x', 70)
    .style({
        "font-size": '53px',
        "font-family": 'Arial',
        "letter-spacing": '-3px',
        "font-weight": 'bolder'
    })
    .text('DEVELOPER')

svg.append('text')
    .attr('y', 240)
    .attr('x', 95)
    .style({
        "font-size": '53px',
        "font-family": 'Arial',
        "letter-spacing": '-3px',
        "font-weight": 'bolder'
    })
    .text('RELATIONS')
    
svg.append('line')
    .attr('x1', 150)
    .attr('x2', 360)
    .attr('y1', 260)
    .attr('y2', 260)
    .style('stroke', 'rgb(14,14,14)')
    .style('stroke-width', 3)
*/