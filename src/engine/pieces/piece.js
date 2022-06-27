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

    checkAllMovesOnBoard(listOfMoves) {
        return listOfMoves.filter(move =>
            (move.row>=0 && move.row<GameSettings.BOARD_SIZE && move.col>=0 && move.col<GameSettings.BOARD_SIZE));
    }

    checkAllMovesAvailable(listOfMoves, board) {
        listOfMoves = listOfMoves.filter(move => !board.getPiece(move));
        return listOfMoves;
    }

    takeOpposingPlayers(listOfMoves, board) {
        let availableMoves = []
        for (let move in listOfMoves) {
            if (!board.getPiece(listOfMoves[move])){
                availableMoves.push(listOfMoves[move])
            } else if (board.getPiece(listOfMoves[move]) && board.getPiece(listOfMoves[move]).player !== this.player && board.getPiece(listOfMoves[move]).constructor.name !== 'King'){
                availableMoves.push(listOfMoves[move])
            }
        }
        return availableMoves;
    }

    getLateralMovements(board, square) {
        let availableMoves = [];
        for (let i=0; i<GameSettings.BOARD_SIZE; i++){
            if (square.row !== i && !board.getPiece(new Square(i, square.col))){
                availableMoves.push(new Square(i, square.col));
            } else if (square.row !== i && board.getPiece(new Square(i, square.col)).player !== this.player){
                availableMoves.push(new Square(i, square.col))
                break;
            } else if (square.row !== i && board.getPiece(new Square(i, square.col)).player === this.player){
                break;
            } else {
                continue;
            }
        }
        for (let i=0; i<GameSettings.BOARD_SIZE; i++){
            if (square.col !== i && !board.getPiece(new Square(square.row, i))){
                availableMoves.push(new Square(square.row, i));
            } else if (square.col !== i && board.getPiece(new Square(square.row, i)).player !== this.player && board.getPiece(new Square(square.row, i)).constructor.name !== 'King'){
                availableMoves.push(new Square(square.row, i));
                break;
            } else if (square.col !== i && board.getPiece(new Square(square.row, i))){
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
            } else if ((rowMinusDifference >= 0) && (rowMinusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowMinusDifference, col)).player !== this.player && (col < square.col) && board.getPiece(new Square(rowMinusDifference, col)).constructor.name !== 'King') {
                backwardDiagonalMoves = [board.getPiece(new Square(rowMinusDifference, col))]
            } else if ((rowMinusDifference >= 0) && (rowMinusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowMinusDifference, col)).player === this.player && (col < square.col)) {
                backwardDiagonalMoves = []
                col = square.col
            } else if ((rowMinusDifference >= 0) && (rowMinusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowMinusDifference, col)).player !== this.player && (col > square.col) && board.getPiece(new Square(rowMinusDifference, col)).constructor.name !== 'King') {
                backwardDiagonalMoves.push(new Square(rowMinusDifference, col));
                break;
            } else if ((rowMinusDifference >= 0) && (rowMinusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowMinusDifference, col)).player === this.player && (col > square.col)) {
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
            } else if ((rowPlusDifference >= 0) && (rowPlusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowPlusDifference, col)).player !== this.player  && (col < square.col) && board.getPiece(new Square(rowPlusDifference, col)).constructor.name !== 'King') {
                forwardDiagonalMoves = [board.getPiece(new Square(rowPlusDifference, col))]
            } else if ((rowPlusDifference >= 0) && (rowPlusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowPlusDifference, col)).player === this.player  && (col < square.col)) {
                forwardDiagonalMoves = []
                col = square.col
            } else if ((rowPlusDifference >= 0) && (rowPlusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowPlusDifference, col)).player !== this.player && (col > square.col) && board.getPiece(new Square(rowPlusDifference, col)).constructor.name !== 'King') {
                forwardDiagonalMoves.push(new Square(rowPlusDifference, col));
                break;
            } else if ((rowPlusDifference >= 0) && (rowPlusDifference < GameSettings.BOARD_SIZE) && board.getPiece(new Square(rowPlusDifference, col)).player === this.player && (col > square.col)) {
                break;
            }
        }
        let availableMoves = backwardDiagonalMoves.concat(forwardDiagonalMoves);
        return availableMoves
    }

    moveTo(board, newSquare) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.firstMove = false;
    }
}
