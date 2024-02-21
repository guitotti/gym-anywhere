import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO Here we should log the error to an external tool (eg.: Datadog, Sentry...)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
