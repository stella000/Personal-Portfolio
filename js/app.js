var myApp = angular.module('myApp', ['ui.router'])

// Config route provider
.config(function($stateProvider) {
    $stateProvider
    .state('home', {
    url:'/',
    templateUrl: 'pages/home.html',
    controller: 'HomeController',
  })
  .state('work', {
    url:'/work',
    templateUrl: 'pages/work.html',
    controller: 'WorkController',
  })
  .state('resume', {
    url:'/resume',
    templateUrl: 'pages/resume.html',
    controller: 'ResumeController',
  })
})

// Landing page controller: define $scope.number as a number
.controller('HomeController', function($scope){
  $scope.number = 20
})

.controller('WorkController', function($scope){
  $scope.number = 20
})

// Content controller: define $scope.url as an image
.controller('ResumeController', function($scope){
})

$(function() {
 // SVG to work with.  The vis <div> is defined in HTML
	var svg = d3.select('#vis')
		.append('svg')
		.attr('height', 400)
		.attr('width', 400)

	// Margin: how much space to put in the SVG for axes/titles
	var margin = {
		left:70, 
		bottom:100, 
		top:50, 
		right:50,
	}

	// Height/width of the chart itself
	var height = 400 - margin.bottom - margin.top 
	var width = 400 - margin.left - margin.right

	// 'g' element in which to place the circles
	var g = svg.append('g')
			.attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
			.attr('height', height)
			.attr('width', width)

	// Write a function to set your scales
	var setScales = function() {
		// xScale
		var xMax =d3.max(data, function(d){return d.le_1960})*1.05
		var xMin =d3.min(data, function(d){return d.le_1960})*.95
		xScale  = d3.scale.linear().range([0, width]).domain([xMin, xMax])

		// yScale
		var yMin =d3.min(data, function(d){return d.le_2013})*.9
		var yMax =d3.max(data, function(d){return d.le_2013})*1.05		
		yScale = d3.scale.linear().range([height, 0]).domain([yMin, yMax])
	}

	/* Write a function to define the positioning of your circles
		- cx attribute as the 1960 life expectancy
		- cy attribute as the 2013 life expectancy
		- title attribute as the country of the object
	*/

	var circleFunc = function(circle) {
		circle.attr('r', 10)
			.attr('fill', 'blue')
			.attr('cx', function(d) { return xScale(d.le_1960)})
			.attr('cy', function(d) { return yScale(d.le_2013)})
			.attr('title', function(d) {return d.country})
			.style('opacity', .3)
	}

	// Write a reusable drawing function for circles
	var draw = function(data) {
		setScales()
		var circles = g.selectAll('circle').data(data)
    	circles.enter().append('circle').call(circleFunc)
		circles.exit().remove()
		g.selectAll('circle').transition().duration(1500).call(circleFunc)     	
	}

	// Pass data to your drawing function
	draw(data)
	var xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')

	var yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left')


	svg.append('g').call(xAxis)
		.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
		.attr('class', 'axis')
	

	svg.append('g')
		.attr('class', 'axis').call(yAxis)
		.attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

	svg.append('text')
		.attr('transform', 'translate(' + (margin.left + width/2) + ',' + (height + margin.top + 40) + ')')
		.attr('class', 'title')
		.text('GPA')

	svg.append('text')
		.attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + height/2) + ') rotate(-90)')
		.attr('class', 'title')
		.text('Course')

	$("circle").tooltip({
		'container': 'body',
		'placement': 'bottom'
	}); 
});
