async function init() {

	numberstringformat = d3.format(",");
	percentStringFormat = d3.format("%");
	dateStringFormat = d3.timeFormat("%B %d, %Y");

	function equalToTarget() {
		return this == d3.event.target;
	}

	var colors = ["#4682b4", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"];
	// var blues = ["#f7fbff","#f6faff","#f5fafe","#f5f9fe","#f4f9fe","#f3f8fe","#f2f8fd","#f2f7fd","#f1f7fd","#f0f6fd","#eff6fc","#eef5fc","#eef5fc","#edf4fc","#ecf4fb","#ebf3fb","#eaf3fb","#eaf2fb","#e9f2fa","#e8f1fa","#e7f1fa","#e7f0fa","#e6f0f9","#e5eff9","#e4eff9","#e3eef9","#e3eef8","#e2edf8","#e1edf8","#e0ecf8","#e0ecf7","#dfebf7","#deebf7","#ddeaf7","#ddeaf6","#dce9f6","#dbe9f6","#dae8f6","#d9e8f5","#d9e7f5","#d8e7f5","#d7e6f5","#d6e6f4","#d6e5f4","#d5e5f4","#d4e4f4","#d3e4f3","#d2e3f3","#d2e3f3","#d1e2f3","#d0e2f2","#cfe1f2","#cee1f2","#cde0f1","#cce0f1","#ccdff1","#cbdff1","#cadef0","#c9def0","#c8ddf0","#c7ddef","#c6dcef","#c5dcef","#c4dbee","#c3dbee","#c2daee","#c1daed","#c0d9ed","#bfd9ec","#bed8ec","#bdd8ec","#bcd7eb","#bbd7eb","#b9d6eb","#b8d5ea","#b7d5ea","#b6d4e9","#b5d4e9","#b4d3e9","#b2d3e8","#b1d2e8","#b0d1e7","#afd1e7","#add0e7","#acd0e6","#abcfe6","#a9cfe5","#a8cee5","#a7cde5","#a5cde4","#a4cce4","#a3cbe3","#a1cbe3","#a0cae3","#9ec9e2","#9dc9e2","#9cc8e1","#9ac7e1","#99c6e1","#97c6e0","#96c5e0","#94c4df","#93c3df","#91c3df","#90c2de","#8ec1de","#8dc0de","#8bc0dd","#8abfdd","#88bedc","#87bddc","#85bcdc","#84bbdb","#82bbdb","#81badb","#7fb9da","#7eb8da","#7cb7d9","#7bb6d9","#79b5d9","#78b5d8","#76b4d8","#75b3d7","#73b2d7","#72b1d7","#70b0d6","#6fafd6","#6daed5","#6caed5","#6badd5","#69acd4","#68abd4","#66aad3","#65a9d3","#63a8d2","#62a7d2","#61a7d1","#5fa6d1","#5ea5d0","#5da4d0","#5ba3d0","#5aa2cf","#59a1cf","#57a0ce","#569fce","#559ecd","#549ecd","#529dcc","#519ccc","#509bcb","#4f9acb","#4d99ca","#4c98ca","#4b97c9","#4a96c9","#4895c8","#4794c8","#4693c7","#4592c7","#4492c6","#4391c6","#4190c5","#408fc4","#3f8ec4","#3e8dc3","#3d8cc3","#3c8bc2","#3b8ac2","#3a89c1","#3988c1","#3787c0","#3686c0","#3585bf","#3484bf","#3383be","#3282bd","#3181bd","#3080bc","#2f7fbc","#2e7ebb","#2d7dbb","#2c7cba","#2b7bb9","#2a7ab9","#2979b8","#2878b8","#2777b7","#2676b6","#2574b6","#2473b5","#2372b4","#2371b4","#2270b3","#216fb3","#206eb2","#1f6db1","#1e6cb0","#1d6bb0","#1c6aaf","#1c69ae","#1b68ae","#1a67ad","#1966ac","#1865ab","#1864aa","#1763aa","#1662a9","#1561a8","#1560a7","#145fa6","#135ea5","#135da4","#125ca4","#115ba3","#115aa2","#1059a1","#1058a0","#0f579f","#0e569e","#0e559d","#0e549c","#0d539a","#0d5299","#0c5198","#0c5097","#0b4f96","#0b4e95","#0b4d93","#0b4c92","#0a4b91","#0a4a90","#0a498e","#0a488d","#09478c","#09468a","#094589","#094487","#094386","#094285","#094183","#084082","#083e80","#083d7f","#083c7d","#083b7c","#083a7a","#083979","#083877","#083776","#083674","#083573","#083471","#083370","#08326e","#08316d","#08306b"];
	// var blueToPurple = ["#f7fcfd","#f6fbfd","#f6fbfc","#f5fafc","#f4fafc","#f3f9fc","#f3f9fb","#f2f8fb","#f1f8fb","#f0f7fa","#f0f7fa","#eff6fa","#eef6fa","#eef5f9","#edf5f9","#ecf4f9","#ebf4f8","#eaf3f8","#eaf3f8","#e9f2f7","#e8f2f7","#e7f1f7","#e7f0f7","#e6f0f6","#e5eff6","#e4eff6","#e3eef5","#e3eef5","#e2edf5","#e1ecf4","#e0ecf4","#dfebf3","#deeaf3","#ddeaf3","#dce9f2","#dce8f2","#dbe8f2","#dae7f1","#d9e6f1","#d8e6f0","#d7e5f0","#d6e4f0","#d5e4ef","#d4e3ef","#d3e2ee","#d2e1ee","#d1e1ee","#d0e0ed","#cfdfed","#cedeec","#cddeec","#ccddec","#cbdceb","#cadbeb","#c9dbea","#c8daea","#c7d9ea","#c6d8e9","#c5d8e9","#c4d7e8","#c3d6e8","#c2d5e7","#c1d5e7","#c0d4e7","#bfd3e6","#bed2e6","#bdd2e5","#bcd1e5","#bbd0e5","#bacfe4","#b9cfe4","#b8cee3","#b7cde3","#b5cce3","#b4cce2","#b3cbe2","#b2cae1","#b1c9e1","#b0c9e1","#afc8e0","#afc7e0","#aec6df","#adc5df","#acc5de","#abc4de","#aac3de","#a9c2dd","#a8c1dd","#a7c0dc","#a6c0dc","#a5bfdb","#a4bedb","#a3bdda","#a3bcda","#a2bbd9","#a1bad9","#a0b9d8","#9fb8d8","#9fb7d7","#9eb6d7","#9db5d6","#9cb4d6","#9cb3d5","#9bb2d5","#9ab1d4","#9ab0d4","#99afd3","#98aed3","#98add2","#97acd1","#97aad1","#96a9d0","#95a8d0","#95a7cf","#94a6ce","#94a5ce","#93a3cd","#93a2cc","#92a1cc","#92a0cb","#929fcb","#919dca","#919cc9","#909bc9","#909ac8","#9098c7","#8f97c7","#8f96c6","#8f95c6","#8f93c5","#8e92c4","#8e91c4","#8e8fc3","#8e8ec2","#8e8dc2","#8d8cc1","#8d8ac0","#8d89c0","#8d88bf","#8d86be","#8d85be","#8d84bd","#8c82bc","#8c81bc","#8c80bb","#8c7eba","#8c7dba","#8c7cb9","#8c7ab9","#8c79b8","#8c78b7","#8c76b7","#8c75b6","#8c74b5","#8c72b5","#8c71b4","#8c70b3","#8b6eb3","#8b6db2","#8b6cb1","#8b6ab1","#8b69b0","#8b68af","#8b66af","#8b65ae","#8b64ae","#8b62ad","#8b61ac","#8b60ac","#8b5eab","#8a5daa","#8a5caa","#8a5aa9","#8a59a8","#8a58a8","#8a56a7","#8a55a6","#8a54a6","#8a52a5","#8951a4","#894fa3","#894ea3","#894da2","#894ba1","#894aa1","#8949a0","#88479f","#88469e","#88449d","#88439d","#88419c","#88409b","#873f9a","#873d99","#873c98","#873a98","#873997","#863796","#863695","#863494","#863393","#853192","#853091","#852f90","#852d8f","#842c8e","#842a8d","#84298c","#83278b","#83268a","#822589","#822388","#812287","#812186","#801f84","#801e83","#7f1d82","#7e1c81","#7e1a80","#7d197f","#7c187d","#7b177c","#7b167b","#7a1579","#791478","#781377","#771276","#761174","#741073","#730f72","#720f70","#710e6f","#700d6d","#6e0c6c","#6d0c6b","#6c0b69","#6a0a68","#690a66","#680965","#660863","#650862","#630760","#62075f","#60065d","#5f055c","#5d055a","#5c0459","#5a0457","#580356","#570354","#550253","#540251","#520150","#50014e","#4f004d","#4d004b"];
	// var catcolorsforward = ["#4682b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
	// Recreating the category20c colors scheme but changed the blue (index 8) to match
	var catcolors3 = ["#bcbd22", "#7f7f7f", "#e377c2", "#8c564b", "#9467bd", "#d62728", "#2ca02c", "#ff7f0e", "#4682b4", "#17becf"];

	d3.select("body")
		.append("div")
		.attr("class", "container")
		.attr("id", "intro")
		.append("div")
		.attr("class", "text-box")
		.append("text")
		.attr("class", "text")
		.attr("text-anchor", "middle")
		.text("Loading ... ");


	// Get and format the data from the API for cases and deaths
	// https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Date-Transmission-and/tvq9-ec9w
	covidData = await d3.csv("https://data.sfgov.org/resource/tvq9-ec9w.csv",
		function(d) {
			return {
				date: d.specimen_collection_date,
				disposition: d.case_disposition,
				category: d.transmission_category,
				value: d.case_count
			};
		});
	// https://data.sfgov.org/COVID-19/Covid-19-Tests/nfpa-mg4g
	testData = await d3.csv("https://data.sfgov.org/resource/nfpa-mg4g.csv");

	// Now roll up the data by the number of cases and deaths
	casesAndDeaths = d3.nest()
		.key(function(d) { return d.date; })
		.rollup(function(v) {
			return {
				cases: d3.sum(v, function(d) { if (d.disposition == "Confirmed") return d.value; }),
				deaths: d3.sum(v, function(d) { if (d.disposition == "Death") return d.value; })
			}
		})
		.entries(covidData);

	// Create a map for looking up cases / deaths per date
	dateLookup = casesAndDeaths.reduce((lookupMap, entry) => (lookupMap[entry.key] = entry.value, lookupMap), {});
	// Sort all the dates so that we can iterate through to calculate a running total
	sortedDates = (Object.keys(dateLookup)).slice().sort(function(a, b) { return a - b; });


	// Get the running totals
	cumulativeByDate = [];
	let cumulativeCases = 0;
	let cumulativeDeaths = 0;
	sortedDates.forEach(date => {
		dayCases = dateLookup[date].cases || 0;
		cumulativeCases += dayCases;
		dayDeaths = dateLookup[date].deaths || 0;
		cumulativeDeaths += dayDeaths;
		cumulativeByDate.push(
			{
				date: date,
				dayCases: dayCases,
				cumulativeCases: cumulativeCases,
				dayDeaths: dayDeaths,
				cumulativeDeaths: cumulativeDeaths
			}
		);
	});

	sortedDates = sortedDates.sort((a, b) => (a > b) ? 1 : -1);
	endDate = sortedDates[sortedDates.length - 1];
	beginDate = sortedDates[0];
	dateLookupCumulative = cumulativeByDate.reduce((lookupMap, entry) => (lookupMap[entry.date] = entry, lookupMap), {});
	totalCases = +dateLookupCumulative[endDate].cumulativeCases;
	totalDeaths = +dateLookupCumulative[endDate].cumulativeDeaths;

	testDateLookup = testData.reduce((lookupMap, entry) => (lookupMap[entry.specimen_collection_date] = entry, lookupMap), {});
	testSortedDates = (Object.keys(testDateLookup)).slice().sort(function(a, b) { return a - b; });

	sortedLast7DaysTestData = testSortedDates.slice(testSortedDates.length - 14, testSortedDates.length);
	totalTestsLast7Days = 0;
	totalPosLast7Days = 0;
	sortedLast7DaysTestData.forEach(date => {
		entry = testDateLookup[date];
		totalTestsLast7Days += +entry.tests;
		totalPosLast7Days += +entry.pos;
	});
	totalPercentPosTestsLast7Days = d3.format(".0f")(totalPosLast7Days / totalTestsLast7Days * 100);


	d3.select("body").select("#intro").remove();

	// Give a data overview at the top
    var dataOverview = d3.select("body")
		.append("div")
		.attr("class", "container")
		.attr("id", "data-overview")
    dataOverview.append("div")
		.attr("class", "box")
		.attr("id", "box-cases")
		.append("div")
		.attr("class", "text-box")
		.append("text")
		.attr("class", "text")
		.attr("text-anchor", "middle")
		.text("Total COVID-19 Cases Reported: " + numberstringformat(totalCases));

	// d3.select("#box-deaths")
    dataOverview.append("div")
		.attr("class", "box")
		.attr("id", "box-cases")
		.append("div")
		.attr("class", "text-box")
		.append("text")
		.attr("class", "text")
		.attr("text-anchor", "middle")
		.text("Total COVID-19 Deaths Reported: " + numberstringformat(totalDeaths));

	// d3.select("#box-tests")
    dataOverview.append("div")
		.attr("class", "box")
		.attr("id", "box-cases")
		.append("div")
		.attr("class", "text-box")
		.append("text")
		.attr("class", "text")
		.attr("text-anchor", "middle")
		.text("14-Day COVID-19 Positive Test Rate: " + totalPercentPosTestsLast7Days + "%");

	dataOverview
		.append("text")
		.text("Data last updated on " + dateStringFormat(new Date(endDate)));


	// Line Chart For Covid Cases

	d3.select("body")
		.append("div")
		.attr("class", "text-box-large-intro")
		.append("text")
		.attr("class", "text-in-box-large")
		.attr("text-anchor", "middle")
		.html("More information about COVID-19 in San Francisco: <a href='https://sf.gov/topics/coronavirus-covid-19' target='_blank'>https://sf.gov/topics/coronavirus-covid-19</a><br/>" +
			"    Specific information about Phases of Reopening: <a href='https://sf.gov/step-by-step/reopening-san-francisco' target='_blank'>https://sf.gov/step-by-step/reopening-san-francisco</a><br/>");

	var tooltip = d3.select("body")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);

	var margin = {top: 10, right: 30, bottom: 30, left: 60},
		width = 900 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;


	var svgDivCases = d3.select("body")
		.append("div")
		.attr("id", "line-chart-cases-div")
		.attr("class", "chart-race-div");

	var svg = svgDivCases
		.append("svg")
			.attr("width", 1000)
			.attr("height", height + margin.top + margin.bottom)
			.attr("id", "line-chart-cases-and-deaths")
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scaleTime()
		.domain(d3.extent(cumulativeByDate, function(d) { return new Date(d.date); }))
		.range([0, width]);

	svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
		.call(d3.axisBottom(x));

	// var y = d3.scaleLinear()
	// 	.domain([0, d3.max(cumulativeByDate, function(d) { return +d.cumulativeCases; })])
	// 	.range([height, 0]);

	var y = d3.scaleLog()
		.domain([1, d3.max(cumulativeByDate, function(d) { return +d.cumulativeCases; })])
		.range([height, 0]);

		  // text label for the y axis
	  svg.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", margin.left - 60)
	      .attr("x", 0 - (height / 2))
	      .attr("dy", "1em")
	      .style("text-anchor", "middle")
	      .text("Number of Cases (Log Scale)");


	svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.call(d3.axisLeft(y).tickArguments([8, ".4"]));

	svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.append("path")
		.attr("id", "cases-line")
		.datum(cumulativeByDate)
		.attr("fill", "none")
		.attr("stroke", "#4682b4")
		.attr("stroke-width", 5)
		.attr("d", d3.line()
			.y(function(d) { return d.cumulativeCases == 0 ? y(1) : y(d.cumulativeCases); })
			.defined(function(d) { return d.cumulativeCases; })
			.x(function(d) { return x(new Date(d.date)); })
		);

	svg.append("text")
		.attr("x", x(new Date(endDate)) + margin.left)
		.attr("y", y(totalCases) + margin.top * 2 + 20)
		.attr("text-anchor", "end")
		.style("font-size", "12px")
		.text("Total Cases: " + numberstringformat(totalCases));

	svg.selectAll("dot")
		.data(cumulativeByDate)
		.enter()
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.append("circle")
		.attr("r", 4)
		.attr("cx", function(d) { return x(new Date(d.date)); })
		.attr("cy", function(d) { return d.cumulativeCases == 0 ? y(1) : y(d.cumulativeCases); })
		.attr("fill", "#4682b4")
		.on("mouseover", function(d) {
			tooltip.transition()
				.duration(200)
				.style("opacity", 0.9);
			tooltip.html(dateStringFormat(new Date(d.date)) + "<br/>" +
				"New Cases: " + d.dayCases + "<br/>" +
				"Total Cases: " + d.cumulativeCases + "<br/>")
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px")
		})
		.on("mouseout", function(d) {
			tooltip.transition()
				.duration(500)
				.style("opacity", 0);
		});


	svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.append("path")
		.attr("id", "deaths-line")
		.datum(cumulativeByDate)
		.attr("fill", "none")
		.attr("stroke", "#4682b4")
		.attr("stroke-width", 5)
		.attr("d", d3.line()
			.y(function(d) { return d.cumulativeDeaths == 0 ? y(1) : y(d.cumulativeDeaths); })
			.defined(function(d) { return d.cumulativeDeaths; })
			.x(function(d) { return x(new Date(d.date)); })
		);

	svg.append("text")
		.attr("x", x(new Date(endDate)) + margin.left)
		.attr("y", y(totalDeaths) + margin.top * 2 + 20)
		.attr("text-anchor", "end")
		.style("font-size", "12px")
		.text("Total Deaths: " + numberstringformat(totalDeaths));

	svg.selectAll("dot")
		.data(cumulativeByDate)
		.enter()
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.append("circle")
		.attr("r", 4)
		.attr("cx", function(d) { return x(new Date(d.date)); })
		.attr("cy", function(d) { return d.cumulativeDeaths == 0 ? y(1) : y(d.cumulativeDeaths); })
		.attr("fill", "#6baed6")
		.on("mouseover", function(d) {
			tooltip.transition()
				.duration(200)
				.style("opacity", 0.9);
			tooltip.html(dateStringFormat(new Date(d.date)) + "<br/>" +
				"New Deaths: " + d.dayDeaths + "<br/>" +
				"Total Deaths: " + d.cumulativeDeaths + "<br/>")
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px")
		})
		.on("mouseout", function(d) {
			tooltip.transition()
				.duration(500)
				.style("opacity", 0);
		});

	// Line Chart Title
	svg.append("text")
		.attr("x", width / 2)
		.attr("y", margin.top / 2)
		.attr("text-anchor", "middle")
		.style("font-size", "20px")
		.text("Rate of Change of COVID-19 Cases and Deaths");

	// Add informational lines
	// Phase 1 Starts
	var phaseOneStartDate = new Date("2020-03-17T00:00:00.000");
	svg.append("line")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.attr("x1", x(phaseOneStartDate))
		.attr("y1", 0)
		.attr("x2", x(phaseOneStartDate))
		.attr("y2", height)
		.style("stroke-width", 5)
		.style("stroke", "#ff7f0e")
		.style("fill", "none")
		.style("stroke-dasharray", ("3, 3"));


	svg.append("text")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.attr("x", x(phaseOneStartDate) - 50)
		.attr("y", height - margin.top * 30)
		// .text("Phase 1: " + d3.timeFormat("%b %d")(phaseOneStartDate));
		.text("Phase 1 Begins")
	// Phase 2 Starts
	var phaseTwoStartDate = new Date("2020-06-01T00:00:00.000");
	svg.append("line")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.attr("x1", x(phaseTwoStartDate))
		.attr("y1", 0)
		.attr("x2", x(phaseTwoStartDate))
		.attr("y2", height)
		.style("stroke-width", 5)
		.style("stroke", "#ff7f0e")
		.style("fill", "none")
		.style("stroke-dasharray", ("3, 3"));

	svg.append("text")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.attr("x", x(phaseTwoStartDate) - 50)
		.attr("y", height - margin.top * 12)
		// .text("Phase 2: " + d3.timeFormat("%b %d")(phaseTwoStartDate));
		.text("Phase 2 Begins")

	// Phase 2b Starts
	var phaseTwoBStartDate = new Date("2020-06-15T00:00:00.000");
	svg.append("line")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.attr("x1", x(phaseTwoBStartDate))
		.attr("y1", 0)
		.attr("x2", x(phaseTwoBStartDate))
		.attr("y2", height)
		.style("stroke-width", 5)
		.style("stroke", "#ff7f0e")
		.style("fill", "none")
		.style("stroke-dasharray", ("3, 3"));

	svg.append("text")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		.attr("x", x(phaseTwoBStartDate) - 50)
		.attr("y", height - margin.top * 6)
		// .text("Phase 2b: " + d3.timeFormat("%b %d")(phaseTwoBStartDate));
		.text("Phase 2b Begins")

	// Pie Chart with Transmission Categories
	var categories = d3.nest()
		.key(function(d) { return d.category; })
		.rollup(function(v) { return d3.sum(v, function(d) { return d.value; }); })
		.entries(covidData);
	categoryData = categories.map(entry => entry.value);

	var radius = 125;
	var w = 300;
	var h = 300;

	// var vis = svgDivCases
	//     .append("svg:svg")
	//     .attr("id", "pie-chart-categories")
	//     .data([categories])
	//         .attr("width", 300)
	//         .attr("height", 300)
	//     .append("svg:g")
	//         .attr("transform", "translate(" + (radius + 15) + "," + radius + ")")

	var arc = d3.arc()
		.innerRadius(0)
	    .outerRadius(radius);

	// var pie = d3.pie()
	//     .value(function(d) { return d.value; });

	// var arcs = vis.selectAll("g.slice")
	//     .data(pie)
	//     .enter()
	//     .append("svg:g")
	//     .attr("class", "slice");

	// arcs.append("svg:path")
	//     .attr("fill", function(d, i) { return colors[i]; } )
	//     .attr("d", arc)
	//     .on("mouseover", function(d) {
	// 		tooltip.transition()
	// 			.duration(200)
	// 			.style("opacity", 0.9);
	// 		tooltip.html(d.data.key + "<br/>" +
	// 			"Total Cases: " + numberstringformat(d.value) + "<br/>" +
	// 			"Percentage: " + d3.format(".0f")(d.value / totalCases * 100) + "%<br/>")
	// 			.style("left", (d3.event.pageX) + "px")
	// 			.style("top", (d3.event.pageY - 28) + "px")
	// 	})
	// 	.on("mouseout", function(d) {
	// 		tooltip.transition()
	// 			.duration(500)
	// 			.style("opacity", 0);
	// 	});

	// arcs.append("svg:text")
	//     .attr("transform", function(d) {
	//         d.innerRadius = 0;
	//         d.outerRadius = radius;
	//         return "translate(" + arc.centroid(d) + ")";
	//     })
	//     .attr("width", radius)
	//     .attr("text-anchor", "middle")
	//     .text(function(d, i) {
	//     	categoryName = categories[i].key;
	//     	if (categoryName == "From Contact") {
	//     		return "Known Contact";
	//     	}
	//     	return categories[i].key;
	//     });


	// // Pie Chart Title
	// vis.append("text")
	// 	.attr("x", 0)
	// 	.attr("y", 150)
	// 	.attr("text-anchor", "middle")
	// 	.style("font-size", "20px")
	// 	.text("How COVID-19 Was Trasmitted");

	d3.select("body")
		.append("div")
		.attr("class", "text-box-large-source")
		.attr("id", "overview-message-source")
		.append("text")
		// .attr("class", "text-in-box-large-source")
		.attr("text-anchor", "middle")
		.html("Data Sources: <a href='https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Date-Transmission-and/tvq9-ec9w' target='_blank'>COVID-19-Cases-Summarized-by-Date-Transmission</a> and " +
			"<a href='https://data.sfgov.org/COVID-19/Covid-19-Tests/nfpa-mg4g' target='_blank'>COVID-19-Tests</a>");



	// Further Exploration
	var selected = {
		race: false,
		age: false,
		neighborhood: false,
		testing: false
	};


	var raceButton = d3.select("body")
		.append("div")
		.attr("class", "button-container")
		.on("click", function() {
			if (!selected.race) {
				addRaceAndEthnicity();
				selected.race = true;
			} else {
				removeRaceAndEthnicity();
				selected.race = false;
			}
		})
		.append("div")
		.attr("class", "text-explore")
		.append("text")
		.attr("class", "text")
		.text("Explore COVID-19 Cases By Race and Ethnicity");

	var raceSvg = d3.select("body")
		.append("div")
		.attr("id", "ethnicity-data");

	var ageButton = d3.select("body")
		.append("div")
		.attr("class", "button-container")
		.on("click", function() {
			if (!selected.age) {
				addAge();
				selected.age = true;
			} else {
				removeAge();
				selected.age = false;
			}
		})
		.append("div")
		.attr("class", "text-explore")
		.append("text")
		.attr("class", "text")
		.attr("text-anchor", "middle")
		.text("Explore COVID-19 Cases By Age Group");

	var ageSvg = d3.select("body")
		.append("div")
		.attr("id", "age-data");

	var neighborhoodButton = d3.select("body")
		.append("div")
		.attr("class", "button-container")
		.on("click", function() {
			if (!selected.neighborhood) {
				addNeighborhoods();
				selected.neighborhood = true;
			} else {
				removeNeighborhoods();
				selected.neighborhood = false;
			}
		})
		.append("div")
		.attr("class", "text-explore")
		.append("text")
		.attr("class", "text")
		.attr("text-anchor", "middle")
		.text("Explore COVID-19 Cases / Deaths By Neighborhood");

	var neighborhoodSvg = d3.select("body")
		.append("div")
		.attr("id", "neighborhood-data");


	// var testingButton = d3.select("body")
	// 	.append("div")
	// 	.attr("class", "button-container")
	// 	.on("click", function() {
	// 		if (!selected.testing) {
	// 			addTesting();
	// 			selected.testing = true;
	// 		} else {
	// 			removeTesting();
	// 			selected.testing = false;
	// 		}
	// 	})
	// 	.append("div")
	// 	.attr("class", "text-explore")
	// 	.append("text")
	// 	.attr("class", "text")
	// 	.attr("text-anchor", "middle")
	// 	.text("Explore COVID-19 Cases By Testing");

	// var testingSvg = d3.select("body")
	// 	.append("div")
	// 		.attr("id", "testing-data");

	// Get and format the data to further explore



	// GeoJSON instead - https://data.sfgov.org/COVID-19/COVID-19-Cases-and-Deaths-Summarized-by-Geography/tpyr-dvnc
	geoData = await d3.csv("https://data.sfgov.org/resource/tpyr-dvnc.csv");
	filteredGeoData = geoData.filter(function(d) { return d.area_type == "Analysis Neighborhood"; })
	smallerGeo = filteredGeoData.map(function(d) {
		return {
			name: d.id,
			cases: d.count == "" ? "0" : d.count,
			deaths: d.deaths == "" ? "0" : d.deaths,
			population: d.acs_population
		};
	});

	var preSortedGeo = smallerGeo.sort(function(a, b) { return a.cases - b.cases; });
	var sortedGeo = preSortedGeo.filter(function(d) { return d.cases > 0; })

	// http://www.healthysf.org/bdi/outcomes/zipmap.htm
	var zipMap = {
		94102: "Hayes Valley/Tenderloin/North of Market",
		94103: "South of Market",
		94107: "Potrero Hill",
		94108: "Chinatown",
		94109: "Polk/Russian Hill (Nob Hill)",
		94110: "Inner Mission/Bernal Heights",
		94112: "Ingelside-Excelsior/Crocker-Amazon",
		94114: "Castro/Noe Valley",
		94115: "Western Addition/Japantown",
		94116: "Parkside/Forest Hill",
		94117: "Haight-Ashbury",
		94118: "Inner Richmond",
		94121: "Outer Richmond",
		94122: "Sunset",
		94123: "Marina",
		94124: "Bayview-Hunters Point",
		94127: "St. Francis Wood/Miraloma/West Portal",
		94131: "Twin Peaks-Glen Park",
		94132: "Lake Merced",
		94133: "North Beach/Chinatown",
		94134: "Visitacion Valley/Sunnydale"
	}


	filteredGeoZCTA = geoData.filter(function(d) { return d.area_type == "ZCTA" && zipMap[d.id]; });

	totalPopulation = filteredGeoZCTA.reduce(function(accumulator, item) {
		return accumulator + +item.acs_population;
	}, 0);
	totalCases = filteredGeoZCTA.reduce(function(accumulator, item) {
		return accumulator + +item.count;
	}, 0);
	totalDeaths = filteredGeoZCTA.reduce(function(accumulator, item) {
		return accumulator + +item.deaths;
	}, 0);

	geoZCTAByCases = filteredGeoZCTA
		.map(function(d) {
		return {
			id: d.id,
			name: zipMap[d.id], // + " (" + d.id + ")",
			value: d.count == "" ? 0 : +d.count,
			population: +d.acs_population,
			percentOfPopulation: +d.count / +d.acs_population,
			percentOfValue: +d.count / totalCases,
			neighborhoodPercentOfPopulation: +d.acs_population / totalPopulation,
			projected: d3.format(".0f")((+d.acs_population / totalPopulation) * totalCases)
		};
	}).sort(function(a, b) { return a.value - b.value});

	geoZCTAByDeaths = filteredGeoZCTA
		.map(function(d) {
		return {
			id: d.id,
			name: zipMap[d.id], // + " (" + d.id + ")",
			value: d.deaths == "" ? 0 : +d.deaths,
			population: +d.acs_population,
			percentOfPopulation: +d.deaths / +d.acs_population,
			percentOfValue: +d.deaths / totalDeaths,
			neighborhoodPercentOfPopulation: +d.acs_population / totalPopulation,
			projected: d3.format(".0f")((+d.acs_population / totalPopulation) * totalDeaths)
		};
	}).sort(function(a, b) { return a.value - b.value});


	geoZCTADataMap = {
		cases: geoZCTAByCases,
		deaths: geoZCTAByDeaths
	}

	// Race and Ethnicity
	// https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Race-and-Ethnicity/vqqm-nsqg
	raceData = await d3.csv("https://data.sfgov.org/resource/vqqm-nsqg.csv",
		function(d) {
			return {
				date: d.specimen_collection_date,
				raceEthnicity: d.race_ethnicity,
				dayCases: d.new_confirmed_cases,
				cumulativeCases: d.cumulative_confirmed_cases
			}
		});

	// Create a map for looking up data by race
	raceLookup = raceData.reduce(function(lookupMap, entry) {
		if (!lookupMap[entry.raceEthnicity]) {
			lookupMap[entry.raceEthnicity] = [];
		}
		lookupMap[entry.raceEthnicity].push({
			date: entry.date,
			dayCases: entry.dayCases,
			cumulativeCases: entry.cumulativeCases
		});
		return lookupMap;
	}, {});

	// Get a list of all the races and ethnicities in the dataset
	racesAndEthnicities = Object.keys(raceLookup);

	// Change raceLookup from a map with array values to a map with map values with date key
	raceLookupSorted = {};
	// raceDateLookup = {};
	raceEndDateCumulatives = [];
	raceTotal = 0;
	Object.entries(raceLookup).forEach(entry => {
		raceEthnicity = entry[0];
		dataList = entry[1];
		sortedList = dataList.sort((a, b) => (a.date > b.date) ? 1 : -1);

		// Find cumulative values
		dateLookupByRace = dataList.reduce((lookupMap, datum) => (lookupMap[datum.date] = datum, lookupMap), {});
		endDateValue = sortedList[sortedList.length - 1].date;
		beginDateValue = sortedList[0].date;
		raceEndDateCumulatives.push({
			name: raceEthnicity,
			value: +dateLookupByRace[endDateValue].cumulativeCases
		});
		raceTotal += +dateLookupByRace[endDateValue].cumulativeCases;

		// Add begin and end date points if don't exist
		if (endDateValue != endDate) {
			newEndEntry = dateLookupByRace[endDateValue];
			newEndEntry.date = endDate;
			newEndEntry.dayCases = "0";
			dateLookupByRace[endDate] = newEndEntry;
			sortedList.push(newEndEntry);
		}
		if (beginDateValue != beginDate) {
			newBeginEntry = {
				date: beginDate,
				dayCases: "0",
				cumulativeCases: "0",
			};
			sortedList.unshift(newBeginEntry);
		}
		raceLookupSorted[raceEthnicity] = sortedList;

	});
	tot = Object.values(raceEndDateCumulatives).reduce(function (accumulator, item) {
	  return accumulator + +item;
	}, 0);

	// Percent of Population According to Census
	// https://www.census.gov/quickfacts/sanfranciscocountycalifornia
	var racePercs = {
		"Native American": 0.007,
		"Other": 0,
		"Native Hawaiian or Other Pacific Islander": 0.005,
		"Multi-racial": 0.045,
		"Black or African American": 0.056,
		"Asian": 0.36,
		"Unknown": 0,
		"White": 0.402,
		"Hispanic or Latino/a, all races": 0.152 //(0.152 + 0.128)
	}
		
	var sortedRaceEndDateCumulatives = raceEndDateCumulatives.sort(function(a, b) { return a.value - b.value; });
	var sortedRaceEndDatePercentages = sortedRaceEndDateCumulatives.map(function(d) {
		racePercentPopulation = racePercs[d.name];
		return {
			name: d.name,
			value: d.value,
			percentCases: +d3.format(".3f")(+d.value / raceTotal),
			percentPopulation: +d3.format(".3f")(+racePercentPopulation),
			projectedCases: +d3.format(".0f")(racePercentPopulation * raceTotal)
		}
	});


	racesSortedByCases = sortedRaceEndDateCumulatives.map(race => race.name);
	raceDetailsLookup = sortedRaceEndDatePercentages.reduce((lookupMap, entry) => (lookupMap[entry.name] = entry, lookupMap), {});

	// Age Group
	// https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Age-Group/sunc-2t3k
	ageData = await d3.csv("https://data.sfgov.org/resource/sunc-2t3k.csv",
		function(d) {
			return {
				date: d.specimen_collection_date,
				ageGroup: d.age_group,
				dayCases: d.new_confirmed_cases,
				cumulativeCases: d.cumulative_confirmed_cases
			}
		});


	// Create a map for looking up data by age group
	ageLookup = ageData.reduce(function(lookupMap, entry) {
		if (!lookupMap[entry.ageGroup]) {
			lookupMap[entry.ageGroup] = [];
		}
		lookupMap[entry.ageGroup].push({
			date: entry.date,
			dayCases: entry.dayCases,
			cumulativeCases: entry.cumulativeCases
		});
		return lookupMap;
	}, {});

	// Get a list of all the age groups in the dataset
	ageGroups = Object.keys(ageLookup);

	// Change ageLookup from a map with array values to a map with map values with date key
	ageLookupSorted = {};
	ageDateLookup = {};
	ageEndDateCumulatives = [];
	ageTotal = 0;
	Object.entries(ageLookup).forEach(entry => {
		ageGroup = entry[0];
		dataList = entry[1];
		sortedList = dataList.sort((a, b) => (a.date > b.date) ? 1 : -1);

		dateLookupByAge = dataList.reduce((lookupMap, datum) => (lookupMap[datum.date] = datum, lookupMap), {});
		endDateValue = sortedList[sortedList.length - 1].date;
		beginDateValue = sortedList[0].date;

		// sortedDates = (Object.keys(dateLookupByAge)).slice().sort(function(a, b) { return a - b; });
		// endDateValue = sortedDates[sortedDates.length - 1];
		ageEndDateCumulatives.push({
			name: ageGroup,
			value: +dateLookupByAge[endDateValue].cumulativeCases
		})
		ageDateLookup[ageGroup] = dateLookupByAge;
		ageTotal += +dateLookupByAge[endDateValue].cumulativeCases;

		if (endDateValue != endDate) {
			newEndEntry = dateLookupByAge[endDateValue];
			newEndEntry.date = endDate;
			newEndEntry.dayCases = "0";
			dateLookupByAge[endDate] = newEndEntry;
			sortedList.push(newEndEntry);
		}
		if (beginDateValue != beginDate) {
			newBeginEntry = {
				date: beginDate,
				dayCases: "0",
				cumulativeCases: "0",
			};
			sortedList.unshift(newBeginEntry);
		}
		ageLookupSorted[ageGroup] = sortedList;

	});
	tot = Object.values(raceEndDateCumulatives).reduce(function (accumulator, item) {
	  return accumulator + +item;
	}, 0);

	var sortedAgeEndDateCumulatives = ageEndDateCumulatives.sort(function(a, b) { return a.value - b.value; });


	function addRaceAndEthnicity() {

		// close other windows
		ageSvg.selectAll("div").remove();
		neighborhoodSvg.selectAll("div").remove();


		var racePopup = raceSvg
			.append("div")
			.attr("class", "popup")
			.style("opacity", 0);

		var raceClicked = "default";

		updateRaceCharts = function(race) {

			raceClicked = race;
			// raceStats.selectAll(".lineLegend").remove();
			// raceStats.select("#legend-background").remove();
			// raceStats.select("#race-details").remove();

			if (raceClicked == "default") {

				raceLine.selectAll(".race-cases-line")
					.attr("opacity", 1);

				racePopup.transition()
					.duration(200)
					.style("opacity", 0);

				// var lineLegend = raceStats.selectAll(".lineLegend")
				// .data(sortedRaceEndDateCumulatives)
				// .enter()
				// .append("g")
				// .attr("class","lineLegend");

				// lineLegend.append("text")
				// 	.text(function (d) { return d.name; })
				// 	// .attr('y', function(d, i) { return raceYs(i) + (i * 3) + 12; })
				// 	// .attr('x', 30);
				// 	.attr('y', function(d, i) { return raceYs(i % 5) + ((i % 5) * 3) + 12; })
				// 	.attr('x', function(d, i) { return Math.floor(i / 5) * (width / 2) + 30; })


				// lineLegend.append("rect")
				// 	.attr("fill", function (d, i) {return catcolors3[i]; })
				// 	// .attr('y', function(d, i) { return raceYs(i) + (i * 3); })
				// 	// .attr('x', 10)
				// 	.attr('y', function(d, i) { return raceYs(i % 5) + ((i % 5) * 3); })
				// 	.attr('x', function(d, i) { return Math.floor(i / 5) * (width / 2) + 10; })
				// 	.attr("width", 15)
				// 	.attr("height", 15);

			} else {

				index = racesSortedByCases.indexOf(race);
				raceLine.selectAll(".race-cases-line")
					.attr("opacity", 0.2);

				raceLine.select("#race-cases-line-" + index)
					.attr("opacity", 1);

				racePopup.transition()
					.duration(200)
					.style("background", catcolors3[index])
					.style("opacity", 0.8);
				racePopup.html(race.toUpperCase() + "<br/>" +
					"% of Total COVID-19 Cases: " + d3.format(".1f")(+raceDetailsLookup[race].percentCases * 100) + "%<br/>" +
					"Number of COVID-19 Cases: " + numberstringformat(raceDetailsLookup[race].value) + "<br/>" +
					"% of SF Population: " + d3.format(".1f")(+raceDetailsLookup[race].percentPopulation * 100) + "%" + "<br/>" +
					"Projected COVID-19 Cases Based on Population: " +  numberstringformat(raceDetailsLookup[race].projectedCases) + "<br/>")
					.style("color", "white")
					.style("left", 600 + "px")
					.style("top", 1300 + "px");


				// index = racesSortedByCases.indexOf(race);

				// raceStats
				// 	.append("rect")
				// 	.attr("id", "legend-background")
				// 	.attr("width", "100%")
				// 	.attr("height", "100%")
				// 	.attr("fill", catcolors3[index]);
				// 	// .attr("opacity", "1");

				// raceStats
				// 	.append("text")
				// 	.attr("class", "race-details")
				// 	.attr('x', 10)
				// 	.attr('y', 30)
				// 	.style("text-decoration", "underline")
				// 	.text(race.toUpperCase());


				// raceStats
				// 	.append("text")
				// 	.attr("class", "race-details")
				// 	.attr('x', 10)
				// 	.attr('y', 70)
				// 	.text("% of Total COVID-19 Cases: " + d3.format(".1f")(+raceDetailsLookup[race].percentCases * 100) + "%");

				// raceStats
				// 	.append("text")
				// 	.attr("class", "race-details")
				// 	.attr('x', 10)
				// 	.attr('y',110)
				// 	.text("Number of COVID-19 Cases: " + numberstringformat(raceDetailsLookup[race].value));

				// raceStats
				// 	.append("text")
				// 	.attr("class", "race-details")
				// 	.attr('x', 10)
				// 	.attr('y', 150)
				// 	// .text("Percentage of Population: " + (+numberstringformat(raceDetailsLookup[race].percentPopulation) * 100) + "%");
				// 	.text("% of SF Population: " + d3.format(".1f")(+raceDetailsLookup[race].percentPopulation * 100) + "%");

				// raceStats
				// 	.append("text")
				// 	.attr("class", "race-details")
				// 	.attr('x', 10)
				// 	.attr('y', 190)
				// 	.text("Projected COVID-19 Cases Based on Population: " +  numberstringformat(raceDetailsLookup[race].projectedCases));

			}
		}

		// X - from 0 to the max value
		// raceXDomain = [0, d3.max(raceEndDateCumulatives, d => d.value)];
		raceXDomain = [0, d3.max(sortedRaceEndDatePercentages, d => d.percentCases)];
		raceXs = d3.scaleLinear()
			.domain(raceXDomain)
			.range([0, 600]);

		// Y - the range from 0 to the lenth of the array (number of races)
		raceYDomain = d3.range(sortedRaceEndDatePercentages.length);
		raceYs = d3.scaleLinear()
			.domain(raceYDomain)
			.range([10, 45]);

		// Line
		raceSvg
			.append("div")
			.attr("class", "text-box-large race-message")
			.attr("id", "race-message-2")
			// .attr("class", "race-message")
			.append("text")
			.attr("class", "text-in-box-large")
			.attr("text-anchor", "middle")
			.html("Rate of Change of COVID-19 Cases Over Time By Race / Ethnicity");


		var raceSvgDivLine = raceSvg.append("div")
			.attr("id", "line-chart-race-div")
			.attr("class", "chart-race-div");


			raceLine = raceSvgDivLine.append("svg")
				.attr("id", "race-line-svg")
				.attr("width", 1000)
				.attr("height", 400);

			raceLine
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var raceLineX = d3.scaleTime()
				.domain(d3.extent(raceLookupSorted
					["Unknown"], function(d) { return new Date(d.date); }))
				.range([0, width])

			raceLine.append("g")
				.attr("transform", "translate(" + (margin.left + 70) + "," + (height + margin.top) + ")")
				.call(d3.axisBottom(raceLineX));

			// var raceLineY = d3.scaleLinear()
			// 	.domain([0, d3.max(raceLookup[sortedRaceEndDateCumulatives[8].name], function(d) { return +d.cumulativeCases; })])
			// 	.range([height, 0]);

			var max = d3.max(raceLookupSorted[sortedRaceEndDateCumulatives[8].name], function(d) { return +d.cumulativeCases; });
			// var logMax = Math.log(d3.max(raceLookup[sortedRaceEndDateCumulatives[8].name], function(d) { return +d.cumulativeCases; }));
			var raceLineY = d3.scaleLog()
				.domain([1, max])
				.range([400 - margin.bottom - margin.top, 0])
				.base(10);

			raceLine.append("g")
				.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
				.call(d3.axisLeft(raceLineY).tickArguments([8, ".4"]));


			index = 0;
			sortedRaceEndDateCumulatives.forEach(race => {

			raceLine.append("g")
				.attr("transform", "translate(" + (margin.left + 70)  + "," + margin.top + ")")
				.append("path")
				.attr("class", "race-cases-line")
				.attr("id", "race-cases-line-" + index)
				.datum(raceLookupSorted[race.name])
				.attr("fill", "none")
				.attr("stroke", catcolors3[index++])
				.attr("stroke-width", 5)
				.attr("d", d3.line()
					// .y(function(d) { return raceLineY(d.cumulativeCases); })
					.y(function(d) { cumCases = d.cumulativeCases == 0 ? 1 : d.cumulativeCases; return raceLineY(cumCases); })
					.defined(function(d) { return d.cumulativeCases; })
					.x(function(d) { return raceLineX(new Date(d.date)); })
				)
				.on("click", function(d) {
					updateRaceCharts(race.name);
				})
				.on("mouseover", function(d) {
					tooltip.transition()
						.duration(200)
						.style("opacity", 0.9);
					tooltip.html(race.name)
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY) + "px")
				})
				.on("mouseout", function(d) {
					tooltip.transition()
						.duration(500)
						.style("opacity", 0);
				});
			});

			// text label for the y axis
			raceLine.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", margin.left + 10)
				.attr("x", 0 - (height / 2))
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text("Number of Cases (Log Scale)");



		// Line Chart Title
		// raceLine.append("text")
		// 	.attr("x", width / 2)
		// 	.attr("y", margin.top + 10)
		// 	.attr("text-anchor", "middle")
		// 	.style("font-size", "20px")
		// 	.text("Total COVID-19 Cases By Date and Race / Ethnicity");

		// Add informational lines
		// Phase 1 Starts
		// var phaseOneStartDate = new Date("2020-03-17T00:00:00.000");
		raceLine.append("line")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x1", x(phaseOneStartDate))
			.attr("y1", 0)
			.attr("x2", x(phaseOneStartDate))
			.attr("y2", height)
			.style("stroke-width", 5)
			.style("stroke", "#ff7f0e")
			.style("fill", "none")
			.style("stroke-dasharray", ("3, 3"));


		raceLine.append("text")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x", x(phaseOneStartDate) - 50)
			.attr("y", height - margin.top * 30)
			// .text("Phase 1: " + d3.timeFormat("%b %d")(phaseOneStartDate));
			.text("Phase 1 Begins")

		// Phase 2 Starts
		// var phaseTwoStartDate = new Date("2020-06-01T00:00:00.000");
		raceLine.append("line")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x1", x(phaseTwoStartDate))
			.attr("y1", 0)
			.attr("x2", x(phaseTwoStartDate))
			.attr("y2", height)
			.style("stroke-width", 5)
			.style("stroke", "#ff7f0e")
			.style("fill", "none")
			.style("stroke-dasharray", ("3, 3"));

		raceLine.append("text")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x", x(phaseTwoStartDate) - 50)
			.attr("y", height - margin.top * 8)
			// .text("Phase 2: " + d3.timeFormat("%b %d")(phaseTwoStartDate));
			.text("Phase 2 Begins")

		// Phase 2b Starts
		// var phaseTwoBStartDate = new Date("2020-06-15T00:00:00.000");
		raceLine.append("line")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x1", x(phaseTwoBStartDate))
			.attr("y1", 0)
			.attr("x2", x(phaseTwoBStartDate))
			.attr("y2", height)
			.style("stroke-width", 5)
			.style("stroke", "#ff7f0e")
			.style("fill", "none")
			.style("stroke-dasharray", ("3, 3"));

		raceLine.append("text")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x", x(phaseTwoBStartDate) - 50)
			.attr("y", height - margin.top * 4)
			// .text("Phase 2b: " + d3.timeFormat("%b %d")(phaseTwoBStartDate));
			.text("Phase 2b Begins")


		raceSvg
			.append("div")
			.attr("class", "text-box-large race-message")
			// .attr("class", "race-message")
			.append("text")
			.attr("class", "text-in-box-large")
			.attr("text-anchor", "middle")
			.html("% COVID-19 Cases By Race / Ethnicity<br/>Click On a Bar or Line to See Details");

		// var raceSvgDivStats = raceSvg.append("div")
		// 	.attr("id", "stats-race-div")
		// 	.attr("class", "chart-race-div");

		// raceStats = raceSvgDivStats.append("svg")
		// 	.attr("id", "race-stats-svg")
		// 	.attr("width", 600)
		// 	.attr("height", 200);
			// .attr("id", "race-svg-2");


		// BAR CHART

		// raceSvg
		// 	.append("div")
		// 	.attr("class", "text-box-large race-message")
		// 	.attr("id", "race-message-3")
		// 	// .attr("class", "race-message")
		// 	.append("text")
		// 	.attr("class", "text-in-box-large")
		// 	.attr("text-anchor", "middle")
		// 	.html("% COVID-19 Cases By Race / Ethnicity");

		var raceSvgDivBar = raceSvg.append("div")
			.attr("id", "bar-chart-race-div")
			.attr("class", "chart-race-div");

		raceBar = raceSvgDivBar.append("svg")
			.attr("id", "race-bar-svg")
			.attr("width", 1000)
			.attr("height", 400);

		raceBar
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.style("margin", "20px")
			.selectAll("rect")
			.data(sortedRaceEndDatePercentages)
			.enter()
			.append("rect")
			.attr("class", "race-rect")
			.attr("x", 250)
			.attr("y", function(d, i) { return raceYs(i); })
			.attr("width", function(d) { return raceXs(d.percentCases); })
			.attr("height", 30)
			.style("fill", function(d, i) { return catcolors3[i]; });

		raceBar
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
			.attr("id", "race-rects")
			.style("margin", "20px")
			.selectAll('rect')
			.data(sortedRaceEndDatePercentages)
			.enter()
			.append('rect')
			.attr("class", "race-rect")
			.attr('x', 250)
			.attr('y', function(d,i) {return raceYs(i); })
			// .attr('width', function(d,i) {return raceXs(d.value); })
			.attr('width', function(d,i) {return raceXs(d.percentCases); })
			.attr('height', 30)
			.style('fill', function(d,i) {return catcolors3[i]; })
			.on("click", function(d) {
				updateRaceCharts(d.name);
			});


		raceBar
			.selectAll("line")
			.data(sortedRaceEndDatePercentages)
			.enter()
			.append("line")
			.attr("x1", function(d, i) { return raceXs(d.percentPopulation) + 250 + margin.left; })
			// .attr("x1", function(d, i) { return raceXs(d.projectedCases) + 350; })
			.attr("y1", function(d, i) { return raceYs(i) + 10; })
			.attr("x2", function(d, i) { return raceXs(d.percentPopulation) + 250 + margin.left; })
			// .attr("x2", function(d, i) { return raceXs(d.projectedCases) + 350; })
			.attr("y2", function(d, i) { return raceYs(i) + 40; })
			.style("stroke-width", 5)
			.style("stroke", "black")
			.style("fill", "none");

		raceBar
			.selectAll("text")
			.data(sortedRaceEndDatePercentages)
			.enter()
			.append("text")
			.attr("x", function(d, i) { return raceXs(d.percentPopulation) + 250 + margin.left + 5; })
			.attr("y", function(d, i) { return raceYs(i) + 25; })
			.attr("dy", ".35em")
			.text(function(d, i) { return d3.format(".1%")(d.percentPopulation); })

		raceBar
			.append("g")
			.attr("transform", "translate(" + (margin.left + 250) + "," + (margin.top + 325) + ")")
			.call(d3.axisBottom(raceXs).tickFormat(d3.format(".0%")));

		raceBar
			.append("text")
			.attr("transform",
			"translate(" + (width/2 + 175) + " ," +
			(height + margin.top + 10) + ")")
			.style("text-anchor", "middle")
			.text("% of COVID-19 SF Cases");

		raceBar
			.append("g")
			.style("font-size", "16px")
			.attr("transform", "translate(" + (margin.left + 250) + "," + (margin.top + 13) + ")")
			.call(d3.axisLeft(raceYs).tickFormat(i => sortedRaceEndDatePercentages[i].name));

		//   raceBar
		//   	.append("text")
		// .attr("x", width / 2 + 100)
		// .attr("y", margin.top * 2)
		// .attr("text-anchor", "middle")
		// .style("font-size", "20px")
		// .text("% COVID-19 Cases By Race / Ethnicity");

		raceBar
			.append("text")
			.attr("x", width / 2 + 200)
			.attr("y", margin.top * 4)
			.attr("text-anchor", "middle")
			.style("font-size", "16px")
			.text("| shows % of SF population");


		// raceSvg
		// 	.append("div")
		// 	.attr("class", "text-box-large race-message")
		// 	.attr("id", "race-message-1")
		//  //.attr("class", "race-message")
		// 	.append("text")
		// 	.attr("class", "text-in-box-large")
		// 	.attr("text-anchor", "middle")
		// 	.html("% COVID-19 Cases / Population By Race / Ethnicity");


		// var raceSvgDivPie = raceSvg.append("div")
		// 	.attr("id", "pie-chart-race-div")
		// 	.attr("class", "chart-race-div")
		// 	.attr("width", 1200)
		// 	.attr("height", 400);


		// var tooltippie = raceSvgDivPie
		// 	.append("div")
		// 	.attr("class", "tooltip")
		// 	.style("opacity", 0);

		//   var piechartvis = raceSvgDivPie
		//     .append("svg:svg")
		//     .attr("id", "pie-chart-race-1")
		//     .data([sortedRaceEndDatePercentages])
		//         .attr("width", 300)
		//         .attr("height", 350)
		//     .append("svg:g")
		//         .attr("transform", "translate(" + (radius + 15) + "," + radius + ")")

		// var pierace1 = d3.pie()
		//     .value(function(d) { return d.percentCases; });

		// var arcsrace1 = piechartvis.selectAll("g.slice")
		//     .data(pierace1)
		//     .enter()
		//     .append("svg:g")
		//     .attr("class", "slice");

		// arcsrace1.append("svg:path")
		//     .attr("fill", function(d, i) { return catcolors3[i]; } )
		//     .attr("d", arc)
		//     .attr("class", "pie-chart-race-path")
		//     .on("mouseover", function(d) {
		// 		tooltip.transition()
		// 			.duration(200)
		// 			.style("opacity", 0.9);
		// 		tooltip.html(d.data.name + "<br/>" +
		// 			"% SF COVID-19 Cases: " + d3.format(".1%")(d.data.percentCases) + "<br/>" +
		// 			"Total SF COVID-19 Cases: " + numberstringformat(d.data.value) + "<br/>")
		// 			.style("left", (d3.event.pageX - 250) + "px")
		// 			.style("top", (d3.event.pageY - 50) + "px")
		// 			// .style("z-index", 1000)
		// 	})
		// 	.on("mouseout", function(d) {
		// 		tooltip.transition()
		// 			.duration(500)
		// 			.style("opacity", 0);
		// 	})
		// 	.on("click", function(d) {
		// 		updateRaceCharts(d.data.name);
		// 	});


		// // Pie Chart 1 Title
		// piechartvis.append("text")
		// 	.attr("x", 0)
		// 	.attr("y", 150)
		// 	.attr("text-anchor", "middle")
		// 	.style("font-size", "20px")
		// 	.text("% COVID-19 Cases By Race");


	 // 	// Pie Chart 2
	 //    var piechartvis2 = raceSvgDivPie
		//     .append("svg:svg")
		//     .attr("id", "pie-chart-race-2")
		//     .data([sortedRaceEndDatePercentages])
		//         .attr("width", 300)
		//         .attr("height", 350)
		//     .append("svg:g")
		//         .attr("transform", "translate(" + (radius + 15) + "," + radius + ")")

		// var pierace2 = d3.pie()
		//     .value(function(d) { return d.percentPopulation; });

		// var arcsrace2 = piechartvis2.selectAll("g.slice")
		//     .data(pierace2)
		//     .enter()
		//     .append("svg:g")
		//     .attr("class", "slice");

		// arcsrace2.append("svg:path")
		//     .attr("fill", function(d, i) { return catcolors3[i]; } )
		//     .attr("d", arc)
		//     .attr("class", "pie-chart-race-path")
		//     .on("mouseover", function(d) {
		// 		tooltip.transition()
		// 			.duration(200)
		// 			.style("opacity", 0.9);
		// 		tooltip.html(d.data.name + "<br/>" +
		// 			"% SF Population: " + d3.format(".1%")(d.data.percentPopulation) + "<br/>" +
		// 			"Projected Cases By Population: " + numberstringformat(d.data.projectedCases) + "<br/>")
		// 			.style("left", (d3.event.pageX - 250) + "px")
		// 			.style("top", (d3.event.pageY - 50) + "px")
		// 	})
		// 	.on("mouseout", function(d) {
		// 		tooltip.transition()
		// 			.duration(500)
		// 			.style("opacity", 0);
		// 	})
		// 	.on("click", function(d) {
		// 		updateRaceCharts(d.data.name);
		// 	});


		// // Pie Chart 2 Title
		// piechartvis2.append("text")
		// 	.attr("x", 0)
		// 	.attr("y", 150)
		// 	.attr("text-anchor", "middle")
		// 	.style("font-size", "20px")
		// 	.text("% SF Population By Race");


		updateRaceCharts(raceClicked);

		var raceTargets = d3.selectAll(".race-rect, .race-cases-line, .pie-chart-race-path");
		raceSvg
			.on("click", function() {
				var outside = raceTargets.filter(equalToTarget).empty();
				if (outside) {
					updateRaceCharts("default");
				}
			});

		raceSvg
			.append("div")
			.attr("class", "text-box-large-source race-message")
			.attr("id", "race-message-source")
			.append("text")
			.attr("text-anchor", "middle")
			.html("Data Sources: <a href='https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Race-and-Ethnicity/vqqm-nsqg' target='_blank'>COVID-19-Cases-Summarized-by-Race-and-Ethnicity</a>" +
				" and <a href='https://www.census.gov/quickfacts/sanfranciscocountycalifornia' target='_blank'>United States Census Bureau</a>");

	}

	function removeRaceAndEthnicity() {
		raceSvg.selectAll("div").remove();
	}

	function addAge() {

		// close other windows
		raceSvg.selectAll("div").remove();
		neighborhoodSvg.selectAll("div").remove();


		var agePopup = ageSvg
			.append("div")
			.attr("class", "popup")
			.attr("id", "age-popup")
			.style("opacity", 0);


		numberOfCategories = Object.keys(ageLookupSorted).length;

		var ageGroupClicked = "default";

		updateAgeCharts = function(ageGroup) {

			ageGroupClicked = ageGroup;

			if (ageGroupClicked == "default") {

				ageLine.selectAll(".race-cases-line")
					.attr("opacity", 1);

				agePopup.transition()
					.duration(200)
					.style("opacity", 0);

			} else {

				index = sortedAgeEndDateCumulatives.findIndex(ageEntry => ageEntry.name == ageGroupClicked);

				ageLine.selectAll(".race-cases-line")
					.attr("opacity", 0.2);

				ageLine.select("#race-cases-line-" + index)
					.attr("opacity", 1);

				ageOffsetLeft = d3.select("#age-data").node().offsetLeft;
				ageOffsetTop = d3.select("#age-data").node().offsetTop;

				agePopup.transition()
					.duration(200)
					.style("background", catcolors3[index + 1])
					.style("opacity", 0.8);
				agePopup.html(ageGroupClicked.toUpperCase() + "<br/>" +
					"% of Total COVID-19 Cases: " + d3.format(".1f")((sortedAgeEndDateCumulatives[index].value / ageTotal) * 100) + "%<br/>" +
					"Number of COVID-19 Cases: " + numberstringformat(sortedAgeEndDateCumulatives[index].value) + "<br/>")
					// "% of SF Population: " + d3.format(".1f")(+raceDetailsLookup[race].percentPopulation * 100) + "%" + "<br/>" +
					// "Projected COVID-19 Cases Based on Population: " +  numberstringformat(raceDetailsLookup[race].projectedCases) + "<br/>")
					.style("color", "white")
					.style("left", ageOffsetLeft + 500 + "px")
					.style("top", ageOffsetTop + 200 + "px");
			}
		}

		// Line
		ageSvg
			.append("div")
			.attr("class", "text-box-large race-message")
			.append("text")
			.attr("class", "text-in-box-large")
			.attr("text-anchor", "middle")
			.html("Rate of Change of COVID-19 Cases Over Time By Age Group");


		var ageSvgDivLine = ageSvg.append("div")
			.attr("id", "line-chart-age-div")
			.attr("class", "chart-race-div");


		ageLine = ageSvgDivLine.append("svg")
			.attr("id", "age-line-svg")
			.attr("width", 1000)
			.attr("height", 400);

		ageLine
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		var ageLineX = d3.scaleTime()
			.domain(d3.extent(ageLookupSorted["81+"], function(d) { return new Date(d.date); }))
			.range([0, width])

		ageLine.append("g")
			.attr("transform", "translate(" + (margin.left + 70) + "," + (height + margin.top) + ")")
			.call(d3.axisBottom(ageLineX));

		var max = sortedAgeEndDateCumulatives[numberOfCategories - 1].value;
		var ageLineY = d3.scaleLog()
			.domain([1, max])
			.range([400 - margin.bottom - margin.top, 0])
			.base(10);

		ageLine.append("g")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.call(d3.axisLeft(ageLineY).tickArguments([numberOfCategories, ".4"]));


		index = 0;
		sortedAgeEndDateCumulatives.forEach(ageGroup => {

			ageLine.append("g")
				.attr("transform", "translate(" + (margin.left + 70)  + "," + margin.top + ")")
				.append("path")
				.attr("class", "race-cases-line")
				.attr("id", "race-cases-line-" + index)
				.datum(ageLookupSorted[ageGroup.name])
				.attr("fill", "none")
				.attr("stroke", catcolors3[++index])
				.attr("stroke-width", 5)
				.attr("d", d3.line()
					// .y(function(d) { return raceLineY(d.cumulativeCases); })
					.y(function(d) { cumCases = d.cumulativeCases == 0 ? 1 : d.cumulativeCases; return ageLineY(cumCases); })
					.defined(function(d) { return d.cumulativeCases; })
					.x(function(d) { return ageLineX(new Date(d.date)); })
				)
				.on("click", function(d) {
					updateAgeCharts(ageGroup.name);
				})
				.on("mouseover", function(d) {
					tooltip.transition()
						.duration(200)
						.style("opacity", 0.9);
					tooltip.html(ageGroup.name)
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY) + "px")
				})
				.on("mouseout", function(d) {
					tooltip.transition()
						.duration(500)
						.style("opacity", 0);
				});
		});

		// text label for the y axis
		ageLine.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", margin.left + 10)
			.attr("x", 0 - (height / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("Number of Cases (Log Scale)");

		// Add informational lines
		// Phase 1 Starts
		// var phaseOneStartDate = new Date("2020-03-17T00:00:00.000");
		ageLine.append("line")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x1", x(phaseOneStartDate))
			.attr("y1", 0)
			.attr("x2", x(phaseOneStartDate))
			.attr("y2", height)
			.style("stroke-width", 5)
			.style("stroke", "#ff7f0e")
			.style("fill", "none")
			.style("stroke-dasharray", ("3, 3"));


		ageLine.append("text")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x", x(phaseOneStartDate) - 50)
			.attr("y", height - margin.top * 30)
			// .text("Phase 1: " + d3.timeFormat("%b %d")(phaseOneStartDate));
			.text("Phase 1 Begins")

		// Phase 2 Starts
		// var phaseTwoStartDate = new Date("2020-06-01T00:00:00.000");
		ageLine.append("line")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x1", x(phaseTwoStartDate))
			.attr("y1", 0)
			.attr("x2", x(phaseTwoStartDate))
			.attr("y2", height)
			.style("stroke-width", 5)
			.style("stroke", "#ff7f0e")
			.style("fill", "none")
			.style("stroke-dasharray", ("3, 3"));

		ageLine.append("text")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x", x(phaseTwoStartDate) - 50)
			.attr("y", height - margin.top * 8)
			// .text("Phase 2: " + d3.timeFormat("%b %d")(phaseTwoStartDate));
			.text("Phase 2 Begins")

		// Phase 2b Starts
		// var phaseTwoBStartDate = new Date("2020-06-15T00:00:00.000");
		ageLine.append("line")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x1", x(phaseTwoBStartDate))
			.attr("y1", 0)
			.attr("x2", x(phaseTwoBStartDate))
			.attr("y2", height)
			.style("stroke-width", 5)
			.style("stroke", "#ff7f0e")
			.style("fill", "none")
			.style("stroke-dasharray", ("3, 3"));

		ageLine.append("text")
			.attr("transform", "translate(" + (margin.left + 70) + "," + margin.top + ")")
			.attr("x", x(phaseTwoBStartDate) - 50)
			.attr("y", height - margin.top * 4)
			// .text("Phase 2b: " + d3.timeFormat("%b %d")(phaseTwoBStartDate));
			.text("Phase 2b Begins")


		ageSvg
		.append("div")
		.attr("class", "text-box-large")
		.attr("id", "age-message-1")
		.append("text")
		.attr("class", "text-in-box-large")
		.attr("text-anchor", "middle")
		.html("% COVID-19 Cases By Age Group<br/>Click On a Bar or Line to See Details");

		var ageSvgDiv = ageSvg.append("div")
			.attr("class", "chart-race-div");

		ageBar = ageSvgDiv.append("svg")
			.attr("id", "age-data-svg")
			.attr("width", 1200)
			.attr("height", 300);


		// X - from 0 to the max value
		// ageXDomain = [0, d3.max(ageEndDateCumulatives, d => d.value)];
		ageXDomain = [0, d3.max(ageEndDateCumulatives, d => (d.value / ageTotal))];
		ageXs = d3.scaleLinear()
			.domain(ageXDomain)
			.range([0, 600]);

		// Y - the range from 0 to the lenth of the array (number of age groups)
		ageYDomain = d3.range(ageEndDateCumulatives.length);
		ageYs = d3.scaleLinear()
			.domain(ageYDomain)
			.range([10, 45]);

		ageBar.append("g")
		  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
		  .attr("id", "age-rects")
		  .style("margin", "20px")
		  .selectAll('rect')
		  .data(sortedAgeEndDateCumulatives)
		  .enter()
		  .append('rect')
		    .attr("class", "age-rect")
		    .attr('x', 350)
		    .attr('y', function(d, i) { return ageYs(i); })
		    .attr('width', function(d, i) { return ageXs((d.value / ageTotal)); })
		    .attr('height', 30)
		    .style('fill', function(d, i) { return catcolors3[i + 1]; })
			.on("click", function(d) {
				updateAgeCharts(d.name);
			})
			.on("mouseover", function(d) {
				tooltip.transition()
					.duration(200)
					.style("opacity", 0.9);
				tooltip.html(d.name + "<br/>" +
					"Age Group Cases: " + numberstringformat(d.value) + "<br/>")
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY) + "px")
			})
			.on("mouseout", function(d) {
				tooltip.transition()
					.duration(500)
					.style("opacity", 0);
			});


		ageBar.selectAll("text")
			.data(sortedAgeEndDateCumulatives)
			.enter()
		    .append("text")
		    .attr("x", function(d) { return ageXs((d.value / ageTotal)) + 350 + margin.left; })
			.attr("y", function(d, i) { return ageYs(i) + 25; })
			.attr("dy", ".35em")
		    .text(function(d, i) { return d3.format(".1%")(sortedAgeEndDateCumulatives[i].value / ageTotal); })

		ageBar.append("g")
			.attr("transform", "translate(" + (margin.left + 350) + "," + (margin.top + 300) + ")")
	      	.call(d3.axisBottom(ageXs));

		ageBar.append("g")
			.style("font-size", "16px")
			.attr("transform", "translate(" + (margin.left + 350) + "," + (margin.top + 13) + ")")
			.call(d3.axisLeft(ageYs).tickFormat(function(i) {
				return sortedAgeEndDateCumulatives[i].name;
			}).ticks(sortedAgeEndDateCumulatives.length));

	   ageBar.append("text")
			.attr("x", width / 2 + 350)
			.attr("y", margin.top * 2)
			.attr("text-anchor", "middle")
			.style("font-size", "20px")
			.text("% Of Cases By Age Group");

		updateAgeCharts(ageGroupClicked);

		var ageTargets = d3.selectAll(".age-rect, .race-cases-line");
		ageSvg
			.on("click", function() {
				var outside = ageTargets.filter(equalToTarget).empty();
				if (outside) {
					console.log("outside");
					updateAgeCharts("default");
				}
			});

		ageSvg
			.append("div")
			.attr("class", "text-box-large-source")
			.attr("id", "age-message-source")
			.append("text")
			// .attr("class", "text-in-box-large-source")
			.attr("text-anchor", "middle")
			.html("Note that there is no SF population data for age divided in these buckets.<br/>Data Source: <a href='https://data.sfgov.org/COVID-19/COVID-19-Cases-Summarized-by-Age-Group/sunc-2t3k' target='_blank'>COVID-19-Cases-Summarized-by-Age-Group</a>");

	}

	function removeAge() {
		ageSvg.selectAll("div").remove();
	}

	function addNeighborhoods() {

		// close other windows
		raceSvg.selectAll("div").remove();
		ageSvg.selectAll("div").remove();

		var hoodPopup = neighborhoodSvg
			.append("div")
			.attr("class", "popup")
			.attr("id", "age-popup")
			.style("opacity", 0);


		var dropdownOptions = Object.keys(geoZCTADataMap).sort();
		var initialOption = dropdownOptions[0];
		var initialData = geoZCTADataMap[initialOption];
		var numberOfNeighborhoods = initialData.length;
		optionString = "";

		var updateChart = function(newOption) {

			hoodPopup.style("opacity", 0);

			newData = geoZCTADataMap[newOption];
			optionString = newOption[0].toUpperCase() + newOption.slice(1, newOption.length);

				// X - the range from 0 to the length of the array (cases per neighborhood)
			// hoodXDomain = [0, newData[newData.length - 1].value];

			// newDataSorted = newData.sort(function(a, b) { return a.percentOfPopulation > b.percentOfPopulation ? 1 : -1; });
			newDataSorted = newData.sort(function(a, b) { return a.percentOfValue > b.percentOfValue ? 1 : -1; });

			// hoodXDomain = [0, newDataSorted[newDataSorted.length - 1].percentOfPopulation];
			hoodXDomain = [0, newDataSorted[newDataSorted.length - 1].percentOfValue];
			hoodXs = d3.scaleLinear()
				.domain(hoodXDomain)
				.range([0, 600]);


			d3.selectAll("#neighborhood-data-svg").remove();
			neighborhoodSvg.select("#hood-message-source").remove();

			hoodSvgDiv = neighborhoodSvg.append("div")
				.attr("class", "chart-race-div");

			hoodSvgDiv.append("svg")
				.attr("id", "neighborhood-data-svg")
				.attr("width", 1200)
				.attr("height", 800);


			var hoodData = d3.select("#neighborhood-data-svg")
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
				.attr("id", "hood-data-changing");

			hoodData
				.attr("id", "hood-rects")
				.style("margin", "20px")
				.selectAll('rect')
				.data(newDataSorted)
				.enter()
				.append('rect')
				.attr('x', 350)
				.attr('y', function(d, i) { return hoodYs(i) + 10; })
				// .attr('width', function(d, i) { return hoodXs(d.value); })
				// .attr('width', function(d, i) { return hoodXs(d.percentOfPopulation); })
				.attr('width', function(d, i) { return hoodXs(d.percentOfValue); })
				.attr('height', 30)
				.style('fill', function(d, i) { return catcolors3[(i+8)%10]; })
				.on("click", function(d, i) {
					hoodOffsetLeft = d3.select("#neighborhood-data").node().offsetLeft;
					hoodOffsetTop = d3.select("#neighborhood-data").node().offsetTop;

					hoodPopup.transition()
						.duration(200)
						.style("background", catcolors3[(i+8)%10])
						.style("opacity", 0.8);
					hoodPopup.html(d.name.toUpperCase() + "<br/>" +
						"Total Neighborhood " + optionString + ": " + numberstringformat(d.value) + "<br/>" +
						"Neighborhood Population: " + numberstringformat(d.population) + "<br/>" +
						"% Cases of Total SF " + optionString + ": " + d3.format(".1%")(d.value / (newOption == "cases" ? totalCases : totalDeaths)) + "<br/>")
						.style("color", "white")
						.style("left", hoodOffsetLeft + 1000 + "px")
						.style("top", hoodOffsetTop + 400 + "px");

				})
				.on("mouseover", function(d) {
					tooltip.transition()
						.duration(200)
						.style("opacity", 0.9);
					tooltip.html(d.name + "<br/>" +
						"Total Neighborhood " + optionString + ": " + numberstringformat(d.value) + "<br/>" +
						"Neighborhood Population: " + numberstringformat(d.population) + "<br/>" +
						"% Cases of Total SF " + optionString + ": " + d3.format(".1%")(d.value / (newOption == "cases" ? totalCases : totalDeaths)) + "<br/>")
						.style("left", (d3.event.pageX) + "px")
						.style("top", (d3.event.pageY - 28) + "px")
				})
				.on("mouseout", function(d) {
					tooltip.transition()
						.duration(500)
						.style("opacity", 0);
				});


			hoodData
				.selectAll("line")
				.data(newDataSorted)
				.enter()
				.append("line")
				.attr("x1", function(d, i) { return hoodXs(d.neighborhoodPercentOfPopulation) + 250 + margin.left; })
				.attr("y1", function(d, i) { return hoodYs(i) + 10; })
				.attr("x2", function(d, i) { return hoodXs(d.neighborhoodPercentOfPopulation) + 250 + margin.left; })
				.attr("y2", function(d, i) { return hoodYs(i) + 40; })
				.style("stroke-width", 5)
				.style("stroke", "black")
				.style("fill", "none");

			hoodData
				.selectAll("text")
				.data(newDataSorted)
				.enter()
				.append("text")
				.attr("x", function(d, i) { return hoodXs(d.neighborhoodPercentOfPopulation) + 250 + margin.left + 5; })
				.attr("y", function(d, i) { return hoodYs(i) + 25; })
				.attr("dy", ".35em")
				.text(function(d, i) { return d3.format(".1%")(d.neighborhoodPercentOfPopulation); })

			hoodData
				.append("g")
				.attr("transform", "translate(" + (margin.left + 290) + "," + (margin.top + 750) + ")")
				.call(d3.axisBottom(hoodXs).tickFormat(
					newOption == "cases" ? d3.format(".1%") : d3.format(".3%")
				));

			hoodData
				.append("g")
				.style("font-size", "16px")
				.attr("transform", "translate(" + (margin.left + 290) + "," + (margin.top + 13) + ")")
				.call(d3.axisLeft(hoodYs).tickFormat(function(i) {
					return newDataSorted[i].name;
				}).ticks(newDataSorted.length));


			hoodData
				.append("text")
				.attr("x", width / 2 + 200)
				.attr("y", margin.top * 4)
				.attr("text-anchor", "middle")
				.style("font-size", "16px")
				.text("| shows % of SF population");


			hoodData
				.append("text")
				.attr("x", width / 2 + 150)
				.attr("y", margin.top / 2)
				.attr("text-anchor", "middle")
				.style("font-size", "20px")
				.text("% of COVID-19 " + optionString + " By Neighborhood");

			neighborhoodSvg
				.append("div")
				.attr("class", "text-box-large-source")
				.attr("id", "hood-message-source")
				.append("text")
				// .attr("class", "text-in-box-large-source")
				.attr("text-anchor", "middle")
				.html("Data Source: <a href='https://data.sfgov.org/COVID-19/COVID-19-Cases-and-Deaths-Summarized-by-Geography/tpyr-dvnc' target='_blank'>COVID-19-Cases-and-Deaths-Summarized-by-Geography</a>");

		}

		var dropdownChange = function() {
			newOption = d3.select(this).property('value');
			updateChart(newOption);
		}

		neighborhoodSvg
			.append("div")
			.attr("class", "text-box-large")
			.attr("id", "hood-message-1")
			.append("text")
			.attr("class", "text-in-box-large")
			.attr("text-anchor", "middle")
			.html("Use the Dropdown To Explore % of COVID-19 Cases or Deaths By Neighborhood");


		var dropdown = neighborhoodSvg
			.append("div")
			.attr("class", "dropdown")
			.insert("select", "svg")
			.attr("id", "neighborhood-dropdown")
			.on("change", dropdownChange);

		dropdown.selectAll("option")
			.data(dropdownOptions)
			.enter()
			.append("option")
			.attr("value", function(d) { return d; })
			.text(function(d) { return "Explore Data By COVID-19 " + d[0].toUpperCase() + d.slice(1,d.length); });


		// Y - from 0 to the max value
		hoodYDomain = d3.range(numberOfNeighborhoods);
		hoodYs = d3.scaleLinear()
			.domain(hoodYDomain)
			.range([10, 45]);

		updateChart(initialOption);

		var hoodTargets = d3.selectAll(".hood-rect");
		neighborhoodSvg
			.on("click", function() {
				var outside = hoodTargets.filter(equalToTarget).empty();
				if (outside) {
					hoodPopup.style("opacity", 0);
				}
			});

	}

	function removeNeighborhoods() {
		neighborhoodSvg.selectAll("div").remove();
	}

	function addTesting() {
		testingSvg.append("svg")
			.attr("id", "test-data-svg")
			.attr("width", 300)
			.attr("height", 300);
	}

	function removeTesting() {
		testingSvg.select("#test-data-svg").remove();
	}

}
