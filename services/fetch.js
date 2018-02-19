// @flow

export const getRequest = async (urlString: string): Promise<Object> => {
  const result = await fetch(urlString)

  if (!result.ok) {
    throw new Error(result.statusText)
  }

  const json = await result.json()
  return json
}
