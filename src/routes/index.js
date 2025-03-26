export class RouteHandler {
  #routes = []

  exec(req, res) {
    const { method, url } = req

    const route = this.#getRouteByMethodAndUrl(method, url)

    if (route) {
      return route.handler(req, res)
    }

    return res.writeHead(404).end()
  }

  #getRouteByMethodAndUrl(method, url) {
    return this.#routes.find((_route) => {
      const isSameMethod = _route.method === method
      const isSameUrl = _route.url === url

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
