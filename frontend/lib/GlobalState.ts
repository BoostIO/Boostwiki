import { observable, action } from 'mobx'
import {
  RouteState,
  RouteStateSpecs
} from './RouteState'
import {
  CurrentUserState,
  CurrentUserStateSpecs
} from './CurrentUserState'

export interface GlobalStateSpecs {
  route?: RouteStateSpecs | RouteState
  currentUser?: CurrentUserStateSpecs | CurrentUserState
}

export default class GlobalState {
  @observable public route: RouteState
  @observable public count: number
  @observable public currentUser?: CurrentUserState

  constructor (props?: GlobalStateSpecs) {
    this.count = 0
    if (props == null) {
      this.route = new RouteState({})
      return
    }
    if (props.route instanceof RouteState) {
      this.route = props.route
    } else {
      this.route = new RouteState(props.route)
    }
    if (props.currentUser != null) {
      this.currentUser = new CurrentUserState(props.currentUser)
    }
  }

  @action public plusOne = () => {
    console.log('lll')
    this.count++
  }
}
