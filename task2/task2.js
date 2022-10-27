function selector(temperature){
    if (temperature == 'temperatureMax'){
        return function(d) {return d.temperatureMax}
    }
    if (temperature == 'temperatureMin'){
        return function(d) {return d.temperatureMin}
    }
    if (temperature == 'temperatureHigh'){
        return function(d) {return d.temperatureHigh}
    }
    if (temperature == 'temperatureLow'){
        return function(d) {return d.temperatureLow}
    }else{
        return function(d) {return d.temperatureLow}
    }
}


function clean(){
    console.log("clearing")
    d3.selectAll('svg').remove();
    //drawHist("temperatureLow")
}
async function drawHist(temperature) {
    const data = await d3.json('./my_weather_data.json')

    dataset = data.slice(0, 101)
    console.log(dataset)

    let dimensions = {
        width: window.innerWidth*0.9,
        height: 400,
        margin: {
            top: 15,
            right: 15,
            bottom:40,
            left:60,
        },
    }

    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    const wrapper = d3.select("#histogram");
    wrapper.selectAll("svg").remove();
    const svg = wrapper.append("svg");
    svg.attr("width",dimensions.width);
    svg.attr("height", dimensions.height);

    const bounds = svg.append("g").style("transform",`translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);

    let x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, dimensions.boundedWidth])

    bounds.append("g")
    .attr("transform", "translate(0, " + dimensions.boundedHeight + ")")
    .call(d3.axisBottom(x))

    let histogram = d3.histogram()
    .value(selector(temperature))
    .domain(x.domain())
    .thresholds(x.ticks(70))

    let bins = histogram(dataset)

    let y = d3.scaleLinear()
    .range([dimensions.boundedHeight, 0])
    .domain([0, d3.max(bins, function(d){return d.length})])

    bounds.append("g")
    .call(d3.axisLeft(y))

    bounds.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", 1)
    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
    .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
    .attr("height", function(d) { return dimensions.boundedHeight - y(d.length); })
    .style("fill", "#69b3a2")
    
}

drawHist()