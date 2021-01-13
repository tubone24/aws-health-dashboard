import { useRecoilValue } from 'recoil'
import awsState from '../store/aws'
import React from 'react'
import { Bar } from 'react-chartjs-2'
import { chartBackGroundColor, chartBorderColor } from './const'

export const AlertPerService = (): JSX.Element => {
  // 20200112: dangerouslyAllowMutabilityでできた
  const aws = useRecoilValue(awsState)
  const labels = Array.from(new Set(aws.map((data) => data.service)))
  const data = []
  for (const r of labels) {
    data.push(
      aws
        .map((data) => data.service)
        .reduce((total, x) => {
          return x === r ? total + 1 : total
        }, 0)
    )
  }
  const graphParam = {
    labels: labels,
    datasets: [
      {
        label: 'Alert per service',
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

export default AlertPerService
