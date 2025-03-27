export class RouteHandler {
  #routes = []

  exec(req, res) {
    const { method, url } = req

    const route = this.#getRouteByMethodAndUrl(method, url)

    if (route) {
      const routeParams = req.url.match(route.url)

      req.params = { ...routeParams.groups }

      return route.handler(req, res)
    }

    return res.writeHead(404).end()
  }

  #getRouteByMethodAndUrl(method, url) {
    return this.#routes.find((_route) => {
      const isSameMethod = _route.method === method
      const isSameUrl = _route.url.test(url)

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
