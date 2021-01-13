import { useRecoilValue } from 'recoil'
import awsState from '../store/aws'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { statusMapping, chartBorderColor, chartBackGroundColor } from './const'
export const AlertPerStatus = (): JSX.Element => {
  // 20200112: dangerouslyAllowMutabilityでできた
  const aws = useRecoilValue(awsState)
  const labels = Array.from(
    new Set(aws.map((data) => statusMapping[data.status]))
  )
  const data = []
  for (const r of labels) {
    data.push(
      aws
        .map((data) => statusMapping[data.status])
        .reduce((total, x) => {
          return x === r ? total + 1 : total
        }, 0)
    )
  }
  const graphParam = {
    labels: labels,
    datasets: [
      {
        label: 'Alert per status',
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

export default AlertPerStatus
