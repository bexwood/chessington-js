import GameSettings from "../gameSettings";
import Square from "../square";

export default class Piece {
    constructor(player) {
        this.player = player;
        this.firstMove = true;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    getLateralMovements(board, square) {
        let availableMoves = [];
        for (let i=0; i<GameSettings.BOARD_SIZE; i++){
            if (square.row !== i && !this.isSquareOccupied(board, i, square.col)){
                availableMoves.push(new Square(i, square.col));
            } else if (square.row !== i && this.isSquareOccupied(board, i, square.col)){
                break;
            } else {
                continue;
            }
        }
        for (let i=0; i<GameSettings.BOARD_SIZE; i++){
            if (square.col !== i && !this.isSquareOccupied(board, square.row, i)){
                availableMoves.push(new Square(square.row, i));
            } else if (square.col !== i && this.isSquareOccupied(board, square.row, i)){
                break;
            } else {
                continue;
            }
        }
        return availableMoves;
    }

    isSquareOccupied(board, row, column){
        return board.getPiece(new Square(row, column))
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.firstMove = false;
    }
}
