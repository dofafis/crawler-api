import { GET, Path } from "typescript-rest";

@Path('/buscar')
export class RoomsCrawlerController {
    @GET
    index() {
        return 'hello world!'
    }
}