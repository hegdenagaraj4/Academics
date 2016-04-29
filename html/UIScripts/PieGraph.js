app.directive('tpPieTrend', [ function() {
	return {
		restrict : 'E',
		scope : {
			data : '='
		},
		link : function(scope, element) {

			var dataset = [
			               { Rating: '5', Count: 10 }, 
			               { Rating: '4', Count: 20 },
			               { Rating: '3', Count: 30 },
			               { Rating: '2', Count: 40 },
			               { Rating: '1', Count: 50 }
			             ];
         var width = 600;
         var height = 270;
         var radius = Math.min(width, height) / 2;
         var donutWidth = 75;
         var legendRectSize = 18;                                  // NEW
         var legendSpacing = 4;                                    // NEW
         var color = d3.scale.category20b();
         
         var svg = d3.select(element[0])
         	.append('svg')
           .attr('width', width)
           .attr('height', height)
           .append('g')
           .attr('transform', 'translate(' + (width / 2) + 
             ',' + (height / 2) + ')');
         
         var arc = d3.svg.arc()
           .innerRadius(radius - donutWidth)
           .outerRadius(radius);
         
         
         var pie = d3.layout.pie()
           .value(function(d) { return d.Count; })
           .sort(null);
         
         var path = svg.selectAll('path')
           .data(pie(dataset))
           .enter()
           .append('path')
           .attr('d', arc)
           .attr('fill', function(d, i) { 
             return color(d.data.Rating);
           });
         
         var legend = svg.selectAll('.legend')                     // NEW
           .data(color.domain())                                   // NEW
           .enter()                                                // NEW
           .append('g')                                            // NEW
           .attr('class', 'legend')                                // NEW
           .attr('transform', function(d, i) {                     // NEW
             var height = legendRectSize + legendSpacing;          // NEW
             var offset =  height * color.domain().length / 2;     // NEW
             var horz = -2 * legendRectSize;                       // NEW
             var vert = i * height - offset;                       // NEW
             return 'translate(' + width/4 + ',' + vert + ')';        // NEW
           });                                                     // NEW
         
         
         legend.append('rect')                                     // NEW
           .attr('width', legendRectSize)                          // NEW
           .attr('height', legendRectSize)                         // NEW
           .style('fill', color)                                   // NEW
           .style('stroke', color);                                // NEW
           
         legend.append('text')                                     // NEW
           .attr('x', legendRectSize + legendSpacing)              // NEW
           .attr('y', legendRectSize - legendSpacing)              // NEW
           .text(function(d) { return d; });                       // NEW

			/*var margin = {
				top : 30,
				right : 20,
				bottom : 30,
				left : 50
			}, width = 600 - margin.left - margin.right, height = 270
					- margin.top - margin.bottom;

			// Adds the svg canvas
			var svg = d3.select(element[0]).append("svg").attr("width",
					width + margin.left + margin.right).attr("height",
					height + margin.top + margin.bottom).append("g").attr(
					"transform",
					"translate(" + margin.left + "," + margin.top + ")");

			// Set the ranges
			var x = d3.time.scale().range([ 0, width ]);
			var y = d3.scale.linear().range([ height, 0 ]);

			// Define the axes
			// tickFormat(d3.time.format("%H"));
			var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(
					d3.time.format("%M:%S")).ticks(5);
			var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

			y.domain([ 0, 5 ]);

			// Y axis
			svg.append("g").attr("class", "trendlineYAxis axis").call(yAxis);

			svg.select(".trendlineYAxis").append("text")
				.attr("transform","translate(-30," + height / 4 + ") rotate(-90) ")
//				.attr("y", 6).attr("dy",".71em")
				.style("text-anchor", "end").text("Count Trend");
			
			// X axis
			// #763626
			svg.append("g").attr("class", "trendlineXAxis axis").attr(
					"transform", "translate(0," + height + ")").call(xAxis);

			svg.select(".trendlineXAxis").append("text").attr("transform",
					"translate(" + width / 2 + ",0)").attr("y", 6).attr("dy",
					".71em").style("text-anchor", "end").text("Time");

			var line = d3.svg.line().x(function(d) {
				return x(d.Time);
			}).y(function(d) {
				return y(d.Count);
			}).interpolate("linear");

			// Add the valueline path.
			svg.append("path").attr("class", "trendline")

			x.domain([new Date(),new Date().getTime() + 2* 60*100]);
			
			scope.render = function(data) {

				// x.domain([new Date("2016-04-27 15:09:04"),new
				// Date("2016-04-27 15:20:04")])
				if(data.length > 0){
					x.domain([ d3.min(data, function(d) {
						return d.Time;
					}), (d3.max(data, function(d) {
						return d.Time
					}).getTime() + 2 * 60 * 100) ]);	
				}
				

				svg.select(".trendlineXAxis axis").call(xAxis);

				svg.select(".trendline").attr("d", line(data));
			};

			// Watch 'data' and run scope.render(newVal) whenever it changes
			// Use true for 'objectEquality' property so comparisons are done on
			// equality and not reference
			scope.$watch('data', function() {
				scope.render(scope.data);
			}, true);*/
		}
	};
} ]);