import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('../dist', import.meta.url)))
const host = process.env.HOST ?? '127.0.0.1'
const port = Number(process.env.PORT ?? 4173)

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0])
  const safePath = normalize(decoded).replace(/^(\.\.[/\\])+/, '')
  const candidate = resolve(join(root, safePath))

  if (!candidate.startsWith(root)) {
    return join(root, 'index.html')
  }

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate
  }

  return join(root, 'index.html')
}

createServer((request, response) => {
  const file = resolveFile(request.url ?? '/')
  const ext = extname(file)

  response.writeHead(200, {
    'Content-Type': types[ext] ?? 'application/octet-stream',
    'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=31536000, immutable',
  })

  createReadStream(file).pipe(response)
}).listen(port, host, () => {
  console.log(`FIXIN preview running at http://${host}:${port}/`)
})
