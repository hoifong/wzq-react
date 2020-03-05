export interface Player {
    name: string,
    level: number,
    pic: string,
    id: string,
    createTime: number
}

export interface RoomConfig {
    boardSize: number
    firstMove: number
    maxTimeout: number
}

export interface Room {
    id: string
    host: string
    roomState: number
    whiteSide: string
    blackSide: string
    startTime: string
    config: RoomConfig
}

export interface HallState {
    players: Player[],
    games: Room[]
}