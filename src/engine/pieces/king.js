import Piece from './piece';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class King extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {
        let currentPosition = board.findPiece(this);
        let availableMoves = [];
        availableMoves.push(new Square(currentPosition.row + 1, currentPosition.col + 1));
        availableMoves.push(new Square(currentPosition.row - 1, currentPosition.col + 1));
        availableMoves.push(new Square(currentPosition.row + 1, currentPosition.col - 1));
        availableMoves.push(new Square(currentPosition.row - 1, currentPosition.col - 1));
        availableMoves.push(new Square(currentPosition.row + 1, currentPosition.col));
        availableMoves.push(new Square(currentPosition.row - 1, currentPosition.col));
        availableMoves.push(new Square(currentPosition.row, currentPosition.col + 1));
        availableMoves.push(new Square(currentPosition.row, currentPosition.col - 1));
        availableMoves = availableMoves.filter(move => (move.row>=0 && move.row<GameSettings.BOARD_SIZE && move.col>=0 && move.col<GameSettings.BOARD_SIZE))
        return availableMoves;
    }
}
