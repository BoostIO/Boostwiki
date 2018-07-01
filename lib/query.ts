export type Query = {[key: string]: string}
export type QueryMap = Map<string, string>

export function isQueryMap (input: Query | QueryMap): input is QueryMap {
  return (input as QueryMap).entries != null
}

export function createQueryMap (input: Query | QueryMap): QueryMap {
  const map = new Map()

  const entries = isQueryMap(input)
    ? [...input.entries()]
    : Object.entries(input)

  entries.forEach(([key, value]) => map.set(key, value))

  return map
}
