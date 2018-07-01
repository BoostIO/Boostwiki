class NotFoundError extends Error {
  constructor (...args: any[]) {
    super(...args)
    Object.defineProperty(this, 'name', {
      value: this.constructor.name
    })
    Object.defineProperty(this, 'status', {
      value: 404
    })

    if (this.message == null || this.message.length === 0) {
      this.message = 'The resource doesn\'t exist.'
    }
  }
}

export default NotFoundError
