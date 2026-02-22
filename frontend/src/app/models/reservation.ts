import House from "./house"

export default class Reservation{
     _id : string = ""
    guest: string = "" 
    houseId: string = ""
    houseRef?: House
    dateFrom: Date = new Date()
    dateTo: Date = new Date()
    created: Date = new Date()
    adults: number = 1
    children: number = 0
    comment: string = ""
    rating: number = 0
    description: string = ""
    approved: string = ""
    rejection: string = ""
}