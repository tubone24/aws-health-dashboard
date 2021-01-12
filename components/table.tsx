import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

import tableIcons from '../components/tableIcons'
import { useRecoilState } from 'recoil'
import awsState from '../store/aws'
import axios from 'axios'
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export const Table = (): JSX.Element => {
  const regionNameMapping = {
    'us-east-2': 'US East (Ohio)',
    'us-east-1': 'US East (N. Virginia)',
    'us-west-1': 'US West (N. California)',
    'us-west-2': 'US West (Oregon)',
    'af-south-1': 'Africa (Cape Town)',
    'ap-east-1': 'Asia Pacific (Hong Kong)',
    'ap-south-1': 'Asia Pacific (Mumbai)',
    'ap-northeast-3': 'Asia Pacific (Osaka-Local)',
    'ap-northeast-2': 'Asia Pacific (Seoul)',
    'ap-southeast-1': 'Asia Pacific (Singapore)',
    'ap-southeast-2': 'Asia Pacific (Sydney)',
    'ap-northeast-1': 'Asia Pacific (Tokyo)',
    'ca-central-1': 'Canada (Central)',
    'cn-north-1': 'China (Beijing)',
    'cn-northwest-1': 'China (Ningxia)',
    'eu-central-1': 'Europe (Frankfurt)',
    'eu-west-1': 'Europe (Ireland)',
    'eu-west-2': 'Europe (London)',
    'eu-south-1': 'Europe (Milan)',
    'eu-west-3': 'Europe (Paris)',
    'eu-north-1': 'Europe (Stockholm)',
    'me-south-1': 'Middle East (Bahrain)',
    'sa-east-1': 'South America (São Paulo)',
  }
  // recoilとmaterialTableの相性が悪いので不採用
  // Cannot add property tableData, object is not extensible
  // materialTableでdataに対してIDを振る処理があるが、recoilのstateに直接書こうとして怒られているものと思う。
  // 一旦hooksで実装
  // 20200112: dangerouslyAllowMutabilityでできた
  const [aws, setAws] = useRecoilState(awsState)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // https://qiita.com/daishi/items/4423878a1cd7a0ab69eb
    const f = async () => {
      await getAws()
      setLoading(false)
    }
    f()
  }, [])
  const getAws = async () => {
    const resp = await axios.get('/api/aws')
    setAws(resp.data)
    setLoading(false)
  }
  return (
    <div className="container">
      <main>
        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: 'Service Name', field: 'service_name' },
            { title: 'Service', field: 'service', width: 10 },
            { title: 'Region', field: 'region', lookup: regionNameMapping },
            { title: 'Summary', field: 'summary' },
            {
              title: 'Date (' + dayjs.tz.guess() + ')',
              field: 'date',
              render: (rowData) => (
                <div>
                  {dayjs
                    .unix(Number(rowData.date))
                    .format('YYYY-MM-DDTHH:mm:ssZ[Z]')}
                </div>
              ),
              defaultSort: 'desc',
              type: 'string',
            },
            {
              title: 'Status',
              field: 'status',
              lookup: {
                0: 'Service is operating normally',
                1: 'Informational message',
                2: 'Performance issues',
                3: 'Service disruption',
              },
            },
          ]}
          data={aws}
          detailPanel={[
            {
              tooltip: 'Details',
              render: (rowData) => {
                return (
                  <>
                    <div className="title">{rowData.summary}</div>
                    <div className="description">
                      {dayjs
                        .unix(Number(rowData.date))
                        .format('YYYY-MM-DDTHH:mm:ss')}{' '}
                      {rowData.service_name}
                    </div>
                    <div className="code">{rowData.description}</div>
                  </>
                )
              },
            },
          ]}
          options={{
            filtering: true,
            grouping: true,
            exportButton: true,
            exportFileName: 'exported',
            headerStyle: {
              backgroundColor: '#e77f2f',
              color: '#FFF',
            },
          }}
          isLoading={loading}
          actions={[
            {
              // Issue: https://github.com/mbrn/material-table/issues/51
              //@ts-ignore
              icon: tableIcons.Refresh,
              tooltip: 'Refresh Data',
              isFreeAction: true,
              disabled: loading,
              onClick: async () => {
                setLoading(true)
                await getAws()
              },
            },
          ]}
          title={
            <div className="header">
              <img src="/awslogo.png" />
              <a href="https://status.aws.amazon.com/">AWS Health Dashboard</a>
            </div>
          }
        />
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
        <a href="https://github.com/tubone24">&nbsp; ©tubone24</a>
      </footer>

      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .header {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
        }

        .header a {
          color: #e77f2f;
          text-decoration: none;
        }

        .header img {
          height: 0.7em;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 1.5rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 0.9rem;
        }

        .code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Table
