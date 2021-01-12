// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

interface AwsStatusResp {
  archive: AwsStatusArchive[]
}

interface AwsStatusArchive {
  service_name: string
  summary: string
  date: string
  status: string
  details: string
  description: string
  service: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const resp = await axios.get<AwsStatusResp>(
    'https://status.aws.amazon.com/data.json'
  )
  if (resp.status !== 200) {
    res.statusCode = resp.status
    res.statusMessage = resp.statusText
    return
  }
  const handlerResp = resp.data.archive.map((x) => ({
    // eslint-disable-next-line @typescript-eslint/camelcase
    service_name: x.service_name,
    summary: x.summary,
    region: x.service.split('-').slice(1).join('-') || 'Global',
    date: x.date,
    status: x.status,
    details: x.details,
    service: x.service.split('-')[0],
    description: x.description
      .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
      .replace(/&nbsp;/g, '\n'),
  }))
  res.statusCode = 200
  // eslint-disable-next-line no-console
  console.log(handlerResp)
  res.json(handlerResp)
  return
}

export default handler
