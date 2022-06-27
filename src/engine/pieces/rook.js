import Piece from './piece';
import Player from "../player";
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Rook extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let availableMoves = this.getLateralMovements(board, currentPosition)
        return availableMoves;



        // let availableMoves = [];
        // for (let i=0; i<GameSettings.BOARD_SIZE; i++){
        //     if (currentPosition.row !== i && !board.getPiece(new Square(i, currentPosition.col))){
        //         availableMoves.push(new Square(i, currentPosition.col));
        //     } else if (currentPosition.row !== i && board.getPiece(new Square(i, currentPosition.col))){
        //         break;
        //     } else {
        //         continue;
        //     }
        // }
        // for (let i=0; i<GameSettings.BOARD_SIZE; i++){
        //     if (currentPosition.col !== i && !board.getPiece(new Square(currentPosition.row, i))){
        //         availableMoves.push(new Square(currentPosition.row, i));
        //     } else if (currentPosition.col !== i && board.getPiece(new Square(currentPosition.row, i))){
        //         break;
        //     } else {
        //         continue;
        //     }
        // }
        // return availableMoves;
    }
}
