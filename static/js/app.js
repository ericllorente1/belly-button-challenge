const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
let sampleData ;  

// // use d3 to fetch datat from URL
d3.json(url).then(function(data){
    sampleData = data;
    console.log("2", sampleData);
    //create array to make option html elements and append it
    let idArray = sampleData.names;
    for (i=0; i < idArray.length; i++ ){
        let id = idArray[i];
        d3.select("#selDataset").append("option").text(`${id}`)
    };
    optionChanged(idArray[0]);
});


function optionChanged(id){
    createBarChart(id);
    createBubbleChart(id); 
    displayDemographicInfo(id);
};


// // create a function to build a bar chart depending on the otu id 
function createBarChart(otuId){
    // store all data in a variable 
    let objectsArray = sampleData.samples;
    //filter the list to find object based on otu id
    let sampleObject = objectsArray.filter(object => object.id == otuId);
    // access the array of object that the filter return by indexing 0
    let objectInfo = sampleObject[0];
    // assign plot values to create plot 
    let xValues = objectInfo.sample_values.slice(0,10);
    let yValues = objectInfo.otu_ids.slice(0,10);
    let labels = objectInfo.otu_labels.slice(0,10);
    let trace = {
        x: xValues.reverse(),
        y: yValues.map(id => `OTU ${id}`).reverse(),
        text: labels.reverse(),
        type: "bar",
        orientation: "h"
    };
    let data1 = [trace];
    Plotly.react("bar", data1); 
};

// create a bubble chart that displays each sample
function createBubbleChart(otuId){
    // get object to plot
    let sample = sampleData.samples.filter(object => object.id == otuId)[0];
    // assign plot variables 
    let xAxis = sample.otu_ids;
    let yAxis = sample.sample_values;
    let sample_labels = sample.otu_labels;
    // create trace for bubble plot
    let trace2 = {
        x: xAxis,
        y: yAxis,
        text: sample_labels, 
        mode: "markers",
        marker: {
            color: xAxis,
            size: yAxis
        }
    };

    // create a layout to personalize plot
    let bubbleLayout = {
        title: "Bubble Chart",
        automargin: true,
        autosize: true
    };

    let data2 = [trace2];
    Plotly.react("bubble", data2, bubbleLayout);
};


// create function for metadata chart

function displayDemographicInfo(otuId){

    //extract metadata object
    let dataObject = sampleData.metadata.filter(object => object.id == otuId)[0];
    d3.select("#sample-metadata").html("")
    d3.select("#sample-metadata").append("p").text(`id:  ${dataObject.id}`);
    d3.select("#sample-metadata").append("p").text(`ethnicity:  ${dataObject.ethnicity}`);
    d3.select("#sample-metadata").append("p").text(`gender:  ${dataObject.gender}`);
    d3.select("#sample-metadata").append("p").text(`age:  ${dataObject.age}`);
    d3.select("#sample-metadata").append("p").text(`location:  ${dataObject.location}`);
    d3.select("#sample-metadata").append("p").text(`bbtype:  ${dataObject.bbtype}`);
    d3.select("#sample-metadata").append("p").text(`wfreq:  ${dataObject.wfreq}`);

};



















































// d3.json(url).then(function(objectResponse) {
//     console.log(objectResponse);
//     let sample = objectResponse.map();
//     console.log(sample);
//     let objectsSorted = objectResponse.samples.sort((a,b)=> a.sample_values - b.sample_values);
//     console.log(objectsSorted);
//     let values = objectResponse.samples[0].sample_values
//     console.log(values);
//     let labels = objectResponse.samples[0].otu_ids
//     console.log(labels);
//     let hoverText = objectResponse.samples[0].otu_labels.slice(0,10);
//     console.log(hoverText);
//     let data = [{
//         x: labels,
//         y: values,
        
//     }]
// });



// function init(){
//     // create a dropdown menu and use the select element id 
//     let dropdownMenu = d3.select("#selDataset");

//     // get data for 

//     data = [{
//         x: sample.sample_values.slice(0,10),
//         y: sample.otu_ids.slice(0,10),
//         type: "bar",
//         orientation: "h",

//     }];
//     Plotly.newPlot("bar", data)
// };

// init()
// // function init() {
//     let data = [{
//             x: australia,
//             y: sample_values,
//             labels: 
//             type: "bar"
//         }];
    
//         Plotly.newPlot("pie", data)
//     };
    
//     init()
//     // Step 2: create getData() that is called by DOM changes
//     // Function is stubbed out below
//     function getData() {
//         // This is the element that called this function
//         let dropdownMenu = d3.select(this);
    
//         // This function will assign the value of the dropdown menu option to a variable
//         let dataset = dropdownMenu.property("value");
    
//         // Initialize an empty array for the country's data
//         let data = [];
    
//         // Step 3: Add condiitonal logic to detemrine which data to add to data array.
        
    
//         // Step 4: update the chart with plotl