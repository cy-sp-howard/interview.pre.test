const isDevServer = Boolean(document.querySelector('script[src="/@vite/client"]'))

export default function request<Resp>(
  opts: Omit<RequestInit, 'body'> & {
    data?: unknown
    url: string
    before?: (url: string, opts: RequestInit) => [string, RequestInit]
    after?: (
      resp: Pick<Response, 'headers' | 'url' | 'status' | 'statusText'> & {
        body: Resp
        response: Response
      },
    ) => typeof resp | Promise<typeof resp>
  },
) {
  let finalURL = opts.url
  let finalOpts: RequestInit
  let body: BodyInit | undefined

  const headers = new Headers()
  headers.set('content-type', 'application/json')

  const base = new URL(isDevServer ? '/' : import.meta.env.VITE_APP_API)
  const fullURL = new URL(opts.url, base.origin + base.pathname)

  if (!opts.method || opts.method.toLowerCase() === 'get') {
    const opts_data = opts.data as Record<string, string>
    Object.entries(opts_data).forEach(([key, val]) => {
      fullURL.searchParams.set(key, JSON.stringify(val))
    })
  } else if (opts.data instanceof FormData) {
    body = opts.data
    headers.delete('content-type')
  } else {
    body = JSON.stringify(opts.data)
  }
  new Headers(opts.headers).forEach((i, k) => {
    headers.set(k, i)
  })

  const mergedOpts = Object.assign({ credentials: 'omit' as 'omit' }, opts, { body, headers })

  finalOpts = Object.fromEntries(
    Object.entries(mergedOpts).filter(([k]) => !['data', 'url', 'before', 'after'].includes(k)),
  ) as Omit<typeof mergedOpts, 'data' | 'url' | 'before' | 'after'>

  if (opts.before) {
    const [_url, _opts] = opts.before(opts.url, finalOpts)
    finalOpts = _opts
    finalURL = _url
  }

  return fetch(finalURL, finalOpts).then(response => {
    const contentType = response.headers.get('content-type') || ''
    const isText = ~contentType.indexOf('text/')
    const isJson = ~contentType.indexOf('application/json')
    return response
      .clone()
      [isJson ? 'json' : isText ? 'json' : 'blob']()
      .catch(() => response.text())
      .then((body: Resp) => {
        return {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          url: response.url,
          body,
          response,
        }
      })
      .then(resp => {
        if (opts.after) {
          return opts.after(resp)
        }
        if (resp.status >= 200 && resp.status < 300) return resp
        return Promise.reject(resp)
      })
  })
}

export type RespData<T extends (...args: never[]) => Promise<unknown>> = Awaited<
  ReturnType<T>
>['Data']
export type ReqData<T extends (...args: never[]) => unknown> = Parameters<T>[0]
