import React from 'react'
import { Button } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import Link, { LinkState } from 'next/link'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

interface ButtonLinkProps {
  linkProps: Omit<LinkState, 'children'>
  buttonProps: Omit<ButtonProps, 'href'>
  className?: string
}

const ButtonLink: React.SFC<ButtonLinkProps> = ({ linkProps, buttonProps, className, children }) => (
  <Link {...linkProps} passHref>
    <Button className={className} {...buttonProps}>
      {children}
    </Button>
  </Link>
)

export default ButtonLink
