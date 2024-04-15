export type GameCardType = {
    gameId: string,
    imageUrl: string,
    title: string,
    category: string
}

type Extrema = {
    min: number,
    max: number
}

export type GameDetailsType = {
    gameId: string,
    imageUrl: string,
    title: string,
    category: string,
    description: string,
    suggestedNumOfPlayers: number,
    suggestedPlayerAge: number,
    players: Extrema,
    playtime: Extrema
}