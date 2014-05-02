---
layout: post
title: Selection Highlighting with the Ace Editor
description: 
modified: 2014-03-09
tags: [ace editor, selection]
image:
  feature: ace-code-editor.png
comments: true
share: true
---

## The Ace Editor
I embedded the [Ace editor](http://ace.c9.io/#nav=about) into Visual Interpreter, a JavaScript interpreter tool for visualizing in-memory model values and scopes as well as doing inline code evaluation.  This is the first post about using Ace for this project.  The other two blogs are:

* [The Ace Editor and Manipulating Font Colors](http://jgpettibone.github.io/ace-and-manipulating-font-colors/)
* [The Ace Editor and Angular Partials](http://jgpettibone.github.io/ace-and-angular-partials/)

## The Ace Editor's `setSelectionRange()`
I needed to implement selection highlighting in Ace.  However, the arguments of Ace's built-in `setSelectionRange()` is a `Range` object with row and column points for the start and end of the selection and the information I had was in single character index points over the whole document.  I needed to figure out a way of converting the single character indices to a `Range` object.

Here's an example:

{% highlight javascript %}
var example = function() {
  return 'This is an example';
};
example();
{% endhighlight %}

In the example, the whole function has character indices of start:0 and end:71.  However, the Ace `Range` would be {start: {row:0, column:0}, end: {row:3, column:10}}.  If we just wanted to select the return value 'This is an example', the character indices would be start:36 and end:56 whereas the `Range` would be {start: {row:1, column:9}, end: {row:1, column:29}}.

## Converting Character Indices

### The Problem 

What I had:

* The start and end character indices of the text to be selected

What I needed:
 
* The start row and column indices as well as the end row and column indices of the text to be selected

### Finding the Last Column Index of Each Row

The first thing I wanted to do was to find the column index of the last character in each row so that, given any single character index, I could use that last column index to find out which row that character would be in.  

I added the following code in the ace.js file under the `setSelectRange` method.  This code finds the column index of the last character on a line.

{% highlight javascript %}
this.getLastColumnIndex = function(row){
    return this.session.getDocumentLastRowColumnPosition(row,0).column;
};
{% endhighlight %}

Then I found all the column indices for all the rows by iterating through each row.  I saved the accumulation of last column indices in an array called lastColumnIndices.  I used the `session.getLength()` method to find the number of rows in all of the code.  

{% highlight javascript %}
this.getLastColumnIndices = function(){
    var rows = this.session.getLength();
    var lastColumnIndices = [];
    var lastColIndex = 0;
    for (var i = 0; i < rows; i++){
        lastColIndex += this.getLastColumnIndex(i);
        if (i>0) { lastColIndex += 1; }
        lastColumnIndices[i] = lastColIndex;
    }
    return lastColumnIndices;
};
{% endhighlight %}

In the example above, the lastColumnIndices would end up being the array [26, 57, 60, 71].  

### Finding the Row and Column Indices for Each Single Character Index

Now that I had the character index ranges for each row I could find the row and column indices associated with any given single character index.  I just needed to test whether the character index was between two accumulated last column index in the lastColumnIndices array.

{% highlight javascript %}
this.getRowColumnIndices = function(characterIndex) {
    var lastColumnIndices = this.getLastColumnIndices();
    if (characterIndex <= lastColumnIndices[0]) {
        return {row: 0, column: characterIndex};
    }
    var row = 1;
    for (var i = 1; i < lastColumnIndices.length; i++) {
        if (characterIndex > lastColumnIndices[i]) {
            row = i+1;
        }
    }
    var column = characterIndex - lastColumnIndices[row-1] - 1;
    return {row: row, column: column};
};
{% endhighlight %}

### Selecting the Appropriate Code in the Ace Editor

Now that these utility functions have been created, it's fairly straightforward to create a version of `setSelectionRange()` to use with two single character indices instead of a `Range`.  I called this new function `setSelectionRangeIndices()`.

{% highlight javascript %}
this.setSelectionRangeIndices = function(start, end, reverse) {
    var startRowColumn = this.getRowColumnIndices(start);
    var endRowColumn = this.getRowColumnIndices(end);
    this.setSelectionRange({
        start: {
            row: startRowColumn.row,
            column: startRowColumn.column
        },
        end: {
            row: endRowColumn.row,
            column: endRowColumn.column
        }
    }, reverse);
};
{% endhighlight %}

Then from within my code I could call this function like below where start is the single character index of the starting position and end is the single character index of the ending position:

{% highlight javascript %}
editor.getSelection().setSelectionRangeIndices(start, end);
{% endhighlight %}


