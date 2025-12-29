import features from '@/features'
import { OpenAPIHandler } from '@orpc/openapi/fetch'
import { onError } from '@orpc/server'
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins'

const openAPIHandler = new OpenAPIHandler(features, {
    interceptors: [
        onError((error) => {
            console.error(error)
        }),
    ],
    plugins: [
        new OpenAPIReferencePlugin(),
    ],
})

async function handleRequest(request: Request) {
    const { response } = await openAPIHandler.handle(request, {
        prefix: '/api',
        context: {},
    })

    return response ?? new Response('Not found', { status: 404 })
}

export const HEAD = handleRequest
export const GET = handleRequest
export const POST = handleRequest
export const PUT = handleRequest
export const PATCH = handleRequest
export const DELETE = handleRequest