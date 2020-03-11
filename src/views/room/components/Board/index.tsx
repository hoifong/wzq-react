import React from 'react';
import Two, { Vector } from 'two.js'
import { Room, Player, RoomConfig, Point } from '@/types/models';
import styles from './index.module.scss';
import { PieceRadius } from '@/utils/consts';
import { throttle } from '@/utils/tools';

interface BoardProps {
    data: Room
    player?: Player
}

const BlackRadialGradient = [new Two.Stop(0, '#666', 1), new Two.Stop(1, '#181818', 1)];
const WhiteRadialGradient = [new Two.Stop(0, '#fff', 1), new Two.Stop(1, '#d1d1d1', 1)];

const lucentBlackRadialGradient = [new Two.Stop(0, 'rgba(102,102,102,0.6)', 1), new Two.Stop(1, 'rgba(24,24,24,1)', 1)];
const lucentWhiteRadialGradient = [new Two.Stop(0, 'rgba(255,255,255,0.6)', 1), new Two.Stop(1, 'rgba(227,227,227, 1)', 1)];

class Board extends React.Component<BoardProps> {
    elRef = React.createRef<HTMLDivElement>();

    context: Two = new Two();
    boardLinesGroup: Two.Group = new Two.Group();
    myPiece: Two.Circle = new Two.Circle(-PieceRadius,-PieceRadius, PieceRadius);
    blackPieceGroup: Two.Group = new Two.Group();
    whitePieceGroup: Two.Group = new Two.Group();
    
    windowSize: number = 0;
    cellSize: number = 0;

    data: Room = this.props.data;
    whiteSteps: Point[] = this.data.whiteSteps;
    blackSteps: Point[] = this.data.blackSteps;
    player?: Player = this.props.player;

    config: RoomConfig = {
        boardSize: 16,
        firstMove: 1,
        maxTimeout: 30
    }

    constructor(props: BoardProps) {
        super(props);
    }

    componentDidMount() {
        this.initContext();
        this.initBoard();
        this.initPiece();
        this.initRenderPieces();
        this.context.update();
    }

    initContext() {
        const el = this.elRef.current;
        if (el) {
            this.windowSize = el.clientHeight - 2;

            const context = this.context = new Two({
                type: Two.Types.canvas,
                width: this.windowSize,
                height: this.windowSize
            });

            context.appendTo(el);

            if (this.player && el.firstChild) {
                const canvasDom = el.firstChild;
                canvasDom.addEventListener('mousemove', this.handleCanvasMouseMove);
                canvasDom.addEventListener('mouseleave', this.handleCanvasMouseMoveOut);
            }

        }
    }

    initBoard() {
        const context = this.context;

        const boardSize = this.windowSize - 2*PieceRadius;

        const cellNum = this.config.boardSize;

        const cellSize = boardSize/cellNum;

        const group = this.boardLinesGroup;

        for (let i=0;i<boardSize;i++) {
            //  横线
            group.add(context.makeLine(PieceRadius, PieceRadius+i*cellSize, PieceRadius+boardSize, PieceRadius+i*cellSize));
            group.add(context.makeLine(PieceRadius+i*cellSize, PieceRadius, PieceRadius+i*cellSize, PieceRadius+boardSize));
        }

        group.stroke = '#232323';

        this.cellSize = cellSize;
        context.add(group);

    }

    //  初始化棋子
    initPiece() {
        const context = this.context;

        context.add(this.blackPieceGroup);
        context.add(this.whitePieceGroup);

        if (!this.player) return;

        //  初始化半透明状态棋子
        const player = this.player;
        const blackSide = this.props.data.blackSide;
        const radius = PieceRadius;

        let radialGradient;
        if (blackSide === player.name) {
            //  黑方
            radialGradient = new Two.RadialGradient(0, 0, radius, lucentBlackRadialGradient);
        } else {
            //  白方
            radialGradient = new Two.RadialGradient(0, 0, radius, lucentWhiteRadialGradient)
        }
        
        this.myPiece.fill = radialGradient;
        this.myPiece.noStroke();

        context.add(this.myPiece);
    }

    //  输入画布中的坐标；得到棋盘中的棋子定位
    getCursorPos(offsetX: number, offsetY: number) {
        const xInBoard = offsetX - PieceRadius;
        const yInBoard = offsetY - PieceRadius;

        const cellSize = this.cellSize;

        let posX = 0;
        if (xInBoard > 0) {
            posX = Math.floor((xInBoard + cellSize/2)/cellSize);
        }

        let posY = 0;
        if (yInBoard > 0) {
            posY = Math.floor((yInBoard + cellSize/2)/cellSize);
        }

        if (
            Math.pow(xInBoard - posX*cellSize, 2) +
            Math.pow(yInBoard - posY*cellSize, 2) >
            PieceRadius*PieceRadius
        ) {
            // 超出半径范围
            return [-1, -1];
        }
        return [posX, posY];

    }

    handleCanvasMouseMove: any = (e: MouseEvent) => {
        const cellSize=this.cellSize;
        const [x, y] = this.getCursorPos(e.offsetX, e.offsetY);
        if (x===-1 || !this.pieceAble(x, y)) {
            this.myPiece.translation.set(-PieceRadius, -PieceRadius);
        } else {
            this.myPiece.translation.set(PieceRadius+x*cellSize, PieceRadius+y*cellSize);
        }
        this.context.update();
    }

    handleCanvasMouseMoveOut = () => {
        this.myPiece.translation.set(-PieceRadius, -PieceRadius);
        this.context.update();
    }

    handleCanvasMouseClick: any = (e: MouseEvent) => {
        const [x, y] = this.getCursorPos(e.offsetX, e.offsetY);

        /**
         * 落子
         */
    }

    pieceAble(x: number, y: number) {
        if (x < 0 || x >= this.config.boardSize || y < 0 || y >= this.config.boardSize) {
            return false;
        }

        return this.whiteSteps.findIndex(t => x===t.x && y===t.y) === -1 && this.blackSteps.findIndex(t => x === t.x && y === t.y) === -1;
    }

    drawAPiece(pos: Point, type: 'black'|'white') {
        const { x, y } = pos;
        const group = type==='black' ? this.blackPieceGroup : this.whitePieceGroup;
        
        const piece = this.context.makeCircle(x * this.cellSize + PieceRadius, y * this.cellSize + PieceRadius, PieceRadius);
        
        group.add(piece);

    }

    //  初次绘制所有棋子
    initRenderPieces() {
        const whiteSteps = this.whiteSteps;
        const blackSteps = this.blackSteps;

        for (let i of whiteSteps) this.drawAPiece(i, 'white');
        for (let i of blackSteps) this.drawAPiece(i, 'black');

        this.blackPieceGroup.fill = new Two.RadialGradient(0, 0, PieceRadius, BlackRadialGradient);
        this.blackPieceGroup.noStroke();

        this.whitePieceGroup.fill = new Two.RadialGradient(0, 0, PieceRadius, WhiteRadialGradient);
        this.whitePieceGroup.noStroke();

    }

    update() {
        this.context.update();
    }

    render() {

        return (
            <div className={styles.container} ref={this.elRef}></div>
        )
    }
}

export default Board;