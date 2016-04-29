app.directive('tpPieTrend', [ function() {
	return {
		restrict : 'E',
		scope : {
			data : '='
		},
		link : function(scope, element) {

			
			var salesData=[
			           	{label:"Basic", color:"#3366CC",value:20},
			           	{label:"Plus", color:"#DC3912",value:20},
			           	{label:"Lite", color:"#FF9900",value:20},
			           	{label:"Elite", color:"#109618",value:20},
			           	{label:"Delux", color:"#990099",value:20}
			           ];

			           var svg = d3.select(element[0]).append("svg").attr("width",600).attr("height",300);

			           svg.append("g").attr("id","salesDonut");

			           Donut3D.draw("salesDonut", salesData, 150, 150, 130, 100, 30, 0.4);
			           	
			           function changeData(){
			           	Donut3D.transition("salesDonut", randomData(), 130, 100, 30, 0.4);
			           }

			           function randomData(){
			           	return salesData.map(function(d){ 
			           		return {label:d.label, value:1000*Math.random(), color:d.color};});
			           }
			           
			/*var dataset = [
			               { Rating: '5', Count: 20 }, 
			               { Rating: '4', Count: 20 },
			               { Rating: '3', Count: 20 },
			               { Rating: '2', Count: 40 },
			               { Rating: '1', Count: 2 }
			             ];*/
         /*var width = 600;
         var height = 270;
         var radius = Math.min(width, height) / 2;
         var donutWidth = 75;
         var legendRectSize = 18;                                  // NEW
         var legendSpacing = 4;                                    // NEW
//         var color = d3.scale.category20b();
         var color = ['red','blue','yellow','black','green'];
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
         
         
			scope.render = function(data){
				
				var path = svg.selectAll('path')
		           .data(pie(data))
		           .enter()
		           .append('path')
		           .attr('d', arc)
		           .attr('fill', function(d, i) { 
		             return color[i];
		           });
		         
		         var legend = svg.selectAll('.legend')                     // NEW
		           .data(data)                                   // NEW
		           .enter()                                                // NEW
		           .append('g')                                            // NEW
		           .attr('class', 'legend')                                // NEW
		           .attr('transform', function(d, i) {                     // NEW
		             var height = legendRectSize + legendSpacing;          // NEW
		             var offset =  height * color.length / 2;     // NEW
		             var horz = -2 * legendRectSize;                       // NEW
		             var vert = i * height - offset;                       // NEW
		             return 'translate(' + width/4 + ',' + vert + ')';        // NEW
		           });                                                     // NEW
		         
		         
		         legend.append('rect')                                     // NEW
		           .attr('width', legendRectSize)                          // NEW
		           .attr('height', legendRectSize)                         // NEW
		           .style('fill', function (d,i) { return color[i]})                                   // NEW
		           .style('stroke', function(d,i){return color[i]});                                // NEW
		           
		         legend.append('text')                                     // NEW
		           .attr('x', legendRectSize + legendSpacing)              // NEW
		           .attr('y', legendRectSize - legendSpacing)              // NEW
		           .text(function(d) { return d.Rating; });                       // NEW

			};
			scope.$watch('data', function() {
				scope.render(scope.data);
			}, true);*/
		}
	};
} ]);