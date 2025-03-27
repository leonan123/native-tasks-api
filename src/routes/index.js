import { extractQueryParams } from "../utils/extract-query-params.js"

export class RouteHandler {
  #routes = []

  exec(req, res) {
    const { method, url } = req

    const route = this.#getRouteByMethodAndUrl(method, url)

    if (route) {
      const routeParams = req.url.match(route.path)

      const { query, ...params } = routeParams.groups

      req.params = params
      req.query = extractQueryParams(query)

      return route.handler(req, res)
    }

    return res.writeHead(404).end()
  }

  #getRouteByMethodAndUrl(method, url) {
    return this.#routes.find((_route) => {
      const isSameMethod = _route.method === method
      const isSameUrl = _route.path.test(url)

      if (isSameMethod && isSameUrl) {
        return true
      }

      return false
    })
  }

  register(...routeDef) {
    this.#routes.push(...routeDef)
  }
}
