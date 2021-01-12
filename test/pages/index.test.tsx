import React from 'react'
import { render } from '../testUtils'
import Home from '../../pages/index'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {})
    // https://github.com/mui-org/material-ui/issues/21293#issuecomment-654921524
    expect(
      asFragment()
        .firstElementChild.innerHTML.replace(/id="mui-[0-9]*"/g, '')
        .replace(/aria-labelledby="(mui-[0-9]* *)*"/g, '')
    ).toMatchSnapshot()
  })
})
