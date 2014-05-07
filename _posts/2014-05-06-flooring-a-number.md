---
layout: post
title: Flooring a Number
description: 
modified: 2014-05-06
tags: [bitwise operators, floor, math]
image:
  feature: abstract-4.jpg
comments: true
share: true
---

## Flooring a Number with Bitwise OR
Somewhere along the way, I stopped using JavaScript's Math.floor() function and I started using bitwise OR 0 such as in the following example:

{% highlight javascript %}
2.145 | 0  // 2
{% endhighlight %}

In fact, there are other ways of flooring a number by using bitwise operators.  Some of the best known are:

* left shift (<<)
{% highlight javascript %}
2.145 << 0  // 2
{% endhighlight %}

* double NOT (~~)
{% highlight javascript %}
~~2.145  // 2
{% endhighlight %}

There are many posts out there about the relative speed of these different methods, most of which insist that Math.floor() is slow.  One [JS Perf on bitwise NOT vs Math.floor()](http://jsperf.com/jsfvsbitnot/8) shows this isn't necessarily the case and another - [JS Perf or-vs-floor](http://jsperf.com/or-vs-floor/2) - shows that perhaps it is.

But I continued to use bitwise OR 0 without really researching exactly how it worked and whether it was really better than Math.floor().  Until today.

## What Happened?
I wrote a simple function that extended the Number prototype with a new method called `toEnglish` that returns the number as a string using English words.  For example:

{% highlight bash %}
> (123456789).toEnglish()
  "one hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine"
> (1000000000000).toEnglish()
  "one trillion"
{% endhighlight %}

But something happened when I tried to call this method on numbers greater than one trillion!  For the number 10,000,000,000,000, instead of getting the result "ten trillion" I got something very strange.

{% highlight bash %}
> (10000000000000).toEnglish()
  "one trillion four hundred ten billion sixty-five million four hundred eight thousand"
{% endhighlight %}

What?

## The Limitation of Bitwise Operators
I had run into the limitation of using bitwise OR.  Bitwise operators treat their operands as a sequence of 32 binary bits (zeros and ones) and will actually truncate larger numbers down to 32 bits.  So you really should only use bitwise operators when you know you'll be working with 32 bit numbers.  Note that the JavaScript Number Type, however, represents the double-precision 64-bit format IEEE 754 values (as taken from the [ECMAScript Language Specification](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf)).  

In my function, the line `num = num / 1000 | 0` was dividing the num 10000000000000 by 1000 and setting num to 10000000000, which is 34 bits, before using the bitwise OR.  

{% highlight bash %}
> (10000000000).toString(2)
  "1001010100000010111110010000000000"
{% endhighlight %}

Note that to find the binary (base 2) number from any decimal (base 10) number, you can put the base as an argument into the `toString()` function as in the example above.

## But How Do Bitwise Operators Work?
[Bitwise operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) work as follows (from MDN):

* The operands are converted into 32 bit integers and expressed as zeros and ones
* Each bit in the first operand is paired with the corresponding bit in the second operand: first bit to first bit, second bit to second bit, etc.
* The operator is applied to each pair of bits, and the result is constructed bitwise.

Below are some bitwise operators.

### Bitwise AND (&)

|   BASE 10 |               BASE 2             | 
|:----------|:--------------------------------:|
|    9      | 00000000000000000000000000001001 |
|    14     | 00000000000000000000000000001110 |
|           |:--------------------------------:|
|   14&9    | 00000000000000000000000000001000 |
{: rules="groups"}

### Bitwise OR (|)

|   BASE 10 |               BASE 2             | 
|:----------|:--------------------------------:|
|    9      | 00000000000000000000000000001001 |
|    14     | 00000000000000000000000000001110 |
|           |:--------------------------------:|
|   14\|9    | 00000000000000000000000000001111 |
{: rules="groups"}

### Bitwise XOR (^)

|   BASE 10 |               BASE 2             | 
|:----------|:--------------------------------:|
|    9      | 00000000000000000000000000001001 |
|    14     | 00000000000000000000000000001110 |
|           |:--------------------------------:|
|   14^9    | 00000000000000000000000000000111 |
{: rules="groups"}

### Bitwise NOT (~)

|   BASE 10 |               BASE 2             | 
|:----------|:--------------------------------:|
|    9      | 00000000000000000000000000001001 |
|           |:--------------------------------:|
|    ~9     | 11111111111111111111111111110110 |
{: rules="groups"}

### Bitwise Left Shift (<<)

|   BASE 10 |               BASE 2             | 
|:----------|:--------------------------------:|
|    9      | 00000000000000000000000000001001 |
|           |:--------------------------------:|
|   9<<2    | 00000000000000000000000000100100 |
{: rules="groups"}

### Bitwise (Sign-Propogating) Right Shift (>>)

|   BASE 10 |               BASE 2             | 
|:----------|:--------------------------------:|
|    9      | 00000000000000000000000000001001 |
|           |:--------------------------------:|
|   9>>2    | 00000000000000000000000000000010 |
{: rules="groups"}


## How Do Bitwise Operators Floor Numbers?
Bitwise operators floor numbers because they convert their operands into 32 bit integers.  However, it's doing this by truncation and not by rounding the number.  This means that for negative numbers, the results of using Math.floor() won't be the same as the results of using a bitwise operator.  Take a look at the following:

{% highlight bash %}
> Math.floor(2.134)
  2
> 2.134 | 0
  2
> Math.floor(-2.134)
  -3
> -2.134 | 0
  -2
{% endhighlight %}

There's also a difference with NaN:

{% highlight bash %}
> Math.floor(NaN)
  NaN
> NaN | 0
  0
{% endhighlight %}

