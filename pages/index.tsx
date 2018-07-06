import React from 'react'
import Link from 'next/link'
import { Typography } from '@material-ui/core'

export default () => (
  <>
    <Typography variant='display2'>Homepage</Typography>
    <Link href='/users'><a>go to users</a></Link>
  </>
)
