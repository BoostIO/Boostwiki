import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import Link from 'next/link'
import withGlobalState from '../lib/withGlobalState'

export default withGlobalState()(() => (
  <DefaultLayout>
    User
    <Link href='/'><a>go to home</a></Link>
  </DefaultLayout>
))
