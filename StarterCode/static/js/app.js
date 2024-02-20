// Use D3 to fetch the JSON data
d3.json("samples.json").then(data => {
    // Access the first elements of the arrays
    var Sample = data;
    console.log(Sample);
    
  }).catch(error => {
    // Log any errors if the data couldn't be loaded
    console.log(error);
  });
  
  // Function to populate the dropdown with names from samples.json
  function populateDropdown() {
    // Select the dropdown element
    var dropdown = d3.select("#selDataset");
  
    // Fetch data from samples.json file
    d3.json("samples.json").then(data => {
      // Get the names array from the data
      var names = data.names;
  
      // Append an option element for each name in the dropdown
      names.map(name => {
        dropdown.append("option")
          .text(name) // Use the name as the text of the option
          .attr("value", name); // Use the name as the value of the option
      });
       
    }).catch(error => {
      console.log(error);
    });
  }
  
  // Call the function to populate the dropdown with names
  populateDropdown();
  
  function optionChanged(selectedID) {
    // Call the function to update the charts based on the selected ID
    selectTopOTUs(selectedID);
    
  }
  
  
  function selectTopOTUs(selectedID) {
    // Fetch data from samples.json file
    d3.json("samples.json").then(data => {
        // Find data of the selected individual
        var selectedData = data.samples.find(sample => sample.id == selectedID);
      
        // Get OTUs data
        var otusData = {
            values: selectedData.sample_values.slice(0, 10),
            labels: selectedData.otu_ids.slice(0, 10).map(id => `OTU ${id}`),
            hovertext: selectedData.otu_labels.slice(0, 10)
        };
  
        // Get OTUs data2
        var otusData2 = {
            values: selectedData.sample_values,
            labels: selectedData.otu_ids,
            text: selectedData.otu_labels
        };
      
        // Update the bar chart with the selected OTUs data
        updateBarChart(otusData);
        createBubbleChart(otusData2);
        displayMetadata(selectedID);
        createDashboard(selectedID);
    
    }).catch(error => {
        console.log(error);
    });
  }
  
  
  function updateBarChart(otusData) {
    // Define trace for the bar chart
    var trace = {
        x: otusData.values.slice().sort((a, b) => a - b),
        y: otusData.labels.slice().sort((a, b) => a - b),
        text: otusData.hovertext,
        type: "bar",
        orientation: "h"
    };
  
    // Define data array
    var data = [trace];
  
    // Define layout for the bar chart
    var layout = {
        title: "<b style='font-size: 24px'>Top 10 OTUs Bar Chart</b>",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
    };
  
    // Update the bar chart with new data and layout
    Plotly.newPlot("bar", data, layout);
  }
  
  
  
  function displayMetadata(selectedID) {
    // Fetch metadata from samples.json file
    d3.json("samples.json").then(data => {
        // Find metadata of the selected individual
        var metadata = data.metadata.find(item => item.id == selectedID);
      
        // Select the element where you want to display the metadata
        var metadataDiv = d3.select("#sample-metadata");
  
        // Clear previous metadata
        metadataDiv.html("");
  
        // Iterate over each key-value pair in the metadata object and append them to the HTML
        Object.entries(metadata).forEach(([key, value]) => {
            metadataDiv.append("p").text(`${key}: ${value}`);
        });
    }).catch(error => {
        console.log(error);
    });
  }

  

function createBubbleChart(otusData2) {
    // Define trace for the bubble chart
    var trace = {
        x: otusData2.labels,
        y: otusData2.values,
        text: otusData2.text,
        mode: 'markers',
        marker: {
            size: otusData2.values,
            color: otusData2.labels,
            colorscale: 'Jet',
            opacity: 0.7
        }
    };
  
    // Define data array
    var data = [trace];
  
    // Define layout for the bubble chart
    var layout = {
        title: "<b style='font-size: 24px'>Bubble Chart</b>",
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' }
    };
  
    // Plot the bubble chart
    Plotly.newPlot('bubble', data, layout);
  }

  
function createDashboard(selectedID) {
    
    // Fetch data from samples.json file
    d3.json("samples.json").then(data => {
        // Extract BBWF data from metadata
        var metadata = data.metadata.find(item => item.id == selectedID);
        var wfreq = metadata.wfreq;

    //     // Set the value attribute of the gauge chart using the wfreq variable
    //     var data = [
    //         {
    //             domain: { x: [0, 1], y: [0, 1] },
    //             value: wfreq, // Weekly washing frequency
    //             title: { 
    //                 text: "<b style='font-size: 24px'>Belly Button Washing Frequency</b><br><span style='font-size: 12px'>Scrubs per Week</span>",
                   
    //             },
    //             type: "indicator",
    //             mode: "gauge+number",
    //             gauge: {
    //                 axis: { range: [null, 9] }, // Range of weekly washing frequency is from 0 to 9
    //                 steps: [
    //                     { range: [0, 1], color: "rgba(255, 255, 255, 0)" },
    //                     { range: [1, 2], color: "rgba(232, 226, 202, .5)" },
    //                     { range: [2, 3], color: "rgba(210, 206, 145, .5)" },
    //                     { range: [3, 4], color: "rgba(202, 209, 95, .5)" },
    //                     { range: [4, 5], color: "rgba(170, 202, 42, .5)" },
    //                     { range: [5, 6], color: "rgba(110, 154, 22, .5)" },
    //                     { range: [6, 7], color: "rgba(14, 127, 0, .5)" },
    //                     { range: [7, 8], color: "rgba(0, 105, 11, .5)" },
    //                     { range: [8, 9], color: "rgba(0, 70, 0, .5)" }
    //                 ],
    //                 threshold: {
    //                     line: { color: "red", width: 4 },
    //                     thickness: 0.75,
    //                     value: 9 // If greater than this value, display in red
    //                 }
    //             }
    //         }
    //     ];

    //     // Layout settings
    //     var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

    //     // Plot the gauge chart
    //     Plotly.newPlot('gauge', data, layout);

    // }).catch(error => {
    //     console.log(error);
    // });
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq, // Weekly washing frequency
            title: { 
                text: "<b style='font-size: 24px'>Belly Button Washing Frequency</b><br><span style='font-size: 12px'>Scrubs per Week</span>",
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [null, 9] }, // Range of weekly washing frequency is from 0 to 9
                steps: [
                    { range: [0, 1], color: "rgba(255, 255, 255, 0)", text: "0-1" },
                    { range: [1, 2], color: "rgba(232, 226, 202, .5)", text: "1-2" },
                    { range: [2, 3], color: "rgba(210, 206, 145, .5)", text: "2-3" },
                    { range: [3, 4], color: "rgba(202, 209, 95, .5)", text: "3-4" },
                    { range: [4, 5], color: "rgba(170, 202, 42, .5)", text: "4-5" },
                    { range: [5, 6], color: "rgba(110, 154, 22, .5)", text: "5-6" },
                    { range: [6, 7], color: "rgba(14, 127, 0, .5)", text: "6-7" },
                    { range: [7, 8], color: "rgba(0, 105, 11, .5)", text: "7-8" },
                    { range: [8, 9], color: "rgba(0, 70, 0, .5)", text: "8-9" }
                ],
                threshold: {
                    line: { color: "red", width: 4 },
                    thickness: 0.75,
                    value: 9 // If greater than this value, display in red
                }
            }
        }
    ];
    
    // Layout settings
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    
    // Plot the gauge chart
    Plotly.newPlot('gauge', data, layout);
       }).catch(error => {
        console.log(error);
    });
    
}
