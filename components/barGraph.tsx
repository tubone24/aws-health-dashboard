import { Bar } from 'react-chartjs-2'
import { chartBorderColor, chartBackGroundColor } from './const'
import React from "react";

interface BarGraphData {
  labels: string[];
  data: number[];
  title: string
}

const BarGraph = ({labels, data, title}: BarGraphData): JSX.Element => {
  const graphParam = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: chartBackGroundColor,
        borderColor: chartBorderColor,
        borderWidth: 1,
      },
    ],
  }
  return (
    <div className="container">
      <Bar data={graphParam} />
    </div>
  )
}

export default BarGraph
