import { observable, action } from 'mobx'

interface User {
  uniqueName: string
  displayName: string
  githubId: string
}

export class CurrentUserState {
  @observable public currentUser: User

  constructor ({
    uniqueName,
    displayName,
    githubId
  }: CurrentUserStateSpecs) {
    this.currentUser = {
      uniqueName,
      displayName,
      githubId
    }
  }

  @action setCurrentUser = (input: CurrentUserStateSpecs) => {
    this.currentUser = {
      uniqueName: input.uniqueName,
      displayName: input.displayName,
      githubId: input.githubId
    }
  }

  @action signout = () => {
    this.currentUser = undefined
  }
}

export interface CurrentUserStateSpecs {
  uniqueName?: string
  displayName?: string
  githubId?: string
}
