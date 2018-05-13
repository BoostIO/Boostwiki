import { observable, action } from 'mobx'

export class CurrentUserState {
  @observable public uniqueName: string
  @observable public displayName: string
  @observable public githubId: string

  constructor ({
    uniqueName,
    displayName,
    githubId
  }: CurrentUserStateSpecs) {
    this.uniqueName = uniqueName
    this.displayName = displayName
    this.githubId = githubId
  }

  @action setRoute = (input: CurrentUserStateSpecs) => {
    this.uniqueName = input.uniqueName
    this.displayName = input.displayName
    this.githubId = input.githubId
  }
}

export interface CurrentUserStateSpecs {
  uniqueName?: string
  displayName?: string
  githubId?: string
}
