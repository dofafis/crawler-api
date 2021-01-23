import { Expose, plainToClass } from "class-transformer"
import { IsDefined, IsString, Length, validateSync } from "class-validator"
import express from "express"
import { BadRequestError } from "typescript-rest/dist/server/model/errors"
import util from 'util'
const inspectOptions = { depth: 1000 }

export class IReservationInterval {
    @IsDefined()
    @IsString()
    @Length(10)
    @Expose()
    checkin?: string

    @IsDefined()
    @IsString()
    @Length(10)
    @Expose()
    checkout?: string
}

export function reservationIntervalValidator(request: express.Request): express.Request {
    const reservation = plainToClass(IReservationInterval, request.body)
    const errors = validateSync(reservation)

    if(errors && errors.length > 0) {
        const errorObject = errors.map(error => {
            return {
                property: error.property,
                constraints: error.constraints,
            }
        })

        throw new BadRequestError(util.inspect(errorObject, inspectOptions))
    }

    let day = reservation.checkin?.split('/')[0], 
    month = reservation.checkin?.split('/')[1], 
    year = reservation.checkin?.split('/')[2],
    checkinDate = new Date(`${year}-${month}-${day}`)

    if(checkinDate.toString() === 'Invalid Date')
        throw new BadRequestError(util.inspect({
            property: 'checkin',
            constraint: `Property 'checkin' should have the format dd/mm/aaaa`
        }, inspectOptions))
    else if(checkinDate < new Date())
        throw new BadRequestError(util.inspect({
            property: 'checkin',
            constraint: `Property 'checkin' should be a date in the future`
        }, inspectOptions))

    day = reservation.checkout?.split('/')[0], 
    month = reservation.checkout?.split('/')[1], 
    year = reservation.checkout?.split('/')[2]
    let checkoutDate = new Date(`${year}-${month}-${day}`)
    if(checkoutDate.toString() === 'Invalid Date')
        throw new BadRequestError(util.inspect({
            property: 'checkout',
            constraint: `Property 'checkout' should have the format dd/mm/aaaa`
        }, inspectOptions))
    else if(checkoutDate <= new Date())
        throw new BadRequestError(util.inspect({
            property: 'checkout',
            constraint: `Property 'checkout' should be a date in the future`
        }, inspectOptions))

    if(checkinDate > checkoutDate)
        throw new BadRequestError(util.inspect({
            property: 'checkout',
            constraint: `Property 'checkout' should be a date after checkin`
        }, inspectOptions))

    return request
}