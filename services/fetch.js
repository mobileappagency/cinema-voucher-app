// @flow

type FetchResult<T> = {
  ok: boolean,
  json: () => T,
  statusText: string
}
export const getRequest = async function getRequest<T> (urlString: string): Promise<T> {
  const result: FetchResult<T> = await fetch(urlString)

  if (!result.ok) {
    throw new Error(result.statusText)
  }

  const json: T = await result.json()
  return json
}
