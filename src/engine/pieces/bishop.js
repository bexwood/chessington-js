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
        let availableMoves = this.getDiagonalMovements(board, currentPosition)
        return availableMoves;
    };
};