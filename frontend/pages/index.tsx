import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import Link from 'next/link'
import withGlobalState from '../lib/withGlobalState'

export default withGlobalState()(() => (
  <DefaultLayout>
    Homepage
    <Link href='/users'><a>go to users</a></Link>
  </DefaultLayout>
))
