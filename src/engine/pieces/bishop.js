import Piece from './piece';
import GameSettings from "../gameSettings";
import Square from "../square";
import {list} from "mocha/lib/reporters";

export default class Bishop extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let availableMoves = [];
        for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
            if (col === currentPosition.col) {
                continue;
            };
            let difference = col - currentPosition.col;
            let rowMinusDifference = currentPosition.row - difference;
            if ((rowMinusDifference >= 0) && (rowMinusDifference < GameSettings.BOARD_SIZE)) {
                availableMoves.push(new Square(rowMinusDifference, col));
            };
            let rowPlusDifference = currentPosition.row + difference;
            if ((rowPlusDifference >= 0) && (rowPlusDifference < GameSettings.BOARD_SIZE)) {
                availableMoves.push(new Square(rowPlusDifference, col));
            };
        };
        availableMoves = this.removeInvalidMoves(board, availableMoves)
        return availableMoves;
    };

    removeInvalidMoves(board, listOfMoves){
        for (let move in listOfMoves) {
            if (board.getPiece(listOfMoves[move])) {
                listOfMoves.splice(move, 1)
                let diagonalDirection = this.getDiagonalDirection(listOfMoves[move])
                //need to go on to delete all moves after this move which follow the same direction
            }
        }
        return listOfMoves
    }

    getDiagonalDirection(position){
        //implement function to find the direction from 'this' which another position is
    }
};