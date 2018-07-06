import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import Link from 'next/link'
import { Typography } from '@material-ui/core'

export default () => (
  <DefaultLayout>
    <Typography variant='display2'>Homepage</Typography>
    <Link href='/users'><a>go to users</a></Link>
  </DefaultLayout>
)
