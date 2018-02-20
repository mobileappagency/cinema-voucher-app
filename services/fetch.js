// @flow

type FetchResult = {
  ok: boolean,
  json: () => Object,
  statusText: string
}

export const getRequest = async (urlString: string): Promise<Object> => {
  const result: FetchResult = await fetch(urlString)

  if (!result.ok) {
    throw new Error(result.statusText)
  }

  const json: Object = await result.json()
  return json
}
