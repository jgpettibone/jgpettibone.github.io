---
layout: post
title: Bitwise N-Queens
description: 
modified: 2014-05-06
tags: [bitwise operators, algorithms]
image:
  feature: abstract-4.jpg
comments: true
share: true
---

## The N-Queens Problem
[Eight Queens](http://en.wikipedia.org/wiki/Eight_queens_puzzle) is a well-known algorithmic problem.  How many ways can you place eight queens on an 8x8 chessboard so that none of the queens threaten each other.  Following the rules of chess, one queen threatens another when it is in the same row, column, or diagonal.  N-Queens in the more general problem of solving this for any *n* queens on an *n* x *n* chessboard.

## The Non-Bitwise Solution
I first solved this problem using an instance of an abstract Board class on which I recorded the positions of the queens as I placed them.  The Board is basically a matrix populated with 0s and 1s where 1s represent the placed queens and 0s represent the empty spaces.  The Board class also contained methods called `togglePiece()` that turns a 0 to a 1 and vice versa and `hasAnyQueenConflicts()` which checks for threats.  Below is simple code for `countNQueensSolutions` which will return the number of possible solutions for any *n* (within the processing limitations). 

{% highlight javascript %}
window.countNQueensSolutions = function(n){
  var solutionCount = 0; 
  var board = new Board({n:n});

  var countQueenSolutions = function(queenBoard, rowIndex, numCols) {
    if (rowIndex === numCols) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < numCols; i++){
      board.togglePiece(rowIndex, i);
      if (!queenBoard.hasAnyQueensConflicts()){
        var result = countQueenSolutions(queenBoard, rowIndex+1, numCols);
        if (result) { return solution = result; }
      }
      board.togglePiece(rowIndex, i);
    }
  };

  countQueenSolutions(board, 0, n);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
{% endhighlight %}

## The Bitwise Solution
My goal was to implement a solution using bitshifting.  While a bitshifting implementation would definitely increase the performance of the code above, I wanted to do this merely to better understand bitwise operators and how I could use them in an algorithm like this one.

### No Board, no `togglePiece()`
In the bitwise implementation, we won't be using the Board class.  Instead of using the Board matrix, we'll use binary numbers to represent the queen's position in a row.  For instance, in a 4x4 chessboard, the queen's position will be a binary number with the queen represented by 1 and the empty places represented by 0s:

|   queen's position (base 2) ---|---  (base 10) | 
|:---------------|:--------------------------------:|
|    0001        | 1 |
|    0010        | 2 |
|    0100        | 4 |
|    1000        | 8 |
{: rules="groups"}

Instead of using Board's `togglePiece()` to place queens on the board, we'll iterate through each possible spot in the row by incrementing the binary number either by multiples of 2 (in base 10) or by shifting the bit to left using the bitwise left shift (<<) operator.  

### No Board, no `hasAnyQueensConflicts()`
We need a new way - a bitshifting way - of finding the threats to a queen in a particular position.  Since we're working with one position per row, we don't need to account for row conflicts, but we still need to worry about column conflicts, minor diagonal (left) conflicts, and major diagonal (right) conflicts.  

Imagine that the queen is in the third position in the row.  The binary representations of the conflicts are shown in the table below - 1s are in positions for the conflicts.

|   binary representation ---|---  conflict  ---| 
|:-------------|:----------------:|
|    0010      | queen's position in the current row |
|    0100      | minor diagonal conflict in the next row |
|    0001      | major diagonal conflict in the next row|
|    0010      | column conflict in the next row|
{: rules="groups"}

In order to check for all the conflicts, we need to bitwise OR these 3 conflicts to find all the positions that would cause a conflict in the next row.  So

|   binary representation ---|---  conflict  ---| 
|:-------------|:----------------:|
|    0100      | minor diagonal conflict |
|    0001      | major diagonal conflict |
|    0010      | column conflict |
|    0111      | minor diagonal conflict \| major diagonal conflict \| column conflict |
{: rules="groups"}

Now we can see that despite all these conflicts, there still is a position where a queen could fit in the next row without causing additional conflicts (represented by 1000).  

We can find that perfect position by iterating through all possible positions of the queen and performing bitwise AND with this position and the conflicts.  When the result of this operation is 0, we know that there is a place for the queen.

|   binary representation ---|---  conflict  ---| 
|:-------------|:----------------:|
|    0111      | minor diagonal conflict \| major diagonal conflict \| column conflict |
|    1000      | queen's position in next row
|              |:--------------------------------:|
|    0000      | conflicts & queen |
{: rules="groups"}

Compare the above table with the one below where there would be a conflict with queen's position.

|   binary representation ---|---  conflict  ---| 
|:-------------|:----------------:|
|    0111      | minor diagonal conflict \| major diagonal conflict \| column conflict |
|    0100      | queen's position in next row |
|              |:--------------------------------:|
|    0100      | conflicts & queen |
{: rules="groups"}

It's only when the result of the bitwise AND equals 0 that we know the queen will be able to be in that position without conflict.

### Finding the next row's conflicts
In the example above, we had the following conflicts and position of the queen

|   binary representation ---|---  conflict  ---| 
|:-------------|:----------------:|
|    0100      | queen's position in next row |
|    0100      | minor diagonal conflict |
|    0001      | major diagonal conflict |
|    0010      | column conflict |
{: rules="groups"}

We can build on this information in order to find the conflicts in the next row.  The next column conflict is found by bitwise ORing the current column conflict with the queen's position.  Similarly, the next minor diagonal and major diagonal conflicts are found by bitwise ORing the current conflicts with the queen's position and then bitshifting the diagonals in the proper direction (to the left for the minor diagonals and to the right for major diagonals.)  This gives us the following next conflicts.

#### Column Conflicts

|   binary representation ---|---  conflict  ---| 
|:-------------|:----------------:|
|    0010      | column conflict |
|    0100      | queen's position in next row |
|              |:--------------------------------:|
|    0110      | column conflict \| queen's position |
{: rules="groups"}

#### Minor Diagonal Conflicts

|   binary representation ---|---  conflict  ---| 
|:-------------|:----------------:|
|    0100      | minor diagonal conflict |
|    0100      | queen's position in next row |
|              |:--------------------------------:|
|    0100      | minor diagonal conflict \| queen's position |
|   01000      | minor diagonal conflict \| queen's position << 1 |
{: rules="groups"}

#### Major Diagonal Conflicts

|   binary representation ---|---  conflict  ---| 
|:-------------|:----------------:|
|    0001      | major diagonal conflict |
|    0100      | queen's position in next row |
|              |:--------------------------------:|
|    0101      | major diagonal conflict \| queen's position |
|    00101     | major diagonal conflict \| queen's position >> 1 |
{: rules="groups"}

### Putting it Together
Now we can implement the bitwise queens logic into the original `countNQueensSolutions` that I wrote.

{% highlight javascript %}
window.countNQueensSolutionsBitwise = function(n) {
  var solutionCount = 0;

  // uses minDiagConflict, majDiagConflict, colConflict for conflicts in the 
  // minor diagonal, major diagonal, and column
  // only placing one queen per row so not testing row conflicts
  var countQueenSolutions = function(currentRow, minDiagConflict, majDiagConflict, colConflict) {

    // if we've hit n (the index past the last row), then we've found a solution
    if (currentRow === n) {
      solutionCount++;
      return;
    }

    // we have a conflict if we have any type of conflict  
    // so we want to use bitwise OR  
    var conflicts = minDiagConflict | majDiagConflict | colConflict;

    // iterates from 1 up through increments of 2 (binary numbers)
    // until it bitshifts over the size of the board 
    // ex: if n = 4 , (1 << 4) = 10000 = 16, so the last iteration will be 
    // when queenPosition = 8 = 1000 [1 = 0001, 2 = 0010, 4 = 0100, 8 = 1000]
    // queenPosition represents the position of the queen in the row
    for (var queenPosition = 1; queenPosition < 1<<n; queenPosition*=2) {

      // we want conflicts & queenPosition to equal 0
      if (!(conflicts & queenPosition)) {

        // put the next values of the conflicts into the recursive solution
        // (stored in variables here for readability)
        var nextMinDiagConflict = (minDiagConflict | queenPosition) << 1;
        var nextMajDiagConflict = (majDiagConflict | queenPosition) >> 1;
        var nextColConflict = colConflict | queenPosition;
        result = countQueenSolutions(currentRow+1, nextMinDiagConflict, nextMajDiagConflict, nextColConflict);
        if (result) return solutionCount = result;
      }
    }
  };

  countQueenSolutions(0,0,0,0);
  return solutionCount;
};
{% endhighlight %}
