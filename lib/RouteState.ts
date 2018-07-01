import { observable, action } from 'mobx'
import { createQueryMap, Query, QueryMap } from './query'

export class RouteState {
  @observable public pathname: string = ''
  @observable public query: QueryMap = new Map()
  @observable public asPath: string = ''

  constructor ({
    pathname,
    query = {},
    asPath
  }: RouteStateSpecs) {
    this.pathname = pathname == null ? '' : pathname
    this.query = createQueryMap(query)
    this.asPath = asPath == null ? '' : asPath
  }

  @action setRoute = (input: RouteStateSpecs) => {
    if (input.pathname) this.pathname = input.pathname
    if (input.query) this.query = createQueryMap(input.query)
    if (input.asPath) this.asPath = input.asPath
  }
}

export interface RouteStateSpecs {
  pathname?: string
  query?: Query | QueryMap
  asPath?: string
}
