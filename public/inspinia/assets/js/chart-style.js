ø$('#doughnut_chart').highcharts({
  chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      height: 350
  },
  title: {
      text: ''
  },
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true
          },
          showInLegend: true
      }
  },

  exporting: {
      buttons: {
          contextButton: {
              enabled: false
          }
      }
  },

  credits: {
      enabled: false
  },

  series: [{
      name: 'Brands',
      colorByPoint: true,
      lineWidth: 10,
      innerSize: '50%',
      data: [{
              name: 'Active',
              y: 42,
          }, {
              name: 'Waiting Suspend Approval',
              y: 24
          }, {
              name: 'Blacklist',
              y: 32
          }, {
              name: 'Waiting Blacklist Approval',
              y: 32
          }, {
              name: 'Reject',
              y: 32
          }, {
              name: 'Suspended',
              y: 32
          },


      ]
  }]

});

$('#bar_charts').highcharts({
  chart: {
      type: 'column',
      height: 350,
      inverted: false
  },

  title: {
      text: ''
  },
  xAxis: {
      categories: ['Penunjukkan Langsung', 'Pemilihan Langsung', 'Pelelangan']
  },

  yAxis: {
      min: 0,
      title: {
          text: ''
      }
  },
  legend: {
      reversed: true
  },

  plotOptions: {
      series: {
          stacking: false,
          pointWidth: 30,
          borderRadius: 5,
      }
  },
  exporting: {
      buttons: {
          contextButton: {
              enabled: false
          }
      }
  },
  credits: {
      enabled: false
  },
  series: [{
      name: 'A',
      data: [15000000, 45000000, 15000000]
  }, {
      name: 'B',
      data: [25000000, 55000000, 25000000]
  }, {
      name: 'C',
      data: [30000000, 75000000, 30000000]
  }, {
      name: 'D',
      data: [60000000, 85000000, 60000000]
  }, {
      name: 'E',
      data: [40000000, 65000000, 40000000]
  }]
});

$('#surveyChart1').highcharts({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 350
    },
    title: {
        text: 'Apakah Butuh Guide Saat Menggunakan VMS?'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Hasil',
        colorByPoint: true,
        lineWidth: 10,
        innerSize: '50%',
        data: [{
                name: 'Sangat Tidak Setuju',
                y: 42,
            }, {
                name: 'Ragu - ragu',
                y: 16
            }, {
                name: 'Sangat Setuju',
                y: 12
            }, {
                name: 'Tidak Setuju',
                y: 20
            }, {
                name: 'Setuju',
                y: 5
            },
        ]
    }]
});
$('#surveyChart2').highcharts({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 350
    },
    title: {
        text: 'Apakah Penggunaan Fitur di VMS Mudah Dipahami?'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Hasil',
        colorByPoint: true,
        lineWidth: 10,
        innerSize: '50%',
        data: [{
                name: 'Sangat Tidak Setuju',
                y: 16
            }, {
                name: 'Ragu - ragu',
                y: 5
            }, {
                name: 'Sangat Setuju',
                y: 12
            }, {
                name: 'Tidak Setuju',
                y: 20
            }, {
                name: 'Setuju',
                y: 42,
            },
        ]
    }]
});
$('#surveyChart3').highcharts({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 350
    },
    title: {
        text: 'Apakah Tampilan VMS Perlu Diubah?'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Hasil',
        colorByPoint: true,
        lineWidth: 10,
        innerSize: '50%',
        data: [{
                name: 'Sangat Tidak Setuju',
                y: 20
            }, {
                name: 'Ragu - ragu',
                y: 5
            }, {
                name: 'Sangat Setuju',
                y: 42,
            }, {
                name: 'Tidak Setuju',
                y: 16
            }, {
                name: 'Setuju',
                y: 12
            },
        ]
    }]
});
$('#surveyChart4').highcharts({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: 350
    },
    title: {
        text: 'Apakah fitur di VMS sudah baik?'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Hasil',
        colorByPoint: true,
        lineWidth: 10,
        innerSize: '50%',
        data: [{
                name: 'Sangat Tidak Setuju',
                y: 20
            }, {
                name: 'Ragu - ragu',
                y: 12
            }, {
                name: 'Sangat Setuju',
                y: 42,
            }, {
                name: 'Tidak Setuju',
                y: 5
            }, {
                name: 'Setuju',
                y: 16
            },
        ]
    }]
});