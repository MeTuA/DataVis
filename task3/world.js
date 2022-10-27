
function clean(){
    console.log("clearing")
    d3.selectAll('svg').remove();
    generateOnlyAxes()
}

function generateOnlyAxes(){
    var dimension = {
        width_box: window.innerWidth*0.9,
        height_box: window.innerHeight*0.8,
        width_plot: window.innerWidth*0.7,
        height_plot: window.innerHeight*0.55,
        nodePadding: 5,
        margin: {
            top: 25,
            left: 25,
            bottom: 25,
            right: 25
        }
    }

    console.log("windows:",window.innerWidth*0.9, window.innerHeight*0.8, window.innerWidth*0.7, window.innerHeight*0.15)

    dimension.boundedWidth = dimension.width_box - dimension.margin.left - dimension.margin.right;
    dimension.boundedHeight = dimension.height_box - dimension.margin.top - dimension.margin.bottom;
    dimension.boundedPlotWidth = dimension.width_plot - dimension.margin.left - dimension.margin.right;
    dimension.boundedPlotHeight = dimension.height_plot - dimension.margin.top - dimension.margin.bottom;

    const plot = d3.select("#plot2").append("svg");
    plot.attr("width", dimension.width_plot );
    plot.attr("height", dimension.height_plot);
    
    // bounding borders
    const boundedPlot = plot.append("g");
    boundedPlot.style("transform", `translate(${dimension.margin.left}px, ${dimension.margin.top}px)`);

    // creating scalers
    const yScaler = d3.scaleLinear()
    .domain([0, dimension.boundedPlotHeight])
    .range([dimension.boundedPlotHeight, 0]);

    const xScaler = d3.scaleLinear()
    .domain([0, 100])
    .range([0, dimension.boundedPlotWidth]);

    // creating axis generators
    const yAxisGenerator = d3.axisLeft().scale(yScaler);
    const xAxisGenerator = d3.axisBottom().scale(xScaler);

    boundedPlot.append("g").call(yAxisGenerator);
    boundedPlot.append("g").call(xAxisGenerator).style("transform",`translateY(${dimension.boundedPlotHeight}px)`);

}

function generate() {
    d3.selectAll('svg').remove();
    console.log('starting to generate');

    let data = [];

    var dimension = {
        width_box: window.innerWidth*0.9,
        height_box: window.innerHeight*0.8,
        width_plot: window.innerWidth*0.7,
        height_plot: window.innerHeight*0.55,
        nodePadding: 5,
        margin: {
            top: 25,
            left: 25,
            bottom: 25,
            right: 25
        }
    }

    dimension.boundedWidth = dimension.width_box - dimension.margin.left - dimension.margin.right;
    dimension.boundedHeight = dimension.height_box - dimension.margin.top - dimension.margin.bottom;
    dimension.boundedPlotWidth = dimension.width_plot - dimension.margin.left - dimension.margin.right;
    dimension.boundedPlotHeight = dimension.height_plot - dimension.margin.top - dimension.margin.bottom;

    // setting data
    for(let i = 0; i < 100; i++) {
        console.log("pushing")
        var RandomInt = (max) => Math.floor(Math.random() * max);

        if (i%2 == 0){
            data.push({
                shape: "rect",
                x:Math.random()*dimension.boundedPlotWidth,
                y:Math.random()*dimension.boundedPlotHeight,
                color: "red"
            })
        }else{
            data.push({
                shape: "circle",
                x:Math.random()*dimension.boundedPlotWidth,
                y:Math.random()*dimension.boundedPlotHeight,
                color: "blue"
            })
        }
        
    }

    // selection plot
    const plot = d3.select("#plot2").append("svg");
    plot.attr("width", dimension.width_plot);
    plot.attr("height", dimension.height_plot);
    
    // bounding borders
    const boundedPlot = plot.append("g");
    boundedPlot.style("transform", `translate(${dimension.margin.left}px, ${dimension.margin.top}px)`);

    // creating scalers
    const yScaler = d3.scaleLinear()
    .domain([0, dimension.boundedPlotHeight])
    .range([dimension.boundedPlotHeight, 0]);

    const xScaler = d3.scaleLinear()
    .domain([0, 100])
    .range([0, dimension.boundedPlotWidth]);

    // creating axis generators
    const yAxisGenerator = d3.axisLeft().scale(yScaler);
    const xAxisGenerator = d3.axisBottom().scale(xScaler);

    boundedPlot.append("g").call(yAxisGenerator);
    boundedPlot.append("g").call(xAxisGenerator).style("transform",`translateY(${dimension.boundedPlotHeight}px)`);

    console.log("data length", data.length)
    for(i = 0; i < data.length; i++){
        console.log("data.shape: ", data[i].shape )
        if (data[i].shape == "rect"){
            boundedPlot
            .append("rect")
            .attr("x", ()=>{
              
                if((data[i].x > dimension.boundedPlotWidth)) {
                    data[i].x = data[i].x - dimension.boundedPlotWidth;
                }
                return data[i].x;
                    
            })
            .attr("y", ()=>{
              
                if((data[i].y > dimension.boundedPlotHeight)) {
                    data[i].y = data[i].x - dimension.boundedPlotHeight;
                }
                return data[i].y;
                    
            })
            .attr("width", 8)
            .attr("height", 8)
            .attr("fill", data[i].color)
            .style('transform','rotate(45deg)'); 
        }else{
            boundedPlot
            .append(data[i].shape)
            .attr('r', 4)
            .attr('cx', ()=>{
              
                if((data[i].x > dimension.boundedPlotWidth)) {
                    data[i].x = data[i].x - dimension.boundedPlotWidth;
                }
                return data[i].x;
                    
            })
            .attr('cy', ()=>{
              
                if((data[i].y > dimension.boundedPlotHeight)) {
                    data[i].y = data[i].x - dimension.boundedPlotHeight;
                }
                return data[i].y;
                    
            })
            .attr("fill",data[i].color);
        }
    }
}



generate()
