import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Register Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should to register', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -22.8920326,
      longitude: -47.2330458,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
