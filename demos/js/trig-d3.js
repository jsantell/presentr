//
// Trig
// www.humblesoftware.com

var DEMOS = DEMOS || {};
DEMOS.trig = DEMOS.trig || {};

(function () {

  var
    ID_TRIG = '#trig',
    X1      = 'x1',
    X2      = 'x2',
    Y1      = 'y1',
    Y2      = 'y2';

  var
    data    = [],
    width   = 760,
    height  = 260,
    xmin    = -1.2,
    xmax    = 5,
    ymin    = -height * (xmax - xmin) / width / 2,
    ymax    = -ymin,
    xScale  = d3.scale.linear(),
    yScale  = d3.scale.linear(),
    vis     = d3.select(ID_TRIG).append('svg:svg'),
    decor   = vis.append('svg:g'),
    graph   = vis.append('svg:g'),
    path    = graph.append('svg:path'),
    b       = graph.append('svg:line'),
    c       = graph.append('svg:line'),
    circle  = graph.append('svg:circle'),
    dot     = graph.append('svg:circle'),
    label   = graph.append('svg:text'),
    sine    = d3.svg.line(),
    time    = 0,
    play    = false,
    i;

  for (i = 0; i < 84; i++) {
    data.push(i * 10 / 84);
  }

  xScale
    .domain([xmin, xmax])
    .range([0, width]);

  yScale
    .domain([ymin, ymax])
    .range([0, height]);

  vis
    .attr('class', 'trig')
    .attr('width', width)
    .attr('height', height);
   
  sine
    .x(function (d, i) { return xScale(d); })
    .y(function (d, i) { return yScale(Math.sin(d - time)); });

  // X-Axis
  decor.append('svg:line')
    .attr('class', 'axis')
    .attr(X1, xScale(xmin))
    .attr(Y1, yScale(0))
    .attr(X2, xScale(xmax))
    .attr(Y2, yScale(0));

  decor.append('svg:line')
    .attr('class', 'axis')
    .attr(X1, xScale(Math.PI))
    .attr(Y1, yScale(0))
    .attr(X2, xScale(Math.PI))
    .attr(Y2, yScale(0) + 8);

  decor.append("svg:text")
    .text(String.fromCharCode(960))
    .attr("x", Math.round(xScale(Math.PI)))
    .attr("y", (yScale(0)) + 24)
    .attr("text-anchor", "middle");

  // Y-Axis
  decor.append('svg:line')
    .attr('class', 'axis')
    .attr(X1, xScale(0))
    .attr(Y1, yScale(ymin))
    .attr(X2, xScale(0))
    .attr(Y2, yScale(ymax));

  // Time
  label
    .attr("x", 2)
    .attr("y", 24);

  // Circle
  circle
    .attr('cx', xScale(0))
    .attr('cy', yScale(0))
    .attr('r', xScale(1) - xScale(0));

  // Dot
  dot
    .attr('cx', xScale(0))
    .attr('r', 4)
    .style('fill', '#fff');

  // Triangle
  c
    .attr(X1, xScale(0))
    .attr(Y1, yScale(0));

  function draw() {

    var
      x = xScale(Math.cos(time)),
      y = yScale(-Math.sin(time));

    path
      .attr('d', sine(data));

    label
      .text('t = '+ Math.floor(time / Math.PI));

    c
      .attr(X2, x)
      .attr(Y2, y);

    b
      .attr(X1, xScale(0))
      .attr(Y1, y)
      .attr(X2, x)
      .attr(Y2, y);

    dot
      .attr('cy', y);

    time += .05;

    if (play) setTimeout(draw, 35);
  }

  DEMOS.trig.start = function() {
    play = true;
    draw();
  }

  DEMOS.trig.stop = function() {
    play = false;
  }

})();

