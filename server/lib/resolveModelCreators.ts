import mongoose from 'mongoose'
import NotFoundError from './errors/NotFoundError'

export function resolveModelCreator <D extends mongoose.Document> (ModelClass: mongoose.Model<D>) {
  return async function resolveModelCreator (documentOrDocumentId: D | mongoose.Types.ObjectId): Promise<D> {
    let document: D
    if (documentOrDocumentId instanceof ModelClass) {
      document = documentOrDocumentId as D
    } else {
      if (!mongoose.Types.ObjectId.isValid(documentOrDocumentId as mongoose.Types.ObjectId)) {
        throw new Error('Invalid ObjectId')
      }
      document = await ModelClass.findById(documentOrDocumentId)
    }
    if (document == null) throw new NotFoundError('document does not exist.')

    return document
  }
}
