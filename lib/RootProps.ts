import { RouteState } from './RouteState'
import { CurrentUserState } from './CurrentUserState'
import { PageContext } from './getPageContext'

export interface RootProps<Q> {
  route: RouteState
  currentUser: CurrentUserState
  pageContext: PageContext
  query?: Q
}
