app.directive( 'tpLineTrend', [
  function () {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function (scope, element) {

    	  var margin = {top: 30, right: 20, bottom: 30, left: 50},
    	    width = 600 - margin.left - margin.right,
    	    height = 270 - margin.top - margin.bottom;

    	// Adds the svg canvas
      	var svg = d3.select(element[0])
      	    .append("svg")
      	        .attr("width", width + margin.left + margin.right)
      	        .attr("height", height + margin.top + margin.bottom)
      	    .append("g")
      	        .attr("transform","translate(" + margin.left + "," + margin.top + ")");
      	
    	// Set the ranges
    	var x = d3.scale.linear().range([0, width]);
    	var y = d3.scale.linear().range([height, 0]);

    	// Define the axes
    	var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);

    	var yAxis = d3.svg.axis().scale(y)
    	    .orient("left").ticks(5);    

    	    // Scale the range of the data
    	    /*x.domain(d3.extent(data, function(d) { return d.date; }));
    	    y.domain([0, d3.max(data, function(d) { return d.close; })]);*/

        //Render graph based on 'data'
        scope.render = function(data) {
        	
        	
          //Set our scale's domains
//          x.domain(data.map(function(d) { return d.ProjectNo; }));
          y.domain([Math.ceil(d3.min(data, function(d) { return d.Rating; }) -0.9 ), d3.max(data, function(d) { return d.Rating; })]);
          x.domain([Math.ceil(d3.min(data, function(d) { return d.Rating; }) -0.9 ), d3.max(data, function(d) { return d.Rating; })]);
       // Define the line
          var valueline = d3.svg.line()
      		.x(function(d) { return x(d.Rating); })
      	    .y(function(d) { return y(d.Rating); });
        
          //Redraw the axes
          svg.selectAll('g.axis').remove();
       // Add the valueline path.
  	    svg.append("path")
  	        .attr("class", "line")
  	        .attr("d", valueline(data))
  	        .attr("stroke", "blue")
  	      	.attr("stroke-width", 2)
  	      	.attr("fill", "none");

  	    // Add the X Axis
  	    /*svg.append("g")
  	        .attr("class", "x axis")
  	        .attr("transform", "translate(0," + height + ")")
  	        .call(xAxis);*/

  	    // Add the Y Axis
  	    svg.append("g")
  	        .attr("class", "y axis")
  	        .call(yAxis);
          
          //X axis
           svg.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + height + ")")
               .call(xAxis);
              
          //Y axis
          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Rating");
              
          var color = d3.scale.ordinal().range(["#c6dbef", "#9ecae1", "#6baed6"]);
          
          /*var bars = svg.selectAll(".bar").data(data);
          bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.ProjectNo); })
            .attr("width", x.rangeBand())
            .style("fill", function(d, i) { return color(i%3); });

          //Animate bars
          bars
              .transition()
              .duration(1000)
              .attr('height', function(d) { return height - y(d.Rating); })
              .attr("y", function(d) { return y(d.Rating); })*/
        };

         //Watch 'data' and run scope.render(newVal) whenever it changes
         //Use true for 'objectEquality' property so comparisons are done on equality and not reference
          scope.$watch('data', function(){
               scope.render(scope.data);
          }, true);  
         }
    };
  }
]);