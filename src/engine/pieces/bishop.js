import Piece from './piece';

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        return this.getDiagonalMovements(board, currentPosition);
    };
};