import { atom } from 'recoil'

const awsState = atom({
  key: 'aws',
  default: [],
})

export default awsState
