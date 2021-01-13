import { useRecoilValue } from "recoil";
import awsState from "../store/aws";
import React from "react";
import { Bar } from 'react-chartjs-2';
import { statusMapping } from './const'
export const AlertPerStatus = (): JSX.Element => {
  // 20200112: dangerouslyAllowMutabilityでできた
  const aws = useRecoilValue(awsState)
  const labels = Array.from(new Set(aws.map(data => statusMapping[data.status])))
  const data = []
  for (const r of labels) {
    data.push(aws.map(data => statusMapping[data.status]).reduce((total, x) => {return x===r ? total+1 : total}, 0))
  }
  const graphParam = {
    labels: labels,
    datasets: [
      {
        label: 'Alert per status',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgb(66,255,90, 0.2)',
          'rgb(56,67,235, 0.2)',
          'rgb(255,126,91, 0.2)',
          'rgb(47,192,36, 0.2)',
          'rgb(230,255,9, 0.2)',
          'rgb(255,53,244, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgb(66,255,90, 0.2)',
          'rgb(56,67,235, 0.2)',
          'rgb(255,126,91, 0.2)',
          'rgb(47,192,36, 0.2)',
          'rgb(230,255,9, 0.2)',
          'rgb(255,53,244, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgb(66,255,90, 1)',
          'rgb(56,67,235, 1)',
          'rgb(255,126,91,1 )',
          'rgb(47,192,361, )',
          'rgb(230,255,9, 1)',
          'rgb(255,53,244, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgb(66,255,90, 1)',
          'rgb(56,67,235, 1)',
          'rgb(255,126,91,1 )',
          'rgb(47,192,361, )',
          'rgb(230,255,9, 1)',
          'rgb(255,53,244, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };
  return (
    <div className="container">
            <Bar data={graphParam} />
    </div>
  )
}

export default AlertPerStatus
