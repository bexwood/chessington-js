import Piece from './piece';
import Square from "../square";

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let availableMoves = [
            new Square(currentPosition.row + 1, currentPosition.col + 2),
            new Square(currentPosition.row - 1, currentPosition.col + 2),
            new Square(currentPosition.row + 1, currentPosition.col - 2),
            new Square(currentPosition.row - 1, currentPosition.col - 2),
            new Square(currentPosition.row + 2, currentPosition.col + 1),
            new Square(currentPosition.row - 2, currentPosition.col + 1),
            new Square(currentPosition.row + 2, currentPosition.col - 1),
            new Square(currentPosition.row - 2, currentPosition.col - 1)];
        availableMoves = this.checkAllMovesOnBoard(availableMoves)
        availableMoves = this.takeOpposingPlayers(availableMoves, board)
        return availableMoves;
    }
}
