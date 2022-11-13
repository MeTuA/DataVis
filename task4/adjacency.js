async function build() {
    console.log("Hello world");
    // var nodes = await d3.csv("nodelist.csv");
    // var edges = await d3.csv("edgelist.csv");
    var gotData = await d3.csv("ИсходникМатрицы.csv");

    var COMPANIES = []
    var PROJECTS = []

    var UNIQUE_PROJECTS = new Set();

    // function adjacencyMatrix(nodes, edges) {
    //     var matrix = [];
    //     var edgeHash = {};
    //     edges.forEach(edge => {
    //         var id = edge.source+"-"+edge.target;
    //         console.log("id: ", id)
    //         edgeHash[id] = edge;
    //         console.log("edge: ", edge)
    //     })
    //     for(let i=0; i<nodes.length; i++) {
    //         for(let j=0; j<nodes.length; j++) {
    //             var uel = nodes[i];
    //             var bel = nodes[j];

    //             console.log("nodes: ", nodes[i], nodes[j])
    //             var grid = {
    //                 id: uel.id+"-"+bel.id,
    //                 x:j,
    //                 y:i,
    //                 weight:0
    //             }
    //             if(edgeHash[grid.id]) {
    //                 grid.weight = edgeHash[grid.id].weight;
    //             }
    //             matrix.push(grid);

    //         }
    //     }
    //     return matrix;
    // }

    function adjacencyMatrix2() {
        var matrix = [];
        var edgeHash = {};

        gotData.forEach(shut => {
            var org = shut.Organisation
            console.log("org: ", org)

            COMPANIES.push({
                id: org
            })

            var ent = Object.entries(shut);
            ent.map(([key, val] = shush) => {
                if (key == "Organisation"){key = val; val = "0"}
                if (val == ""){val = "0"}
                console.log("id is: ", org + "-" + key, "wght: ", val);
                if (org == key){return}
                var id = org + "-" + key

                UNIQUE_PROJECTS.add(key)

                var newObj = {
                    source: org,
                    target: key,
                    weight: val
                };

                edgeHash[id] = newObj;
            })   
        })

        // добавление в массив проектов с сета проектов
        UNIQUE_PROJECTS.forEach( sh => {
            PROJECTS.push({
                id: sh
            })
        })

        console.log("PROJECTS: ", PROJECTS);

        for(let i=0; i<COMPANIES.length; i++) {
            for(let j=0; j<PROJECTS.length; j++) {
                var uel = COMPANIES[i];
                var bel = PROJECTS[j];
                // console.log("gotData: ", gotData[i], gotData[j])
                var grid = {
                    id: uel.id+"-"+bel.id,
                    x:j,
                    y:i,
                    weight: ""
                }
                if(edgeHash[grid.id]) {
                    grid.weight = edgeHash[grid.id].weight;
                }

                console.log("grid: ", grid)
                matrix.push(grid);

            }
        }

        console.log("matrix: ", matrix)
        return matrix;
    }

    var dimension = {
        width: window.innerWidth*0.9,
        height: window.innerWidth*0.9,
        margin: {
            top: 278,
            right: 10,
            bottom: 10,
            left: 405
        }
    }

    dimension.boundedWidth = dimension.width
        - dimension.margin.right
        - dimension.margin.left;

    dimension.boundedHeight = dimension.height
        - dimension.margin.top
        - dimension.margin.bottom;

    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimension.width)
        .attr("height", dimension.height)

    const bounds = wrapper.append("g")
        .style("transform",`translate(${dimension.margin.left}px,${dimension.margin.top}px)`);
    var data = adjacencyMatrix2();

    const pole = bounds
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","grid")
        .attr("width",25)
        .attr("height",25)
        .attr("x", d=>d.x*25)
        .attr("y", d=>d.y*25)
        .style("fill-opacity", d=>d.weight*0.4)

    const namesX = wrapper
        .append("g")
        .attr("transform","translate(410,275)")
        .selectAll("text")
        .data(PROJECTS)
        .enter()
        .append("text")
        .attr("y",(d,i)=> i*25+13.5)
        .text(d=>d.id)
        .style("text-anchor","start")
        .attr("transform", "rotate(270)");

    const namesY = wrapper
        .append("g")
        .attr("transform","translate(400,280)")
        .selectAll("text")
        .data(COMPANIES)
        .enter()
        .append("text")
        .attr("y",(d,i)=> i*25+12.5)
        .text(d=>d.id)
        .style("text-anchor","end");

}

build();