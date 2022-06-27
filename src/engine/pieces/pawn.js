import Piece from './piece';
import Square from "../square";
import GameSettings from '../gameSettings';
import Player from "../player";

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
        if (this.player === Player.WHITE) {
            this.direction = 1
        } else {
            this.direction = -1
        }

    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let allMoves = [];
        allMoves.push(new Square(currentPosition.row + this.direction, currentPosition.col));
        if (this.firstMove && board.checkSquareOnBoard(currentPosition.row + this.direction, currentPosition.col) && !board.getPiece(new Square(currentPosition.row + this.direction, currentPosition.col))) {
            allMoves.push(new Square(currentPosition.row + (2*this.direction), currentPosition.col));
        }
        allMoves = this.checkAllMovesOnBoard(allMoves, board)
        allMoves = this.checkAllMovesAvailable(allMoves, board);
        return allMoves;
    }
}