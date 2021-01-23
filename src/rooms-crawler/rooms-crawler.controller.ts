import { Accept , Path, POST, PreProcessor } from "typescript-rest";
import { IReservationInterval, reservationIntervalValidator } from "./interfaces/rooms.req";
import { IAvailableRoom } from "./interfaces/rooms.res";
import { Produces } from "typescript-rest-swagger";
import { RoomsCrawlerService } from "./rooms-crawler.service";
const inspectOptions = { depth: 1000 }

@Path('/search')
export class RoomsCrawlerController {

    constructor(
        private readonly roomsCrawlerService: RoomsCrawlerService
    ) {
        this.roomsCrawlerService = new RoomsCrawlerService()
    }

    @POST
    @Accept('application/json')
    @Produces('application/json')
    @PreProcessor(reservationIntervalValidator)
    async searchAvailableRooms(
        body: IReservationInterval
    ): Promise<IAvailableRoom[]> {
        return this.roomsCrawlerService.fetchRooms(body)
    }

}