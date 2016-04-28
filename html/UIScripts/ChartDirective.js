app.directive( 'crD3Bars', [
  function () {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function (scope, element) {
    	  
        var margin = {top: 20, right: 20, bottom: 30, left: 60},
          width = 960 - margin.left - margin.right,
          height = 360 - margin.top - margin.bottom;
        
        var svg = d3.select(element[0])
          .append("svg")
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .style("display","block")
          .style("margin","auto")
          .attr('height', height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
        var y = d3.scale.linear().range([height, 0])

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5);
        //Render graph based on 'data'
        scope.render = function(data) {
          //Set our scale's domains
          x.domain(data.map(function(d) { return d.ProjectNo; }));
          y.domain([Math.ceil(d3.min(data, function(d) { return d.Rating; }) -0.9 ), d3.max(data, function(d) { return d.Rating; })]);
          
          //Redraw the axes
          svg.selectAll('g.axis').remove();
          //X axis
          svg.append("g")
              .attr("class", "barChartXAxis axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);
              
          //Y axis
          svg.append("g")
              .attr("class", "barChartYAxis axis")
              .call(yAxis)
            .append("text")
              .attr("transform","translate(-40," + height / 3 + ") rotate(-90) ")
//              .attr("y", 6)
//              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Global Rating");
              
          var color = d3.scale.ordinal().range(["#c6dbef", "#9ecae1", "#6baed6"]);
          
          var bars = svg.selectAll(".bar").data(data);
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
              .attr("y", function(d) { return y(d.Rating); })
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