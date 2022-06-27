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
        let availableMoves = [];
        for (let i=0; i<GameSettings.BOARD_SIZE; i++){
            if (currentPosition.row !== i){
                availableMoves.push(new Square(i, currentPosition.col));
            }
        }
        for (let i=0; i<GameSettings.BOARD_SIZE; i++){
            if (currentPosition.col !== i){
                availableMoves.push(new Square(currentPosition.row, i));
            }
        }
        return availableMoves;
    }
}
