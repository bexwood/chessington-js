import Piece from './piece';

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let lateralMovements = this.getLateralMovements(board, currentPosition);
        let diagonalMovements = this.getDiagonalMovements(board, currentPosition)
        return lateralMovements.concat(diagonalMovements);
    }
}
