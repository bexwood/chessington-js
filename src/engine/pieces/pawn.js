import Piece from './piece';
import Square from "../square";
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
        let availableMoves = [];
        availableMoves.push(new Square(currentPosition.row + this.direction, currentPosition.col));
        if (this.firstMove && board.checkSquareOnBoard(currentPosition.row + this.direction, currentPosition.col) && !board.getPiece(new Square(currentPosition.row + this.direction, currentPosition.col))) {
            availableMoves.push(new Square(currentPosition.row + (2*this.direction), currentPosition.col));
        }
        availableMoves = this.checkAllMovesOnBoard(availableMoves, board)
        availableMoves = this.checkAllMovesAvailable(availableMoves, board)
        let diagonalOpposition = this.checkForOppositesOnDiagonal(currentPosition, board);
        availableMoves = availableMoves.concat(diagonalOpposition)
        return availableMoves;
    }

    checkForOppositesOnDiagonal(currentPosition, board){
        let availableMoves = []
        if (board.checkSquareOnBoard(currentPosition.row+this.direction, currentPosition.col+1) && board.getPiece(new Square(currentPosition.row+this.direction, currentPosition.col+1)) && board.getPiece(new Square(currentPosition.row+this.direction, currentPosition.col+1)).player !== this.player && board.getPiece(new Square(currentPosition.row+this.direction, currentPosition.col+1)).constructor.name !== 'King'){
            availableMoves.push(new Square(currentPosition.row+this.direction, currentPosition.col+1));
        }
        if (board.checkSquareOnBoard(currentPosition.row+this.direction, currentPosition.col-1) && board.getPiece(new Square(currentPosition.row+this.direction, currentPosition.col-1)) && board.getPiece(new Square(currentPosition.row+this.direction, currentPosition.col-1)).player !== this.player && board.getPiece(new Square(currentPosition.row+this.direction, currentPosition.col-1)).constructor.name !== 'King'){
            availableMoves.push(new Square(currentPosition.row+this.direction, currentPosition.col-1));
        }
        return availableMoves
    }
}