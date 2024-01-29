import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface registerServiceRequest {
  name: string
  email: string
  password: string
}

export async function registerService({
  name,
  email,
  password,
}: registerServiceRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
