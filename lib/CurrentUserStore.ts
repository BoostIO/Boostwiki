import { observable, action } from 'mobx'

interface User {
  uniqueName: string
  displayName: string
  githubId: string
}

export class CurrentUserStore {
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
    this.currentUser = null
  }
}

export interface CurrentUserStateSpecs {
  uniqueName?: string
  displayName?: string
  githubId?: string
}
