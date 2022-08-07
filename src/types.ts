export type BikeRental = {
    departure: Date,
    return: Date,
    departureStationId: Number,
    departureStationName: String,
    returnStationId: Number,
    returnStationName: String,
    distance: Number,
    duration: Number
}

export type Station = {
    id: Number,
    name: String,
    address: String,
    city: String,
    capacity: Number
}