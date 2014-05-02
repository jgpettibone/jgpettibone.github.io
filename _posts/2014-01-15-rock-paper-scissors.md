---
layout: post
title: Rock Paper Scissors
description: 
modified: 2014-05-02
tags: [toy problems, algorithms]
image:
  feature: rock-paper-scissors.jpg
comments: true
share: true
---

## The Problem
Write a function that generates every sequence of throws a single player could throw over a three-round game of rock-paper-scissors.  For instance, one player might play 'rock' in every round so the outcome for this player would be ['rock', 'rock', 'rock'].  Another player might choose a different play in each round so the outcome would be something like ['paper', 'rock', 'scissors'].  

## Understanding the Problem
This is a combinatorics problem.  We already know that there will be 27 solutions to this problem: there are three possible plays in the first round, three possible plays in the second round, and three possible plays in the third round - 3 x 3 x 3 = 27.

The solution to this problem will be an array containing 27 arrays, each corresponding to one possible outcome.  For instance:

{% highlight javascript %}
[
  ['rock', 'rock', 'rock'],
  ['rock', 'rock', 'paper'],
  ['rock', 'rock', 'scissors'],
  ['rock', 'paper', 'rock'],
  ['rock', 'paper', 'paper'],
  ...
  ['scissors', 'scissors', 'rock'],
  ['scissors', 'scissors', 'paper'],
  ['scissors', 'scissors', 'scissors'],
]
{% endhighlight %}

## The Code

### Input and Output
The three possible plays are stored in an array called `plays`.  The return matrix is stored in a variable called `outcomes`.

## An Iterative Approach
Since we know that there are exactly three rounds in the game, we can easily create a series of three nested for loops to find the answer to this problem.    

{% highlight javascript %}
var rockPaperScissors = function() {
  var outcomes = [];
  var plays = ['rock', 'paper', 'scissors'];
  for (var k = 0; k < plays.length; k++) {
    for (var j = 0; j < plays.length; j++) {
      for (var i = 0; i < plays.length; i++) {
        outcomes.push([plays[k], plays[j], plays[i]]);
      }
    }
  }
  return outcomes;
};
{% endhighlight %}

## What if ... ?
What if we didn't know how many rounds the players would play?  How could we modify this function to deal with any number of rounds?  It would be really difficult to create an iterative approach like this when the number of rounds is determined by user input.  A recursive approach would make this problem much easier.

## A Recursive Approach
For a step-by-step way of turning an iterative function into a recursive, check out the [From Iterative to Recursive](http://jgpettibone.github.io/from-iterative-to-recursive/) post.

### The basic structure of recursion
Because the number of rounds is now variable, this number will be the argument passed into the `rockPaperScissors` function.  Let's call this parameter `rounds`.

We'll put a recursive subroutine called `getOutcomes` instead the main `rockPaperScissors` function.  This function would go where the for loops were in the iterative solution:

{% highlight javascript %}
var rockPaperScissors = function(rounds) {

  var outcomes = [];
  var plays = ['rock', 'paper', 'scissors'];

  var getOutcomes = function() {    
    // the recursive function
  };

  getOutcomes();
  return outcomes;
};
{% endhighlight %}

### Arguments 
There are two things that we need to keep track of with each call of our recursive function so let's make these arguments of the recursive function.  

First, we need to keep track of the plays that we have played so far.  This can be stored in a variable called `playedSoFar`.  We also need to keep track of the number of rounds left.  This can be stored in a variable called `roundsLeft`.  This recursive subroutine will be called with the empty array for `playedSoFar` and `rounds` for `roundsLeft`. 

{% highlight javascript %}
  var getOutcomes = function(playedSoFar, roundsLeft) {    
    // the recursive function
  };
  getOutcomes([],rounds);
{% endhighlight %}

### Inside the Recursive Function

#### Exit Strategy
We've reached the end of the game when there are no more rounds left.  So once `roundsLeft` is zero, we're ready to push the possible plays that we've gathered into the `outcomes` array that the function will return.

{% highlight javascript %}
    if (roundsLeft === 0) {
      outcomes.push(playedSoFar);
    }
{% endhighlight %}

#### Recursing
If there are still rounds left, we want to keep gathering plays.  We'll need to iterate over the `plays` array and call the recursive subroutine `getOutcomes` for each of these possible plays.

{% highlight javascript %}
    else {
      for (var i = 0; i < plays.length; i++) {
        getOutcomes(playedSoFar.concat(plays[i]), roundsLeft-1);
      }
    }
{% endhighlight %}

### Putting it all together
Now that we know the logic that happens inside of the recursive subroutine, we can put the whole `rockPaperScissors` function together.  Note that it accepts an argument called `rounds`.  If the argument is undefined, we'll default that value to 3.

{% highlight javascript %}
var rockPaperScissors = function(rounds) {
  rounds = rounds || 3;
  var outcomes = [];
  var plays = ['rock', 'paper', 'scissors'];
  var getOutcomes = function(playedSoFar, roundsLeft) {    
    if (roundsLeft === 0) {
      outcomes.push(playedSoFar);
    }
    else {
      for (var i = 0; i < plays.length; i++) {
        getOutcomes(playedSoFar.concat(plays[i]), roundsLeft-1);
      }
    }
  };
  getOutcomes([], rounds);
  return outcomes;
};
{% endhighlight %}






