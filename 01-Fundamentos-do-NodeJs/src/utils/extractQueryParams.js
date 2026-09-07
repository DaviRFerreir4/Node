export function extractQueryParams(query) {
  return Object.fromEntries(
    query
      ?.slice(1)
      .split('&')
      .map((param) => param.split('=')) ?? []
  )
}
