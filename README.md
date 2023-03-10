# 2048 Game

This is a common 2048 game that is made on JavaScript.

1. The game has 4 x 4 gamefield
2. Each cell is empty or contains one of the numbers: 2, 4, 8 ... 2^n
3. The player can move cells with keyboard arrows
4. All the numbers can move in the selected direction until all empty cells are filled in
    * 2 equal cells merge into a doubled number
    * The merged cell can’t be merged twice during one move
5. The move is possible if at least one cell is changed after the move
6. After move 2 or 4 appears in a random empty cell. 4 probability is 10%
7. The win message appears when the 2048 value is displayed in any cell
8. The game over message appears if there are no more available moves.
9. The score increases with each move and equals the sum of all merged cells

Used technologies:

* JavaScript
* HTML
* Sass

[DEMO LINK](https://vlad-boikov.github.io/2048_game/)
