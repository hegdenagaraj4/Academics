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
    	var x = d3.time.scale().range([0, width]);
    	var y = d3.scale.linear().range([height, 0]);

    	// Define the axes
//    	tickFormat(d3.time.format("%H"));
    	var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format("%M:%S")).ticks(5);

    	var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);    
       

        //Render graph based on 'data'
        scope.render = function(data) {
        
        	// Scale the range of the data
//        	x.domain([new Date("2016-04-27 15:09:04"),new Date("2016-04-27 15:20:04")])
        	

    	    x.domain([d3.min(data, function(d) { return d.Time;}),
    	    		 (d3.max(data,function (d){return d.Time}).getTime() + 2*60*100)]);
    	    
    	    y.domain([0,5]);    	    
    	    
            //Redraw the axes
          svg.selectAll('g.axis').remove();
              
          //X axis
           svg.append("g")
               .attr("class", "x axis")
               .style({ 'stroke': 'Black', 'fill': 'Black', 'stroke-width': '0px'})
               .attr("transform", "translate(0," + height + ")")
               .call(xAxis);
           //Y axis

           svg.append("g")
               .attr("class", "y axis")
               .call(yAxis);
           
           var line = d3.svg.line()
           .x(function(d) { return x(d.Time); })
           .y(function(d) { return y(d.Rating); });
           
           
        // Add the valueline path.
     	    svg.append("path")
     	        .attr("class", "line")
     	        .attr("d", line(data))
     	        .attr("stroke", "blue")
     	      	.attr("stroke-width", 2)
     	      	.attr("fill", "none");

          
              
//          var color = d3.scale.ordinal().range(["#c6dbef", "#9ecae1", "#6baed6"]);
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