class InvalidBodyError extends Error {
  constructor (...args: any[]) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 422
    })

    if (this.message == null || this.message.length === 0) {
      this.message = 'Request body is invalid.'
    }
  }
}

export = InvalidBodyError
