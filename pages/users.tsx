import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import Link from 'next/link'

export default () => (
  <DefaultLayout>
    User
    <Link href='/'><a>go to home</a></Link>
  </DefaultLayout>
)
