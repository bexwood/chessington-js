import Piece from './piece';
import Square from "../square";

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let availableMoves = [
            new Square(currentPosition.row + 1, currentPosition.col + 1),
            new Square(currentPosition.row - 1, currentPosition.col + 1),
            new Square(currentPosition.row + 1, currentPosition.col - 1),
            new Square(currentPosition.row - 1, currentPosition.col - 1),
            new Square(currentPosition.row + 1, currentPosition.col),
            new Square(currentPosition.row - 1, currentPosition.col),
            new Square(currentPosition.row, currentPosition.col + 1),
            new Square(currentPosition.row, currentPosition.col - 1)];
        return this.checkMovesOnBoard(availableMoves);
    }
}
