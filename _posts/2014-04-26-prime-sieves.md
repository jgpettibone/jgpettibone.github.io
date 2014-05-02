---
layout: post
title: Prime Sieves
description: 
modified: 2014-04-26
tags: [toy problems, algorithms, jsperf]
image:
  feature: primesieve.jpg
comments: true
share: true
---

## Testing for Prime Numbers
It seems like a common toy problem is writing a function that tests whether or not a number is prime (only divisable by itself and 1).  This toy problem, however, soon started a discussion on how much could be gained by using a prime sieve (such as the [Sieve of Eratosthenes](http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) or the [Sieve of Sundaram](http://en.wikipedia.org/wiki/Sieve_of_Sundaram)) for finding all primes in a range instead of simply looping through and testing each number.  Three of us quickly wrote up a few different versions and tested them in JS Perf.  You can find the results [here](http://jsperf.com/primefinder/5).

It is difficult to do a direct comparison, however, because of the different coding styles and algorithm design choices.  There was no coordination to make these uniform as all the testing was done after the fact.  If I have time to create more uniform code, I will update this post.
