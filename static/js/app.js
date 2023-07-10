url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

d3.json(url).then(function(data) {
    
    loadData(data)
})


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

function optionChanged(x) {
    
    createGraph(x)
    
}

function createGraph(x) {
    d3.json(url).then(function(data) {
    
        for (let i = 0;i < data.names.length; i++) {
            
            if (data.names[i] == parseInt(x)) {
                counts = []
                ids = []
                labels = []
                all_counts = data.samples[i].sample_values
                all_ids = data.samples[i].otu_ids
                all_labels = data.samples[i].otu_labels

                for (j = 0; j < 10;j++) {
                    counts.push(all_counts[j])
                    ids.push(`OTU ${all_ids[j]}`)
                    labels.push(all_labels[j])
                }
                
                trace1 = [
                    {
                    x: counts,
                    y: ids,
                    type: 'bar',
                    orientation: 'h',
                    text: labels
                    }
                ]       
                trace2 = [ {
                    x: data.samples[i].otu_ids,
                    y: data.samples[i].sample_values,
                    type: 'bubble',
                    mode: 'markers',
                    marker: { size: data.samples[i].sample_values },
                    text: data.samples[i].otu_labels,
                    color: [data.samples[i].otu_ids]


                } ]

                changeDemographicData(data.metadata[i])
            }
        }
        Plotly.newPlot('bar', trace1)
        Plotly.newPlot('bubble', trace2)

        

    })
}

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
