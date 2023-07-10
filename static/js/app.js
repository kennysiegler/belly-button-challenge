url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'


// Load the data and run the functions meant to display the data
d3.json(url).then(function(data) {
    
    loadData(data)
})

// This function loads the data into the select box and demographic data box
function loadData(data) {
    for (let i = 0; i < data.names.length; i++ ) {
        const x = document.getElementById('selDataset')
        const y = document.createElement('option')
        y.setAttribute('id', data.names[i])
        y.setAttribute('value', data.names[i])
        y.innerText = data.names[i]
        x.appendChild(y)
    
    }   
    loadDemographicData()
}
// This changes the graph when a new ID is selected
function optionChanged(x) {
    
    createGraph(x)
    
}


// This function creates the graphs
function createGraph(x) {
    // Load the Data
    d3.json(url).then(function(data) {
        // Iterate through all of the ids in the data
        for (let i = 0;i < data.names.length; i++) {
            // matches each id to the one selected by the user
            if (data.names[i] == parseInt(x)) {
                counts = []
                ids = []
                labels = []
                all_counts = data.samples[i].sample_values
                all_ids = data.samples[i].otu_ids
                all_labels = data.samples[i].otu_labels
                // Gets the first 10 data points for the selected ID
                for (j = 0; j < 10;j++) {
                    counts.push(all_counts[j])
                    ids.push(`OTU ${all_ids[j]}`)
                    labels.push(all_labels[j])
                }
                // Sets the trace for the bar graph
                trace1 = [
                    {
                    x: counts,
                    y: ids,
                    type: 'bar',
                    orientation: 'h',
                    text: labels
                    }
                ]       
                // Sets the trace for the bubble graph
                trace2 = [ {
                    x: data.samples[i].otu_ids,
                    y: data.samples[i].sample_values,
                    type: 'bubble',
                    mode: 'markers',
                    marker: { size: data.samples[i].sample_values },
                    text: data.samples[i].otu_labels,
                    color: [data.samples[i].otu_ids]


                } ]
                // This changes the data based on the ID selected
                changeDemographicData(data.metadata[i])
            }
        }

        // Make the two graphs
        Plotly.newPlot('bar', trace1)
        Plotly.newPlot('bubble', trace2)

        

    })
}

// Adds the parameters to the demographic data box
function loadDemographicData(x) {
    
    let demo = document.getElementById('sample-metadata')

    const id = document.createElement('h6')
    id.setAttribute('id', 'data-id')
    id.innerText = `id: `

    const ethnicity = document.createElement('h6')
    ethnicity.setAttribute('id', 'data-ethnicity')
    ethnicity.innerText = `ethnicity: `

    const gender = document.createElement('h6')
    gender.setAttribute('id', 'data-gender')
    gender.innerText = `gender: `

    const age = document.createElement('h6')
    age.setAttribute('id', 'data-age')
    age.innerText = `age: `
    
    const location = document.createElement('h6')
    location.setAttribute('id', 'data-location')
    location.innerText = `location: `
    
    const bbtype = document.createElement('h6')
    bbtype.setAttribute('id', 'data-bbtype')
    bbtype.innerText = `bbtype: `

    const wfreq = document.createElement('h6')
    wfreq.setAttribute('id', 'data-wfreq')
    wfreq.innerText = `wfreq: `

    demo.append(id, ethnicity, gender, age, location, bbtype, wfreq)

}

// Changes the data in the demographic data box based on user input
function changeDemographicData(x) {
    
    let demo = document.getElementById('sample-metadata')

    const id = document.getElementById('data-id')
    id.innerText = `id: ${x.id}`

    const ethnicity = document.getElementById('data-ethnicity')
    ethnicity.innerText = `ethnicity: ${x.ethnicity}`

    const gender = document.getElementById('data-gender')
    gender.innerText = `gender: ${x.gender}`

    const age = document.getElementById('data-age')
    age.innerText = `age: ${x.age}`
    
    const location = document.getElementById('data-location')
    location.innerText = `location: ${x.location}`
    
    const bbtype = document.getElementById('data-bbtype')
    bbtype.innerText = `bbtype: ${x.bbtype}`

    const wfreq = document.getElementById('data-wfreq')
    wfreq.innerText = `wfreq: ${x.wfreq}`

    console.log(x)

    

}
