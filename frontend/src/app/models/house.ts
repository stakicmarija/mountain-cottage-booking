export default class House{
    _id : string = "" 
    owner : string = ""
    name : string = ""
    place  : string = ""
    description  : string = ""
    contact  : string = ""
    summerPrice  : number = 0
    winterPrice  : number = 0
    lat : number = 0
    long  : number = 0
    coverImage  : string = ""
    gallery : string[] = []
    avgRating: number = 0
    blocked: boolean = false
    blockedUntil: Date|null = null
}