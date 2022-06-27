import Piece from './piece';
import Square from "../square";

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let availableMoves = new Array();
        availableMoves.push(new Square(currentPosition.row + 1, currentPosition.col));
        availableMoves.push(new Square(currentPosition.row - 1, currentPosition.col));
        return availableMoves;
    }
}
