import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import Link from 'next/link'

export default (() => (
  <DefaultLayout>
    Homepage
    <Link href='/users'><a>go to users</a></Link>
  </DefaultLayout>
))
