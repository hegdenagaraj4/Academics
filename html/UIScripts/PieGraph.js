app.directive('tpPieTrend', [ function() {
	return {
		restrict : 'E',
		scope : {
			data : '='
		},
		link : function(scope, element) {

		var dataset = [
						{ Rating: '4', Count: 0 },
						{ Rating: '3', Count: 0 },
						{ Rating: '2', Count: 0 },
						{ Rating: '1', Count: 0 },
						{ Rating: '0', Count: 0 },
		               ];
		
		var margin = {
				top : 10,
				right : 10,
				bottom : 10,
				left : 30
				}, width = 600 - margin.left - margin.right, height = 260
					- margin.top - margin.bottom;
		
         var radius = Math.min(width, height) / 2;
         var donutWidth = 75;
         var legendRectSize = 28;                                  
         var legendSpacing = 14;                                    
         
         var color = ['rgb(153,220,38)','rgb(76,162,222)','rgb(251,224,35)','rgb(247,146,33)','rgb(253,53,30)'];
         
         var imagelocations = ['UIScripts/images/emoticonsRating0.png',
			                      'UIScripts/images/emoticonsRating1.png',
	                               'UIScripts/images/emoticonsRating2.png',
	                               'UIScripts/images/emoticonsRating3.png',
	                               'UIScripts/images/emoticonsRating4.png'
	                               ];
         var svg = d3.select(element[0])
         	.append('svg') 
           .attr('width', width + margin.left + margin.right)
           .attr('height', height + margin.top + margin.bottom)
           .append('g')
           .attr('transform', 'translate(' + ((width) / 2) + 
             ',' + ((height + margin.top + margin.bottom) / 2) + ')');
         
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
         .attr('fill', function(d, i) { 
		           return color[i];
		         })
         .each(function(d) { this._current = d; }); // store the initial angles
         
         var legend = svg.selectAll('.legend')                     // NEW
         .data(dataset)                                   // NEW
         .enter()                                                // NEW
         .append('g')                                            // NEW
         .attr('class', 'legend')
         .attr('transform', function(d, i) {                     // NEW
		             var height = legendRectSize + legendSpacing;          // NEW
		             var offset =  height * color.length / 2;     // NEW
		             var horz = -2 * legendRectSize;                       // NEW
		             var vert = i * height - offset;                       // NEW
		             return 'translate(' + -width/2.1 + ',' + vert + ')';        // NEW
		           }); 
       
         
         
       legend.append('rect')                                     // NEW
         .attr('width', legendRectSize)                          // NEW
         .attr('height', legendRectSize);                         // NEW
         
         
       legend.append('image')                                     // NEW
         .attr('x', legendRectSize + legendSpacing)              // NEW
         .attr('y', 35 - legendRectSize - legendSpacing)
   		 .attr("width", 40)
   		 .attr("height", 40);
       
			scope.render = function(data){
								
				path.data(pie(data));
		         
				path.transition()
					.duration(3000)
					.attrTween("d",arcTween);
				
				function arcTween(a) {
				  var i = d3.interpolate(this._current, a);
				  this._current = i(0);
				  return function(t) {
				    return arc(i(t));
				  };
				}
				
		         legend.data(data);
		         
		         legend.select('rect')                                     // NEW
		           .style('fill', function (d,i) { return color[i]})                                   // NEW
		           .style('stroke', function(d,i){return color[i]});                                // NEW
		           
		         legend.select('image')                                     // NEW
//		           .text(function(d) { return d.Rating; });                       // NEW
		         .attr("xlink:href", function (d,i){return imagelocations[parseInt(d.Rating)]});

			};
			scope.$watch('data', function() {
				scope.render(scope.data);
			}, true);
		}
	};
} ]);