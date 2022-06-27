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
            if (currentPosition.row !== i){
                availableMoves.push(new Square(i, currentPosition.col));
            }
        }
        for (let i=0; i<GameSettings.BOARD_SIZE; i++){
            if (currentPosition.col !== i){
                availableMoves.push(new Square(currentPosition.row, i));
            }
        }
        for (let col = 0; col < GameSettings.BOARD_SIZE; col++) {
            if (col === currentPosition.col) {
                continue;
            };
            let difference = col - currentPosition.col;
            let rowMinusDifference = currentPosition.row - difference;
            if ((rowMinusDifference >= 0) && (rowMinusDifference <= GameSettings.BOARD_SIZE)) {
                availableMoves.push(new Square(rowMinusDifference, col));
            };
            let rowPlusDifference = currentPosition.row + difference;
            if ((rowPlusDifference >= 0) && (rowPlusDifference <= GameSettings.BOARD_SIZE)) {
                availableMoves.push(new Square(rowPlusDifference, col));
            };
        };
        return availableMoves;
    }
}
