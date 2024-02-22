## Dashboard for Belly Button Biodiversity

This dashboard displays the belly button biodiversity data of individuals. The following features are implemented:

1. **Fetching Data**: Utilizes the D3 library to read in data from the `samples.json` file.
   
2. **Top 10 OTUs Bar Chart**: Creates a horizontal bar chart with a dropdown menu to display the top 10 Operational Taxonomic Units (OTUs) found in the selected individual. It uses the following data:
   - **Values**: sample_values
   - **Labels**: otu_ids
   - **Hovertext**: otu_labels

3. **Bubble Chart**: Displays a bubble chart that shows each sample. It uses the following data:
   - **X Values**: otu_ids
   - **Y Values**: sample_values
   - **Marker Size**: sample_values
   - **Marker Colors**: otu_ids
   - **Text Values**: otu_labels

4. **Sample Metadata Display**: Shows the metadata of the selected individual, i.e., demographic information.

5. **Updating Charts**: Updates the charts whenever a new sample is selected from the dropdown menu.

6. **Weekly Washing Frequency Dashboard**: Displays the weekly washing frequency of each individual in the sample metadata. This is represented using a gauge chart.

## Implementation Details

- **Fetching Data**: Uses the D3 library to fetch the JSON data from the `samples.json` file. The data contains information about the OTUs, samples, and metadata of individuals.
  
- **Dropdown Menu**: A dropdown menu is populated with the names of individuals from the dataset. Upon selecting a name, the dashboard updates to display the corresponding charts and metadata.

- **Bar Chart**: The top 10 OTUs bar chart is implemented using Plotly. It sorts the OTUs based on their sample values and displays them horizontally.

- **Bubble Chart**: The bubble chart is also created using Plotly. It visualizes the OTUs and their sample values, with each bubble representing a sample.

- **Sample Metadata Display**: The metadata of the selected individual is displayed below the charts. It shows each key-value pair from the metadata JSON object.

- **Weekly Washing Frequency Dashboard**: The weekly washing frequency of each individual is displayed using a gauge chart. It represents the frequency of belly button washing per week.

