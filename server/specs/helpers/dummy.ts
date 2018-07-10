import connection from '../../lib/db/connection'

export async function tearDown () {
  await new Promise((resolve, reject) => {
    connection.dropDatabase(error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}
