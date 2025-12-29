import { Auth } from '@/schemas/auth'
import { ORPCError, os } from '@orpc/server'
import { cookies, headers } from 'next/headers'

export const requiredAuthMiddleware = os
    .$context<{ auth?: Auth }>()
    .middleware(async ({ context, next }) => {

        const auth = context.auth ?? await getAuth()

        if (!auth) {
            throw new ORPCError('error.unauthorized')
        }

        return next({
            context: { auth },
        })
    })

async function getAuth() {
    const headerList = await headers()
    const cookieList = await cookies()

    // return null
    return { _id: "", permissions: ["user"] }
}