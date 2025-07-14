import React from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from 'chart.js';

function LineChart({ chartData, title }: { chartData: ChartData<'line'>, title:string}) {
  return (
    <div className="chart-container w-full h-full">
      <Line
        data={chartData}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title,
                    color: 'white' // Title color
                },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              ticks: {
                color: 'rgb(158, 239, 229)', // X-axis labels
                font: {
                  weight: 'bold'
                }
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)' // X-axis grid lines
              }
            },
            y: {
              ticks: {
                color: 'rgb(158, 239, 229)', // Y-axis labels
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)' // Y-axis grid lines
              }
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;