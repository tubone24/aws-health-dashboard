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

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  axios
    .get<AwsStatusResp>('https://status.aws.amazon.com/data.json')
    .then((resp) => {
      const handlerResp = resp.data.archive.map((x) => ({
        // eslint-disable-next-line @typescript-eslint/camelcase
        service_name: x.service_name,
        summary: x.summary,
        region: (x.service.includes('management-console')) ? 'global': (x.service.split('-').slice(1).join('-') === '') ? 'global': x.service.split('-').slice(1).join('-'),
        date: x.date,
        status: x.status,
        details: x.details,
        service: (x.service.includes('management-console')) ? 'management-console': x.service.split('-')[0],
        description: x.description
          .replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
          .replace(/&nbsp;/g, '\n'),
      }))
      res.statusCode = 200
      // eslint-disable-next-line no-console
      console.log(handlerResp)
      res.json(handlerResp)
    })
    .catch((error) => {
      console.error(error.response)
      res.statusCode = error.response.status || 500
      res.statusMessage = error.response.statusText || 'InternalServerError'
      res.json({ error: error.response.statusText || 'InternalServerError' })
    })
}

export default handler
