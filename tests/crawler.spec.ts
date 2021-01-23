import request = require('supertest')
import server from '../src/server'

describe('Crawler tests', () => {
    afterAll(async () => {
        await server.close()
    })
    it('Should return a validation error checkin is past date', async () => {
        await request(server)
            .post('/search')
            .send({
                checkin: '02/03/2020',
                checkout: '12/03/2021'
            })
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe('{ property: \'checkin\',\n  constraint: \'Property \\\'checkin\\\' should be a date in the future\' }')
            })
    })

    it('Should return a validation error checkout is past date', async () => {
        await request(server)
            .post('/search')
            .send({
                checkin: '02/03/2021',
                checkout: '12/03/2020'
            })
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe('{ property: \'checkout\',\n  constraint: \'Property \\\'checkout\\\' should be a date in the future\' }')
            })
    })

    it('Should return a validation error checkout should be after checking', async () => {
        await request(server)
            .post('/search')
            .send({
                checkin: '02/03/2021',
                checkout: '12/03/2020'
            })
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe('{ property: \'checkout\',\n  constraint: \'Property \\\'checkout\\\' should be a date in the future\' }')
            })
    })

    it('Should return a validation error checking invalid date', async () => {
        await request(server)
            .post('/search')
            .send({
                checkin: '99/99/9999',
                checkout: '12/03/2020'
            })
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe('{ property: \'checkin\',\n  constraint: \'Property \\\'checkin\\\' should have the format dd/mm/aaaa\' }')
            })
    })

    it('Should return a validation error checkout invalid date', async () => {
        await request(server)
            .post('/search')
            .send({
                checkin: '12/03/2021',
                checkout: '99/99/9999'
            })
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe('{ property: \'checkout\',\n  constraint: \'Property \\\'checkout\\\' should have the format dd/mm/aaaa\' }')
            })
    })

    it('Should return a validation error checkout invalid date', async () => {
        await request(server)
            .post('/search')
            .send({
                checkout: '12/03/2021'
            })
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe('[ { property: \'checkin\',\n    constraints:\n     { isDefined: \'checkin should not be null or undefined\',\n       isLength: \'checkin must be longer than or equal to 10 characters\',\n       isString: \'checkin must be a string\' } } ]')
            })
    })

    it('Should return a validation error checkout invalid date', async () => {
        await request(server)
            .post('/search')
            .send({
                checkin: '12/03/2021'
            })
            .expect(400)
            .expect(res => {
                expect(res.body.error).toBe('[ { property: \'checkout\',\n    constraints:\n     { isDefined: \'checkout should not be null or undefined\',\n       isLength: \'checkout must be longer than or equal to 10 characters\',\n       isString: \'checkout must be a string\' } } ]')
            })
    })
})