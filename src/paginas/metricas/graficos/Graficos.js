import Highcharts from 'highcharts';
import highcharts3d from "highcharts/highcharts-3d";
import cylinder from "highcharts/modules/cylinder";
import { useEffect } from 'react';

// -------------------------------------------- CYLINDER

export const GraficoCylinder = (props) => {

    highcharts3d(Highcharts);
    cylinder(Highcharts);
  
    useEffect(() => {
      Highcharts.chart(props.id, {

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
        colors: [props.cor1, props.cor2, props.cor3],
        xAxis: {
          categories: [props.categoria1, props.categoria2, props.categoria3],
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
            data: [props.valor1, props.valor2, props.valor3],
            name: '',
            showInLegend: false
        }]
      });
    });
  
    return <div id={props.id}></div>
  
  }

// -------------------------------------------- CIRCLE

export const GraficoCircle = (props) => {

    useEffect(() => {
      Highcharts.chart(props.id, {
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
                startAngle: 0,
                endAngle: 0,
                center: ['50%', '50%'],
                size: '110%'
            }
        },
        colors: [props.cor1, props.cor2],
        series: [{
            type: 'pie',
            name: '',
            innerSize: '50%',
            data: [
                [props.nome1, props.valor1],
                {
                    name: props.nome2,
                    y: props.total - props.valor1,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
      })
    });
    return <div id={props.id}></div>
}