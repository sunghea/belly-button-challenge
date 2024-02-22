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
          labels: selectedData.otu_ids.map(id => `OTU ${id}`),
          text: selectedData.otu_labels
      };
    
      // Update the bar chart with the selected OTUs data
      updateBarChart(otusData);
      createBubbleChart(otusData2);
      displayMetadata(selectedID);

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
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
  };

  // Update the bar chart with new data and layout
  Plotly.newPlot("bar", data, layout);
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
      title: 'Bubble Chart',
      xaxis: { title: 'OTU IDs' },
      yaxis: { title: 'Sample Values' }
  };

  // Plot the bubble chart
  Plotly.newPlot('bubble', data, layout);
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
