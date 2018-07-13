import React from 'react'
import { Button } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import Link, { LinkState } from 'next/link'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type ButtonLinkProps = Omit<ButtonProps, 'href'> & Omit<LinkState, 'children' | 'passHref'> & {
  className?: string
}

const ButtonLink: React.SFC<ButtonLinkProps> = ({
  href,
  as,
  prefetch,
  shallow,
  scroll,
  replace,
  className,
  children,
  ...otherProps
}) => (
  <Link href={href} as={as} prefetch={prefetch} shallow={shallow} scroll={scroll} replace={replace} passHref>
    <Button className={className} {...otherProps}>
      {children}
    </Button>
  </Link>
)

export default ButtonLink
