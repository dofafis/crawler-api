import { Expose } from "class-transformer"
import { IsDefined, IsNumber, IsObject, IsString, IsUrl } from "class-validator"

export class IImageUrl {
    @IsDefined()
    @IsUrl()
    @Expose()
    url?: string
}

export class IAvailableRoom {
    @IsDefined()
    @IsString()
    @Expose()
    name?: string

    @IsDefined()
    @IsString()
    @Expose()
    description?: string

    @IsDefined()
    @IsNumber()
    @Expose()
    price?: number

    @IsDefined()
    @IsObject({ each: true })
    @Expose()
    images?: IImageUrl[]
}