---
layout: post
title: From Iterative to Recursive
description: 
modified: 2014-01-16
tags: [toy problems, algorithms]
image:
  feature: recursion.jpg
comments: true
share: true
---

## Turn an Iterative Function with For Loops into a Recursive Function
Here's a step-by-step demonstration of how to turn the iterative [Rock Paper Scissors](http://jgpettibone.github.io/rock-paper-scissors/) solution into the recursive one.

### The Iterative Solution:

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

### Step One: Start at the Inner-Most For-Loop and Create a New Function
In this example, we'll want to refactor the line of code that pushes the possible outcomes (`[plays[k], plays[j], plays[i]]`) into the `outcomes` array as a separate and stand-alone function.

Let's call this new function `combos_0` (we'll be making a number of these `combos` functions).  Since `combos_0` is going to push an array into `outcomes`, `combos_0` needs to take an array as an argument.  Let's call this `playedSoFar` since it will collect each of three plays in the three rounds.

{% highlight javascript %}
var combos_0 = function(playedSoFar) {
  outcomes.push(playedSoFar);
};
{% endhighlight %}

This function above will be invoked when we're done with the recursion.

### Step Two: Go Loop By Loop and Create New Functions
We'll start at the deepest of these loops and then work our way up.  This gives us three different functions, one for each of the nested for loops.  At each stage, we concatenate the play at each of the indices of the `plays` array into the `playedSoFar` array.       

{% highlight javascript %}
var combos_1 = function(playedSoFar) {
  for (var i = 0; i < plays.length; i++) {
    playedSoFar.concat(plays[i]);
  }
};

var combos_2 = function(playedSoFar) {
  for (var j = 0; j < plays.length; j++) {
    playedSoFar.concat(plays[j]);
  }
};

var combos_2 = function(playedSoFar) {
  for (var k = 0; k < plays.length; k++) {
    playedSoFar.concat(plays[k]);
  }
};
{% endhighlight %}

It's clear from the three functions above that there is a pattern here that is particularly good for recursion - the work can be divided into smaller parts that all do the same thing.  We can combine the three functions `combos_1`, `combos_2`, and `combos_3` into one function that is invoked when with the recursive call.  

### Step Three: Putting the Recursive Subroutine Together
Now we need to figure out how the parts from Step One and Step Two fit together in a recursive subroutine.

#### Recursion
The three functions called `combos_1`, `combos_2`, and `combos_3` are turned into one recursive function.  Let's call this recursive subroutine `getOutcomes`.  When we make these three functions into just one, we'll need an alternative way of building up the `playedSoFar` array other using the indices `i`, `j`,  and `k`.  Here we'll do this by using concatenation.  Each play in an outcome will be concatenated into the `playedSoFar` array.

{% highlight javascript %}
for (var i = 0; i < plays.length; i++){
  getOutcomes(playedSoFar.concat[i]);
}
{% endhighlight %} 

So `playedSoFar` will need to be an argument passed into the recursive subroutine `getOutcomes`.

#### Exit Strategy - When is the Recursion Finished? 
In this example, there are 3 rounds being played (represented by the three nested loops in the iterative function).  We're done with the recursion when we go through all the rounds and there are no more rounds left to play.  If we have a variable called `roundsLeft` that stores this information, we'll be done when `roundsLeft` is zero.  So `combos_0` turns into the following:

{% highlight javascript %}
if (roundsLeft === 0) {
  outcomes.push(playedSoFar);
};
{% endhighlight %} 

So `roundsLeft` will need to be an argument passed into the recursive subroutine `getOutcomes`.

#### Keeping Track of Rounds Left
We'll need to include `roundsLeft` as an argument of the recursive function so we'll modify the recurive call as such:

{% highlight javascript %}
for (var i = 0; i < plays.length; i++){
  getOutcomes(playedSoFar.concat[i], roundsLeft);
}
{% endhighlight %} 

#### The Recursive Subroutine

{% highlight javascript %}
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
{% endhighlight %} 

### Step Four: Replacing the Iterative For Loops with the Recursive Subroutine
After completing the steps above, we can put the recursive subroutine in where the nested for loops were in the iterative approach.  And there is one more thing we have to do - call the recursive function with the appropriate arguments.  In this case, `playedSoFar` starts as the empty array and `roundsLeft` starts as 3, the number of rounds of play specified in this example.

{% highlight javascript %}
var rockPaperScissors = function() {
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
  getOutcomes([], 3);
  return outcomes;
};
{% endhighlight %}

Note: It is now trivial to make this function work with any number of rounds, not just 3.  We can do this by allowing `rockPaperScissors` to take an argument called `rounds` that specifies the number of rounds of play.  See the code below for this alternative:

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

