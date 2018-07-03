import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import Link from 'next/link'
import { Typography } from '@material-ui/core'

export default () => (
  <DefaultLayout>
    <Typography variant='display2'>User</Typography>
    <Link href='/'><a>go to home</a></Link>
  </DefaultLayout>
)
