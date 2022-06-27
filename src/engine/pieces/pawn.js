import Piece from './piece';
import Square from "../square";
import GameSettings from '../gameSettings';
import Player from "../player";

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let availableMoves = [];
        if (this.player === Player.WHITE){
            availableMoves.push(new Square(currentPosition.row + 1, currentPosition.col));
            if (currentPosition.row === 1){
                availableMoves.push(new Square(currentPosition.row + 2, currentPosition.col));
            }
        } else {
            availableMoves.push(new Square(currentPosition.row - 1, currentPosition.col));
            if (currentPosition.row === (GameSettings.BOARD_SIZE - 2)){
                availableMoves.push(new Square(currentPosition.row - 2, currentPosition.col));
            }
        }
        return availableMoves;
    }
}
