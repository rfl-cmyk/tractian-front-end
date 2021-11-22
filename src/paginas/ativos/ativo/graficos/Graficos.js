import * as ChartModuleMore from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';
import highcharts3d from "highcharts/highcharts-3d";
import cylinder from "highcharts/modules/cylinder";
import { useEffect } from 'react';

import './graficos.css';

export const GraficoTemp = (props) => {

    ChartModuleMore(Highcharts);

    useEffect(() => {
        Highcharts.chart('container', {

            chart: {
              type: 'gauge',
              plotBackgroundColor: null,
              plotBackgroundImage: null,
              plotBorderWidth: 0,
              plotShadow: false,
              width: 250,
              height: 250,
              backgroundColor: "transparent"
            },
          
            title: {
              text: undefined
            },
          
            pane: {
              startAngle: -150,
              endAngle: 150,
              size: "100%",
              background: [{
                backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                    [0, '#333'],
                    [1, '#333']
                  ]
                },
                borderWidth: 0
              }, {
                backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                    [0, '#333'],
                    [1, '#FFF']
                  ]
                },
                borderWidth: 1
              }, {
                // default background
              }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
              }]
            },
          
            // the value axis
            yAxis: {
              min: 0,
              max: props.temperatura + 10,
          
              minorTickInterval: 'auto',
              minorTickWidth: 1,
              minorTickLength: 10,
              minorTickPosition: 'inside',
              minorTickColor: '#666',
          
              tickPixelInterval: 30,
              tickWidth: 2,
              tickPosition: 'inside',
              tickLength: 10,
              tickColor: '#666',
              labels: {
                step: 2,
                rotation: 'auto'
              },
              title: {
                text: 'ºC'
              },
              plotBands: [{
                from: 0,
                to: props.temperatura - 10,
                color: '#55BF3B' // green
              }, {
                from: props.temperatura - 10,
                to: props.temperatura,
                color: '#DDDF0D' // yellow
              }, {
                from: props.temperatura,
                to: props.temperatura + 10,
                color: '#DF5353' // red
              }]
            },
          
            series: [{
              name: 'Temperatura Máxima',
              data: [props.temperatura],
              tooltip: {
                valueSuffix: ' ºC'
              }
            }]
          
          }
        );
    });

    return <div id="container"></div>

};

// -------------------------------------------- SEMI CIRCLE

export const GraficoSaude = (props) => {

  useEffect(() => {
    Highcharts.chart('semiCircle', {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
          width: 275,
          height: 245,
          backgroundColor: "transparent"
      },
      title: {
          text: undefined
      },
      tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              dataLabels: {
                  enabled: false
              },
              startAngle: -90,
              endAngle: 90,
              center: ['50%', '75%'],
              size: '110%'
          }
      },
      colors: ['#1890ff', '#434348'],
      series: [{
          type: 'pie',
          name: '',
          innerSize: '50%',
          data: [
              ['Saúde', props.saude],
              {
                  name: 'Desgaste',
                  y: 100 - props.saude,
                  dataLabels: {
                      enabled: false
                  }
              }
          ]
      }]
    });
  });
  return <div id="semiCircle"></div>
}

// -------------------------------------------- CYLINDER

export const GraficoMetricas = (props) => {

  highcharts3d(Highcharts);
  cylinder(Highcharts);

  useEffect(() => {
    Highcharts.chart('cylinder', {

      chart: {
        type: 'cylinder',
        width: 290,
        height: 235,
        backgroundColor: "transparent",
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
        }
      },
      title: {
          text: undefined
      },
      plotOptions: {
          series: {
              depth: 25,
              colorByPoint: true
          }
      },
      colors: ['#1890ff', '#434348'],
      xAxis: {
        categories: ['Total de Coletas', 'Horas Coletadas'],
        labels: {
            skew3d: true,
            style: {
                fontSize: '16px'
            }
        }
      },
      yAxis: {
        title: {
          enabled: false
        }
      },
      series: [{
          data: [props.totalHoras, props.totalTempo],
          name: '',
          showInLegend: false
      }]
    });
  });

  return <div id="cylinder"></div>

}