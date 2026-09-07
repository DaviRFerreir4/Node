export function extractQueryParams(query) {
  return Object.fromEntries(
    query
      ?.slice(1)
      .split('&')
      .map((param) => {
        const keyValue = param.split('=')
        keyValue[1] = decodeURIComponent(keyValue[1])
        return keyValue
      }) ?? []
  )
}
