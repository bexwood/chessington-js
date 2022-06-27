import Piece from './piece';
import Square from "../square";

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let availableMoves = [];
        availableMoves.push(new Square(currentPosition.row + 1, currentPosition.col + 2));
        availableMoves.push(new Square(currentPosition.row - 1, currentPosition.col + 2));
        availableMoves.push(new Square(currentPosition.row + 1, currentPosition.col - 2));
        availableMoves.push(new Square(currentPosition.row - 1, currentPosition.col - 2));
        availableMoves.push(new Square(currentPosition.row + 2, currentPosition.col + 1));
        availableMoves.push(new Square(currentPosition.row - 2, currentPosition.col + 1));
        availableMoves.push(new Square(currentPosition.row + 2, currentPosition.col - 1));
        availableMoves.push(new Square(currentPosition.row - 2, currentPosition.col - 1));
        return availableMoves;
    }
}
