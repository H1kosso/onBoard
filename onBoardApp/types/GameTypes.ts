export type GameCardType = {
    gameId: string,
    imageUrl: string | undefined,
    title: string,
    categories: string[]
}

type Extrema = {
    min: number,
    max: number
}

export type GameDetailsType = {
    gameId: string,
    imageUrl: string,
    title: string,
    description: string,
    yearPublished: number,
    players: Extrema,
    playtime: Extrema,
    minAge: number,
    categories: string[]
    mechanics: string[],
    designers: string[],
    artists: string[],
    publishers: string[]
}

export type GameSessionType = {
    _id: string,
    username: string,
    image: string,
    title: string,
    gameId: string,
    location: string,
    date: string,
    players: string,
    winner: string,
    playtime: number,
}

export type GameCollectionType = {
    username: string,
    gameId: string,
    owned: boolean,
    butPrice: number,
    whenBought: string,
    favourite: boolean
}