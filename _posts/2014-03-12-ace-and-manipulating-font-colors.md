---
layout: post
title: The Ace Editor and Manipulating Font Colors
description: 
modified: 2014-03-12
tags: [ace editor, fonts, css, jquery]
image:
  feature: ace-code-editor.png
comments: true
share: true
---

## The Ace Editor and the DOM
I needed to figure out how to change the font color of text within for a given Range in my embedded [Ace editor](http://ace.c9.io/#nav=about).  More specifically, I wanted the text to dim or gray out (as if it was commented out code) in certain circumstances without actually commenting the code with `//` at the beginning of the line or with a block of text between `/*` and `*/`.  Basically, I was hoping to find a way to directly add a class to the actual text.

At the time of this post, Ace had no feature to manipulate font color so I came up with a hack to directly access the DOM and use jQuery to manipulate the font with css.  My final code looked like this: 

{% highlight javascript %}
this.dimFunctionBody = function(editor, start, end) {
  var startRow = editor.getSelection().getRowColumnIndices(start).row;
  var endRow = editor.getSelection().getRowColumnIndices(end).row;
  for (var i = startRow+1; i < endRow; i++) {
    $(editor.renderer.$textLayer.element.childNodes[i]).addClass('ace_dimmer');
    $(editor.renderer.$textLayer.element.childNodes[i].children).addClass('ace_dimmer');
  }
};
{% endhighlight %}

Note that in the code above I'm using `getRowColumnIndices`, a functions I built to convert a single character index into a row and column indices to make an Ace Range.  You can read more about this in my previous blog post on [Selection Highlighting with the Ace Editor](http://jgpettibone.github.io/ace-selection-highlighting/).

I then added the .ace_dimmer class to all the relevant classes in the theme-monokai.js file (since I was using the Monokai theme).  This could probably be handled in a better way.  Perhaps this is [a case for using `!important`](http://css-tricks.com/when-using-important-is-the-right-choice/).

{% highlight css %}
.ace-monokai .ace_line.ace_dimmer,\
.ace-monokai .ace_punctuation.ace_dimmer, \
.ace-monokai .ace_punctuation.ace_tag.ace_dimmer, \
.ace-monokai .ace_punctuation.ace_operator.ace_dimmer, \
.ace-monokai .ace_support.ace_constant.ace_dimmer, \
.ace-monokai .ace_support.ace_function.ace_dimmer,  \
.ace-monokai .ace_identifier.ace_dimmer, \
.ace-monokai .ace_storage.ace_type.ace_dimmer,\
.ace-monokai .ace_keyword.ace_dimmer, \
.ace-monokai .ace_keyword.ace_operator.ace_dimmer, \
.ace-monokai .ace_constant.ace_character.ace_dimmer, \
.ace-monokai .ace_constant.ace_language.ace_dimmer, \
.ace-monokai .ace_constant.ace_numeric.ace_dimmer, \
.ace-monokai .ace_constant.ace_other.ace_dimmer,  \
.ace-monokai .ace_entity.ace_name.ace_function.ace_dimmer,\
.ace-monokai .ace_entity.ace_other.ace_dimmer,\
.ace-monokai .ace_entity.ace_other.ace_attribute-name.ace_dimmer,\
.ace-monokai .ace_variable.ace_dimmer {\
color: #75715E\
{% endhighlight %}


