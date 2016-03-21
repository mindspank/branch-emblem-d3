var d3 = require('d3');

function textarc() {

    var outerRadius,
        outerRingWidth,
        arc,
        g,
        text,
        path,
        pie,
        angle,
        width,
        height,
        element,
        padding = 0.05,
        style = {};

    function a(selection) {
        selection.each(function(data) {

            element = d3.select(this);

            width = this.getBBox().width;
            height = this.getBBox().height;
            
            var computetext = element.append('text').style('fill', 'none').text('Test');
            var outerRadius = (width / 2) - (computetext.node().getBBox().height / 4);
            var outerRingWidth = width / 6;

            arc = d3.svg.arc()
                .innerRadius(outerRadius - outerRingWidth)
                .outerRadius(outerRadius);
            
            angle = (180 / data.length) * -1;
            pie = d3.layout.pie()
                .startAngle(angle * Math.PI / 180)
                .endAngle(angle * Math.PI / 180 + 2 * Math.PI)
                .value(function(d) { return d.length < 3 ? 1 : data.length; })
                .padAngle(padding)
                .sort(null);
            
            if(data.length < 2) {
                pie.startAngle(-180 * (Math.PI/180)).endAngle( -180 * (Math.PI/180) + 2*Math.PI )
            };
            
            
            g = element.append('g').attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            path = g.selectAll(".donutArcs").data(pie(data));
            
            path.enter()
                .append("path")
                .attr('id', function(d, i) { return 'arc' + i })
                .attr("class", "donutArcs")
                .attr("d", arc)
                .style({
                    fill: '#464646',
                    'stroke-fill': '#464646'
                });
                
            path.each(function(d, i) {
                if (data.length > 1) {
                    var firstArcSection = /(^.+?)L/;
                    var newArc = firstArcSection.exec(d3.select(this).attr("d"))[1];
                    newArc = newArc.replace(/,/g, " ");
                } else {
                    var newArc = d3.select(this).attr("d");
                };

                if (d.endAngle > 90 * Math.PI / 180 && data.length > 1) {
                    var startLoc = /M(.*?)A/,
                        middleLoc = /A(.*?)0 0 1/,
                        endLoc = /0 0 1 (.*?)$/;
                    var newStart = endLoc.exec(newArc)[1];
                    var newEnd = startLoc.exec(newArc)[1];
                    var middleSec = middleLoc.exec(newArc)[1];

                    newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
                };

                g.append("path")
                    .attr("class", "hiddenDonutArcs")
                    .attr("id", "donutArc" + i)
                    .attr("d", newArc)
                    .style("fill", "none");
            });         

            text = g.selectAll(".donutText")
                .data(pie(data))
                .enter().append("text")
                .attr("class", "donutText")
                .attr("dy", function(d, i) {
                    var offset = 10;
                    var textoffset = (computetext.node().getBBox().height / 4);
                    var arcoffset = (outerRingWidth / 2); 
                    return (d.endAngle > 90 * Math.PI / 180 && data.length > 1) ? (arcoffset * -1) + textoffset : arcoffset + textoffset; 
                })
                .style({
                    fill: '#fff'
                })
                .append("textPath")
                .attr("startOffset", function() { return data.length < 2 ? "550" : '50%'})
                .style("text-anchor", "middle")
                .attr("xlink:href", function(d, i) { return "#donutArc" + i; })
                .text(function(d) { return d.data; });            

        })
    }
    
    a.setText = function(_) {
                
        return a;
    }

    a.padding = function(_) {
        if (!arguments) return padding;
        padding = _;
        return a;
    };

    return a;

}

module.exports = textarc;