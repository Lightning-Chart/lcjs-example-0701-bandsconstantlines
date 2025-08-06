/*
 * LightningChartJS example that showcases basic usage of Bands and Constantlines.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Import xydata
const xydata = require('@lightningchart/xydata')

// Extract required parts from LightningChartJS.
const { lightningChart, emptyFill, Themes } = lcjs

// Import data-generator from 'xydata'-library.
const { createProgressiveTraceGenerator } = xydata

const chartTitle = 'Bands and Constantlines'

// Create a XY Chart.
const chart = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .ChartXY({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
    })
    .setTitle(chartTitle)

// Add a line series.
const series = chart.addLineSeries()

// Generate random progressive points using 'xydata'-library.
createProgressiveTraceGenerator()
    .setNumberOfPoints(100)
    .generate()
    .toPromise()
    .then((data) => {
        series.appendJSON(data)
    })

// Get the default X and Y Axis
const xAxis = chart.getDefaultAxisX()
const yAxis = chart
    .getDefaultAxisY()
    // Set the interval for Y Axis.
    .setInterval({ start: -10, end: 10, animate: true })

// Add a Constantline to the X Axis
const xAxisConstantline = xAxis.addConstantLine({legend: { visible: true }})
// Position the Constantline in the Axis Scale
xAxisConstantline.setValue(80)
// The name of the Constantline will be shown in the Legend
xAxisConstantline.setName('X Axis Constantline')

// Add a Band to the X Axis
const xAxisBand = xAxis.addBand({legend: { visible: true }})
// Set the start and end values of the Band.
xAxisBand
    .setValueStart(10)
    .setValueEnd(25)
    // Set the name of the Band
    .setName('X Axis Band')

// Add Band and ConstantLine to the Y Axis

// If {onTop: false} is given as argument here, the Constantline will be rendered behind
// all the Series in the Chart.
const yAxisConstantLine = yAxis.addConstantLine({legend: { visible: true, onTop: false }})
yAxisConstantLine.setName('Y Axis Constantline')
// Giving {onTop: false} as argument here makes sure the Band is rendered behind all
// the Series in the Chart.
const yAxisBand = yAxis.addBand(({legend: { visible: true, onTop: false }}))
yAxisBand.setName('Y Axis Band')

// Position the Y Axis ConstantLine along the visible Scale of the Axis.
yAxisConstantLine.setValue(9)

// Position the Y Axis Band along the visible Scale of the Axis.
yAxisBand.setValueEnd(2).setValueStart(-3)
