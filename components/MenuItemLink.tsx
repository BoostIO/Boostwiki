import React from 'react'
import { MenuItem } from '@material-ui/core'
import { MenuItemProps } from '@material-ui/core/MenuItem'
import Link, { LinkState } from 'next/link'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type MenuItemLinkProps = Omit<MenuItemProps, 'component'> & Omit<LinkState, 'children' | 'passHref'> & {
  className?: string
}

const MenuItemLink: React.SFC<MenuItemLinkProps> = ({
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
    <MenuItem component='a' className={className} {...otherProps}>
      {children}
    </MenuItem>
  </Link>
)

export default MenuItemLink
