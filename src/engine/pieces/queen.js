import Piece from './piece';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let lateralMovements = this.getLateralMovements(board, currentPosition);
        let diagonalMovements = this.getDiagonalMovements(board, currentPosition)
        let availableMoves = lateralMovements.concat(diagonalMovements)
        return availableMoves;
    }
}
