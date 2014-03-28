---
layout: post
title: Coin Sums Performance
description: 
modified: 2014-02-05
tags: [toy problems, algorithms]
image:
  feature: britishcoinspile.jpg
  credit: wwarby
  creditlink: http://www.flickr.com/photos/wwarby/
comments: true
share: true
---

## Coin Sums
In my earlier post on how to solve [Coin Sums](http://jgpettibone.github.io/coin-sums/), I presented an efficient solution.  However, I did not get to this efficient solution right away.  I've put four different versions of [Coin Sums on JSPerf](http://jsperf.com/coin-sums-performance) to show their various performances.    

## Explanation
Here is additional information about the choices made to improve algorithm efficiency.

### First Version with Object
I started thinking about this problem as a combinatorics problem and therefore designed it to be similar to the recursive version of the Rock Paper Scissors solution.  Compare the solution below to that solution.

However, you can't write this solution exactly like Rock Paper Scissors.  If you did, you would count '1p,2p' and '2p,1p' as two different ways for the coins to sum up to 3p, for example.  I included a constraint that once we start putting a coin in a 'pile' of coins, we should only continue putting coins of equal or greater value into that pile.  This gives us '1p,2p' but not '2p,1p'.  This constraint is `coins[coin] >= lastCoin` in the code below.  

{% highlight javascript %}
var makeChange = function(total) {

  var coins = {
    '1p': 1,
    '2p': 2,
    '5p': 5,
    '10p': 10,
    '20p': 20,
    '50p': 50,
    '1 pound': 100,
    '2 pounds': 200
  }

  // the counter tells us the total number of ways to get to the total
  var count = 0;
  var getChangeCount = function(value, lastCoin) {

    // exit strategy - only need to keep a count when we reach an exact value
    // (instead of pushing the pile onto an array)
    if (value === 0) {
      count++;
    } else if (value > 0) {
      for (var coin in coins) {
        if (coins[coin] <= value && coins[coin] >= lastCoin) {
          getChangeCount(value - coins[coin], coins[coin]);
        }
      }
    }
  }
  getChangeCount(total, 1);
  return count;
};  
{% endhighlight %}
 
The most surprising thing about the performance of this version is how incredibly slow this version was.  Before using JSPerf, I did a quick test using the Chrome Dev Tools console.  It took 17761 ms to run `makeChange(200)`.  This is an incredibly inefficient way of doing this problem!

### First Version with Array
I knew that there was no reason to use an object to store the values of the coins so the first thing I did was swap the object for a simple array.  

{% highlight javascript %}
var coins = [1, 2, 5, 10, 20, 50, 100, 200];
{% endhighlight %}

The new code looks like this:

{% highlight javascript %}
var makeChange = function(total) {
  var count = 0;
  var coins = [1, 2, 5, 10, 20, 50, 100, 200];  
  var getChangeCount = function(value, lastCoin) {
    if (value === 0) {
      count++;
    } else if (value > 0) {
      for (var i = 0; i < coins.length; i++) {
        if (coins[i] <= value && coins[i] >= lastCoin) {
          getChangeCount(value-coins[i], coins[i]);
        }
      }
    }
  }
  getChangeCount(total, 1);
  return count;
};
{% endhighlight %}

This change in the data strcuture alone dropped the runtime in the Chrome Dev Tools console from 17761 ms down to 128 ms for `makeChange(200)`!

### Second Version
In this version, instead of using the constraint `coins[coin] >= lastCoin` which has us ignore certain coins, let's reduce the array itself so that we'll be iterating over fewer items in total.

{% highlight javascript %}
var makeChange = function(total) {
  var coins = [1,2,5,10,20,50,100,200];
  var count = 0;
  // the coins array gets modified with each recursive call
  // our recursive function takes two arguments:
  // (1) the modified coins array and (2) the total value still needed
  var changer = function(coinsLeft, value) {
    // we follow the pattern - that we don't need to iterate over all the coins
    // for every call
    var currentCoin = coinsLeft.pop();
    // exit strategy - when our coins array is empty
    if (coinsLeft.length === 0) {
      count++;
      return;
    }
    // as long as the total value still needed is greater than or equal to 0, 
    // we keep trying to add coins to our pile
    while(value >= 0) {
      // call the function with a copy of the array and the total value still needed
      changer(coinsLeft.slice(), value);
      // reduce the total value still needed by the value of the coin popped
      value -= currentCoin;
    }
  };
  changer(coins, total);
  return count;
};
{% endhighlight %}

With these modifications, the quick runtime test in the Chrome Dev Tools console further reduced from 128 ms to 24 ms for `makeChange(200)`.  This is great progress.  But we're not done yet!      

### Third Version
In the second version, the `coinsLeft` array was being mutated with `pop()`.  This is not ideal.  And we actually don't want to copy the `coinsLeft` array (as when using `slice()`) since this is a linear algorithm.  Instead, the third version uses the original `coins` array and keeps track of the coin we want to add to our 'piles' by using an index.  This third version is the one explained in the [Coin Sums](http://jgpettibone.github.io/coin-sums/) post.  

{% highlight javascript %}
var makeChange = function(total){
  var count = 0;
  var coins = [1, 2, 5, 10, 20, 50, 100, 200];
  var changer = function(index, value){
    var currentCoin = coins[index];
    if( index === 0){
      if( value % currentCoin === 0){
        count++;
      }
      return;
    }
    while( value >= 0 ){
      changer(index-1, value);
      value -= currentCoin;
    }
  }
  changer(coins.length-1, total);
  return count;
};
makeChange(200);
{% endhighlight %}

The quick runtime test went from 24 ms for `makeChange(200)` to 2ms.  With this version I was finally satisfied with the algorithm's performance.  Check out the [JSPerf on Coin Sums](http://jsperf.com/coin-sums-performance)!  
