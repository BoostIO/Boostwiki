import { observable, action } from 'mobx'
import {
  RouteState,
  RouteStateSpecs
} from './RouteState'

export interface GlobalStateSpecs {
  route?: RouteStateSpecs | RouteState
}

export default class GlobalState {
  @observable public route: RouteState
  @observable public count: number

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
  }

  @action public plusOne = () => {
    console.log('lll')
    this.count++
  }
}
