---
layout: post
title: Selection Highlighting with the Ace Editor
description: 
modified: 2014-03-09
tags: [ace editor]
image:
  feature: abstract-3.jpg
comments: true
share: true
---

## The Ace Editor's `setSelectionRange()`
I recently embedded the [Ace editor](http://ace.c9.io/#nav=about) into my current project and needed to implement selection highlighting.  However, the arguments of Ace's built-in `setSelectionRange()` is a `Range` object with row and column points for the start and end of the selection and the information I had was in single character index points over the whole document.  I needed to figure out a way of converting the single character indices to a `Range` object.

Here's an example:

{% highlight javascript %}
var example = function() {
  return 'This is an example';
};
{% endhighlight %}

In the example, the whole function has character indices of start:0 and end:60.  However, the Ace `Range` would be {start: {row:0, column:0}, end: {row:2, column:2}}.  If we just wanted to select the return value 'This is an example', the character indices would be start:36 and end:56 whereas the `Range` would be {start: {row:1, column:9}, end: {row:1, column:29}}.

## Converting Character Indices

### The Problem 

What I had:

* The start and end character indices of the text to be selected

What I needed:
 
* The start row and column indices as well as the end row and column indices of the text to be selected

### Finding the Last Column Index of Each Row

The first thing I wanted to do was to keep track of the character index of the last character in each row so that, given any character index, I could find out which row that character would be in.

I first used Ace's built-in `EditSession` method `getLength()` to find out how many rows there were in total.  Then I iterated through each row, using Ace `Selection` methods to move the cursor to the end of each row and then to find the index of the last column for that row.  I saved the accumulation of last column indices in an array called $scope.lastColIndices.   

Below is the code for this utility.  Note that my editor was embedded in an Angular app and so $scope.editor refers to the editor defined in an Angular directive as scope.editor = ace.edit("editor").

{% highlight javascript %}
var getlastColIndices = function(code) {
  $scope.lastColIndices = [];
  var numRows = $scope.editor.getSession().getLength();
  var lastColIndex = 0;

  for (var i = 0; i < numRows; i++){
    $scope.editor.getSelection().moveCursorTo(i,0);
    $scope.editor.getSelection().moveCursorLineEnd();
    lastColIndex += $scope.editor.getSelection().getCursor().column;
    // add 1 for all rows after the first to deal with the way my 
    // character indices put 1 whitespace at the end of each of those lines
    if (i>0) { lastColIndex += 1; }
    $scope.lastColIndices[i] = lastColIndex;
  }
};
{% endhighlight %}

### Finding the Row and Column Indices for Each Single Character Index

Now that I had the character index ranges for each row, given any character index, I could find the row and column indices associated with it.

{% highlight javascript %}
var getRowAndCol = function(charIndex) {
  if (charIndex <= $scope.lastColIndices[0]) {
    return {row: 0, column: charIndex};
  }
  var row = 1;
  for (var i = 1; i < $scope.lastColIndices.length; i++) {
    if (charIndex > $scope.lastColIndices[i]) {
      row = i+1;
    }
  }
  var col = charIndex - $scope.lastColIndices[row-1] - 1;
  return {row: row, column: col};
};
{% endhighlight %}

### Selecting the Appropriate Code in the Ace Editor

Now that these two utility functions have been created, it's fairly straightforward to use Ace's `setSelectionRange()` with the appropriate range values.

{% highlight javascript %}
var selectCode = function(start, end) {
  var startRowCol = getRowAndCol(start);
  var endRowCol = getRowAndCol(end);
  $scope.editor.getSelection().setSelectionRange({
   start: {
      row: startRowCol.row,
      column: startRowCol.column
    },
    end: {
      row: endRowCol.row,
      column: endRowCol.column
    }
  });
};
{% endhighlight %}

While there are opportunities for improvement with this code as it is here, I tried to show as clearly as possible what the problem was and how to think about solving it.

