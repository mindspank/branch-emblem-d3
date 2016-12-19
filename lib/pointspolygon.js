function createPointsPoly(n, radius, width, height) {
    var base = 2 * Math.PI / n;
    var pointpairs = [];
    
    for(i = 0; i < n; i++) {
        fi_i = base * i + Math.PI / 2;
        x_i = radius * Math.cos(fi_i) + width / 2;
        y_i = radius * Math.sin(fi_i) + height / 2;
        pointpairs.push({"x":x_i, "y":y_i});
    };
    
    return pointpairs;
};

module.exports = createPointsPoly;