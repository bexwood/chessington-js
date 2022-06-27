import Piece from './piece';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Queen extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let availableMoves = [];
        for (let i=0; i<GameSettings.BOARD_SIZE; i++){
            if (currentPosition.row !== i && !board.getPiece(new Square(i, currentPosition.col))){
                availableMoves.push(new Square(i, currentPosition.col));
            } else if (currentPosition.row !== i && board.getPiece(new Square(i, currentPosition.col))){
                break;
            } else {
                continue;
            }
        }
        for (let i=0; i<GameSettings.BOARD_SIZE; i++){
            if (currentPosition.col !== i && !board.getPiece(new Square(currentPosition.row, i))){
                availableMoves.push(new Square(currentPosition.row, i));
            } else if (currentPosition.col !== i && board.getPiece(new Square(currentPosition.row, i))){
                break;
            } else {
                continue;
            }
        }
        let backwardDiagonalMoves = [];
        for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
            if (col === currentPosition.col) {
                continue;
            }
            let difference = col - currentPosition.col;
            let rowMinusDifference = currentPosition.row - difference;
            if ((rowMinusDifference >= 0) && (rowMinusDifference < GameSettings.BOARD_SIZE) && (!board.getPiece(new Square(rowMinusDifference, col)))) {
                backwardDiagonalMoves.push(new Square(rowMinusDifference, col));
            } else if ((rowMinusDifference >= 0) && (rowMinusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowMinusDifference, col)) && (col < currentPosition.col)) {
                backwardDiagonalMoves = []
                col = currentPosition.col
            } else if ((rowMinusDifference >= 0) && (rowMinusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowMinusDifference, col)) && (col > currentPosition.col)) {
                break;
            }
        }

        let forwardDiagonalMoves = [];
        for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
            if (col === currentPosition.col) {
                continue;
            }
            let difference = col - currentPosition.col;
            let rowPlusDifference = currentPosition.row + difference;
            if ((rowPlusDifference >= 0) && (rowPlusDifference < GameSettings.BOARD_SIZE) && (!board.getPiece(new Square(rowPlusDifference, col)))) {
                forwardDiagonalMoves.push(new Square(rowPlusDifference, col));
            } else if ((rowPlusDifference >= 0) && (rowPlusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowPlusDifference, col)) && (col < currentPosition.col)) {
                forwardDiagonalMoves = []
                col = currentPosition.col
            } else if ((rowPlusDifference >= 0) && (rowPlusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowPlusDifference, col)) && (col > currentPosition.col)) {
                break;
            }
        }
        availableMoves = availableMoves.concat(backwardDiagonalMoves)
        availableMoves = availableMoves.concat(forwardDiagonalMoves);
        return availableMoves;
    }
}
