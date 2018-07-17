import { observable, action } from 'mobx'

interface User {
  uniqueName: string
  displayName: string
  githubId: string
}

export class Session {
  @observable public currentUser: User

  constructor (currentUser: CurrentUserStateSpecs) {
    if (currentUser == null) {
      this.currentUser = null
    } else {
      const { githubId, displayName, uniqueName } = currentUser
      this.currentUser = {
        githubId,
        displayName,
        uniqueName
      }
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
