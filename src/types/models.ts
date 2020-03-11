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

export interface Point {
    x: number,
    y: number
}

export interface Room {
    id: string
    host: string
    roomState: number
    whiteSide: string
    blackSide: string
    whiteSteps: Point[],
    blackSteps: Point[]
    startTime: string
    config: RoomConfig
}

export interface HallState {
    players: Player[],
    games: Room[]
}