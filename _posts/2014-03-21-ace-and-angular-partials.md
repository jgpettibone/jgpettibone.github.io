---
layout: post
title: The Ace Editor and Angular Partials
description: 
modified: 2014-03-21
tags: [ace editor, angular]
image:
  feature: ace-code-editor.png
comments: true
share: true
---

## The Ace Editor
I embedded the [Ace editor](http://ace.c9.io/#nav=about) into Visual Interpreter, a JavaScript interpreter tool for visualizing in-memory model values and scopes as well as doing inline code evaluation.  This is the third post about using Ace for this project.  The other two blogs are:

* [Selection Highlighting with the Ace Editor](http://jgpettibone.github.io/ace-selection-highlighting/)
* [The Ace Editor and Manipulating Font Colors](http://jgpettibone.github.io/ace-and-manipulating-font-colors/)

## The Ace Editor in an Angular Directive
We had originally designed our app so that we only needed one instance of the Ace editor on the main page.  Since we were using [Angular](http://angularjs.org/) as our framework, I decided to put the editor in a [directive](http://docs.angularjs.org/guide/directive) in the main app module.    

{% highlight javascript %}
app.directive('aceEditor', function() {
  return {
    require: '?ngModel',
    link:link
  };
  function link(scope, elem, attrs, ngModel) {
    var editor = ace.edit('editor');
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.getSession().setTabSize(2);
    scope.editor = editor;
  };
});
{% endhighlight %}

and then it was inserted into the html as such:

{% highlight html %}
<div id='editor' ace-editor ng-model='codeText'></div>
{% endhighlight %}

## Embedding the Ace Editor in Multiple Angular Partials
As we started building up the app, we added partials and other instances of the Ace Editor in those partials.  We noticed switching between partials without re-loading the page was breaking the editor.  After a bit of investigation, it became clear that embedding the editor using the id 'editor' was not sufficient when the DOM updated.  

I changed 

{% highlight javascript %}
    var editor = ace.edit('editor');
{% endhighlight %}

to

{% highlight javascript %}
    var editor = ace.edit(elem[0]);
{% endhighlight %}

and then the editor would be able to update dynamically with the DOM element.
