import { app } from '@/infra/http/app'
import request from 'supertest'

describe('Create User', () => {
  it('should be able to create a user', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      createdAt: expect.any(String),
      updatedAt: null,
    })
  })

  it('should not be able to create a user because a user already exists', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'User already exists',
    })
  })

  it('should not be able to create a user because a invalid name', async () => {
    const response = await request(app).post('/users').send({
      name: 'J',
      email: 'johndoe@johndoe.com',
      password: '12345678',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: ['name - String must contain at least 2 character(s)'],
    })
  })

  it('should not be able to create a user because a invalid password', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@johndoe.com',
      password: '123',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: ['password - String must contain at least 8 character(s)'],
    })
  })

  it('should not be able to create a user because a invalid password', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe',
      password: '12345678',
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: ['email - Invalid email'],
    })
  })
})
