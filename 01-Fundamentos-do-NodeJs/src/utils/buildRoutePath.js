export function buildRoutePath(path) {
  const routeParamsRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(
    routeParamsRegex,
    '(?<$1>[a-zA-Z0-9\-_]+)'
  )

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
