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
        let allMoves = [];
        if (this.player === Player.WHITE) {
            if (!board.getPiece(new Square(currentPosition.row + 1, currentPosition.col))) {
                allMoves.push(new Square(currentPosition.row + 1, currentPosition.col));
                if (currentPosition.row === 1) {
                    allMoves.push(new Square(currentPosition.row + 2, currentPosition.col));
                }
            }
        } else {
            if (!board.getPiece(new Square(currentPosition.row - 1, currentPosition.col))) {
                allMoves.push(new Square(currentPosition.row - 1, currentPosition.col));
                if (currentPosition.row === (GameSettings.BOARD_SIZE - 2)) {
                    allMoves.push(new Square(currentPosition.row - 2, currentPosition.col));
                }
            }
        }
        for (var move in allMoves) {
            if (board.getPiece(allMoves[move])) {
                allMoves.splice(move, 1);
            }
        }
        return allMoves;
    }
}