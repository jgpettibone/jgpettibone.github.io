---
layout: post
title: From Iterative to Recursive
description: 
modified: 2014-05-02
tags: [toy problems, algorithms]
image:
  feature: recursion.jpg
comments: true
share: true
---

## Thinking Recursively 
Thinking recursively doesn't come naturally to me so I am fascinated by the fact that iterative functions can be expressed recursively.  In this post I offer a step-by-step demonstration of how to turn the iterative [Rock Paper Scissors](http://jgpettibone.github.io/rock-paper-scissors/) solution into the recursive one. 

### Iteration or Recursion?
Besides just the pleasure of getting a better understanding of recursion, why would I want to turn an iterative function into a recursive one?  

* Flexibility: We use recursion when we have a complex task that can be broken up into many similar subtasks.  In the [Rock Paper Scissors](http://jgpettibone.github.io/rock-paper-scissors/) example, if we want the user to determine how many rounds of play will occur then we don't know in advance the number of iterations we'll need.  Recursion allows the flexibility to continue working on these subtasks for any number of iterations.  We just need to know when to stop / what the exit strategy is.

* Mutation: Recursion allows for iteration without mutation.  Mutating internal variables is usually harmless, but sometimes data mutation can cause unintended side effects.  (For more information, check out the wikipedia article on [Pure functions](http://en.wikipedia.org/wiki/Pure_function).)  In the [Rock Paper Scissors](http://jgpettibone.github.io/rock-paper-scissors/) example, we use .concat to create a new array with the additional element without modifying or destroying the original array.   

* Expressiveness and elegance: Recursive functions tend to be beautifully succint and it can be incredibly satisfying to write such elegant code.  This isn't always the case, however.  Some algorithms naturally lend themselves better to one approach or another.  For more complex systems, we often spend more time testing and debugging code than we do writing it so it's important to think of the readability of your code as well as the ease of maintenance.

But there are alos some reasons why I might not want a recursive solution.  A recursive function calls itself to complete each of its subtasks.  Each of these function calls gets put on the function call stack until that function is completed. 

* Performance: In general, recursion tends to run more slowly than iteration because there is the overhead cost of multiple function calls. 

* Stack space: Each of these function calls gets added to the stack and stack space is limited.  This can eventually cause a stack overflow.

Of course, there are ways to minimize performance and stack space issues, but that's not the focus of this post.

## Step-By-Step from the Iterative Solution:

Let's start with the case that there are three rounds of play and therefore three nested for loops:

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
    playedSoFar.push(plays[i]);
  }
};

var combos_2 = function(playedSoFar) {
  for (var j = 0; j < plays.length; j++) {
    playedSoFar.push(plays[j]);
  }
};

var combos_3 = function(playedSoFar) {
  for (var k = 0; k < plays.length; k++) {
    playedSoFar.push(plays[k]);
  }
};
{% endhighlight %}

It's clear from the three functions above that there is a pattern here that is particularly good for recursion - the work can be divided into smaller subtasks that all do the same thing.  We can combine the three functions `combos_1`, `combos_2`, and `combos_3` into one function that is invoked when with the recursive call.  

### Step Three: Putting the Recursive Subroutine Together
Now we need to figure out how the parts from Step One and Step Two fit together in a recursive subroutine.  We'll call this subroutine `getOutcomes`.

#### Combining the `combos_n` functions
We'll use the for loop found in the `combos` functions to iterative over the plays list but now we'll be completing the subtasks by calling the recursive subroutine. 

{% highlight javascript %}
for (var i = 0; i < plays.length; i++){
  getOutcomes(                       );
}
{% endhighlight %} 

But what is the argument that goes into this subroutine?  How about the following?  

{% highlight javascript %}
playedSoFar.push(plays[i])
{% endhighlight %}

We actually want to make calls to the recursive function without mutating the original data.  We shouldn't use `push` to modify `playedSoFar` because it will mutate the array.  Instead, we need to use `concat` which creates a new array and is therefore not destructive.  

An example:

* Imagine `playedSoFar` contains ['rock'] 

* We want to iterate through the for loop so that each iteration adds one more possible play onto `playedSoFar` so that we get `playedSoFar` (['rock']) + 'rock' (['rock', 'rock']), `playedSoFar` (['rock']) + 'paper' (['rock', 'paper']), and `playedSoFar` (['rock']) + 'scissors' (['rock', 'scissors']).  

* DON'T USE PUSH: If we push each of these plays into `playedSoFar`, we'll get `playedSoFar` (['rock']) + 'rock' (['rock', 'rock']), `playedSoFar` (['rock', 'rock']) + 'paper' (['rock', 'rock', paper']), and `playedSoFar` (['rock', 'rock', paper']) + 'scissors' (['rock', 'rock', 'paper', 'scissors']). 

* DO USE CONCAT: Instead of using destructive `push`, we can use `concat` which creates a new array without mutating the original.  The new array is passed as an argument into the recursive subroutine and the original is used to concat the next elements.  This gives us what we want - `playedSoFar` (['rock']) + 'rock' (['rock', 'rock']), `playedSoFar` (['rock']) + 'paper' (['rock', 'paper']), and `playedSoFar` (['rock']) + 'scissors' (['rock', 'scissors'])

This gives us the following code:

{% highlight javascript %}
for (var i = 0; i < plays.length; i++){
  getOutcomes(playedSoFar.concat[i]);
}
{% endhighlight %} 

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

