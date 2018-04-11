class BadRequestError extends Error {
  constructor (...args: any[]) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 400
    })

    if (this.message == null || this.message.length === 0) {
      this.message = 'The request could not be understood by the server due to malformed syntax.'
    }
  }
}

export = BadRequestError
