import Piece from './piece';
import Square from "../square";

export default class Knight extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let allMoves = [
            new Square(currentPosition.row + 1, currentPosition.col + 2),
            new Square(currentPosition.row - 1, currentPosition.col + 2),
            new Square(currentPosition.row + 1, currentPosition.col - 2),
            new Square(currentPosition.row - 1, currentPosition.col - 2),
            new Square(currentPosition.row + 2, currentPosition.col + 1),
            new Square(currentPosition.row - 2, currentPosition.col + 1),
            new Square(currentPosition.row + 2, currentPosition.col - 1),
            new Square(currentPosition.row - 2, currentPosition.col - 1)];
        allMoves = this.checkAllMovesOnBoard(allMoves)
        let availableMoves = []
        for (let move in allMoves) {
            if (!board.getPiece(allMoves[move])){
                availableMoves.push(allMoves[move])
            } else if (board.getPiece(allMoves[move]) && board.getPiece(allMoves[move]).player !== this.player && board.getPiece(allMoves[move]).constructor.name !== 'King'){
                availableMoves.push(allMoves[move])
            }
        }
        return availableMoves;
    }
}
