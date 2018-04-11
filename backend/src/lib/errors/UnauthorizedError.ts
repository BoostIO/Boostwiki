class UnauthorizedError extends Error {
  constructor (...args: any[]) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 401
    })

    if (this.message == null || this.message.length === 0) {
      this.message = 'Authentication is required. You need to sign in.'
    }
  }
}

export default UnauthorizedError
