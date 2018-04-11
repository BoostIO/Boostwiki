class ForbiddenError extends Error {
  constructor (...args: any[]) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 403
    })

    if (this.message == null || this.message.length === 0) {
      this.message = 'You are not authorized to perform this operation.'
    }
  }
}

export = ForbiddenError
