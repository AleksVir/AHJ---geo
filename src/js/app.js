import Controller from "./Controller";
import Board from "./Board";

const container = document.querySelector(".container");
const board = new Board(container);

const controller = new Controller(board);
controller.init();
