import GameSettings from "../gameSettings";
import Square from "../square";
import {list} from "mocha/lib/reporters";

export default class Piece {
    constructor(player) {
        this.player = player;
        this.firstMove = true;
    }

    getAvailableMoves(board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    checkMovesOnBoard(listOfMoves) {
        return listOfMoves.filter(move =>
            (move.row>=0 && move.row<GameSettings.BOARD_SIZE && move.col>=0 && move.col<GameSettings.BOARD_SIZE));
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

    getDiagonalMovements(board, square) {
        let backwardDiagonalMoves = [];
        for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
            if (col === square.col) {
                continue;
            }
            let difference = col - square.col;
            let rowMinusDifference = square.row - difference;
            if ((rowMinusDifference >= 0) && (rowMinusDifference < GameSettings.BOARD_SIZE) && (!board.getPiece(new Square(rowMinusDifference, col)))) {
                backwardDiagonalMoves.push(new Square(rowMinusDifference, col));
            } else if ((rowMinusDifference >= 0) && (rowMinusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowMinusDifference, col)) && (col < square.col)) {
                backwardDiagonalMoves = []
                col = square.col
            } else if ((rowMinusDifference >= 0) && (rowMinusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowMinusDifference, col)) && (col > square.col)) {
                break;
            }
        }

        let forwardDiagonalMoves = [];
        for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
            if (col === square.col) {
                continue;
            }
            let difference = col - square.col;
            let rowPlusDifference = square.row + difference;
            if ((rowPlusDifference >= 0) && (rowPlusDifference < GameSettings.BOARD_SIZE) && (!board.getPiece(new Square(rowPlusDifference, col)))) {
                forwardDiagonalMoves.push(new Square(rowPlusDifference, col));
            } else if ((rowPlusDifference >= 0) && (rowPlusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowPlusDifference, col)) && (col < square.col)) {
                forwardDiagonalMoves = []
                col = square.col
            } else if ((rowPlusDifference >= 0) && (rowPlusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowPlusDifference, col)) && (col > square.col)) {
                break;
            }
        }
        let availableMoves = backwardDiagonalMoves.concat(forwardDiagonalMoves);
        return availableMoves
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
