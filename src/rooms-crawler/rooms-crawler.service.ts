import { IAvailableRoom, IImageUrl } from "./interfaces/rooms.res";
import { IReservationInterval } from "./interfaces/rooms.req";
import puppeteer from "puppeteer"

export class RoomsCrawlerService {
    constructor() {}

    async fetchRooms(reservationInterval: IReservationInterval): Promise<IAvailableRoom[]> {
        const checkIn = reservationInterval.checkin?.replace(/\//g, ''),
        checkOut = reservationInterval.checkout?.replace(/\//g, '')

        const url = `https://myreservations.omnibees.com/default.aspx?q=5462&version=MyReservation&sid=72a16ba5-03c8-4b98-a33e-97cac6600f48#/&diff=false&CheckIn=${checkIn}&CheckOut=${checkOut}&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`

        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url, { timeout: 0 })   
        await page.waitForSelector('div.roomExcerpt', {
            visible: true,
        });

        const data: IAvailableRoom[] = await page.evaluate(() => {
            let results: IAvailableRoom[] = []
        
            let items = document.querySelectorAll('div.roomExcerpt')
        
            items.forEach(item => {
             
                let result = {
                    name: item.querySelector('div.excerpt > h5 > a')?.textContent,
                    description: item.querySelector('div.excerpt > p > a')?.textContent,
                    price: item.querySelector('h6.bestPriceTextColor')?.textContent,
                    images: [] as IImageUrl[]
                } as IAvailableRoom
                
                item.querySelectorAll('img')?.forEach(img => {
                    result?.images?.push({
                        url: img.src
                    })
                })
            
                results.push(result)
            
            })
            
            return results

        })

        return data
    }

}