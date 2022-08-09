Highcharts.theme = {
    // colors: ['#C1E8FF', '#AADEFE', '#85D1FF', '#55BDFC', '#24A3F2', '#1074D2', '#005DB5', '#02519B', '#023E78', '#00284E', '#332401', '#664700', '#946700', '#B78000', '#DE9B00', '#FFB406', '#FFC130', '#FFD063', '#FCDD95', '#FFE7AF'],
    colors: ['#24A3F2', '#1074D2', '#005DB5', '#02519B', '#023E78', '#00284E', '#332401', '#664700', '#946700', '#B78000', '#DE9B00', '#FFB406'],
    chart: {
        borderWidth: 0,
        plotBackgroundColor: {
            linearGradient: [0, 0, 250, 500],
            stops: [
                [0, 'rgba(255, 255, 255, 1)'],
                [1, 'rgba(255, 255, 255, 0)']
            ]
        },
    },
    title: {
        style: {
            color: '#3E576F',
            font: '16px Lucida Grande, Lucida Sans Unicode,' +
                ' Verdana, Arial, Helvetica, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#6D869F',
            font: '12px Lucida Grande, Lucida Sans Unicode,' +
                ' Verdana, Arial, Helvetica, sans-serif'
        }
    },
    xAxis: {
        gridLineWidth: 0,
        lineColor: '#C0D0E0',
        tickColor: '#C0D0E0',
        labels: {
            style: {
                color: '#666',
                fontWeight: 'bold'
            }
        },
        title: {
            style: {
                color: '#666',
                font: '12px Lucida Grande, Lucida Sans Unicode,' +
                ' Verdana, Arial, Helvetica, sans-serif'
            }
        }
    },
    yAxis: {
        alternateGridColor: 'rgba(255, 255, 255, .5)',
        lineColor: '#C0D0E0',
        tickColor: '#C0D0E0',
        tickWidth: 1,
        labels: {
            style: {
                color: '#666',
                fontWeight: 'bold'
            }
        },
        title: {
            style: {
                color: '#666',
                font: '12px Lucida Grande, Lucida Sans Unicode,' +
                ' Verdana, Arial, Helvetica, sans-serif'
            }
        }
    },
    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: '#3E576F'
        },
        itemHoverStyle: {
            color: 'black'
        },
        itemHiddenStyle: {
            color: 'silver'
        }
    },
    labels: {
        style: {
            color: '#3E576F'
        }
    }
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);
