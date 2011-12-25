--- 
title: The jQuery Tools API Pattern
date: 08/06/2010
---

[recently asked this question]: http://forum.jquery.com/topic/return-customized-default-values-for-each-in-a-plugin
[jQuery Tools]: http://flowplayer.org/tools/
[full jQuery Tools API documentation]: http://flowplayer.org/tools/documentation/scripting.html#api

A common pattern for initializing jQuery plugins is by selecting all the instances of the target in the DOM and running the plugin once. For example:

    :::javascript
    $(":input").myPlugin();

But what if you need to inspect the plugin later or are only interested in one instance of the plugin. A friend of mine [recently asked this question] and my suggestion was to look at the way the [jQuery Tools] project does it. For each of their plugins, they build an API object which only interacts with one specific element and they attach it to the element once the plugin has been initialized using the jQuery.data method. This also provides a clean way of checking if the plugin has already been initialized on a specific element.

Here's how they run their scrollable plugin when called by jQuery:

    :::javascript
	  // jQuery plugin implementation
	  $.fn.scrollable = function(conf) { 
			
		  // already constructed --> return API
		  var el = this.data("scrollable");
		  if (el) { return el; }		 

		  conf = $.extend({}, $.tools.scrollable.conf, conf); 
		
		  this.each(function() {			
			  el = new Scrollable($(this), conf);
			  $(this).data("scrollable", el);	
		  });
		
		  return conf.api ? el: this; 
		
	  };

The <tt>Scrollable</tt> function handles plugin initialization on a per-element basis and returns scoped methods for interacting with that object. Its implementation looks like this:

    :::javascript
	  function Scrollable(root, conf) {   
		  // Setup variables
		  
		  // methods
		  $.extend(self, {
			  getConf: function() {
				  return conf;	
			  },			
		    // et cetera
		  });
		    
		  // callbacks	
		  $.each(['onBeforeSeek', 'onSeek', 'onAddItem'], function(i, name) {
				
			  // configuration
			  if ($.isFunction(conf[name])) { 
				  $(self).bind(name, conf[name]); 
			  }
			
			  self[name] = function(fn) {
				  $(self).bind(name, fn);
				  return self;
			  };
		  });  
		
		  // run methods
		}

Now, let's assume we have applied this pattern to our <tt>myPlugin</tt> plugin. The interaction would look like this.

    :::javascript
    $(":input").myPlugin();
    
    var specificInput = $("#myinput");
    var api = specificInput.data("myPlugin");
    
    api.getConf()     // See the original config variables
    api.doSomething() // run some code
    api.destroy()     // remove the plugin
    
    // Run a callback on this specific instance
    api.onClick(function() { 
      // Click handler
    });

The pattern would also handle accidently running the plugin twice on a single element. For example, in the following script the plugin would only initialize the <tt>#myinput</tt> element once:

    :::javascript
    $("#myinput").myPlugin();
    $(":input").myPlugin();

The [full jQuery Tools API documentation] is available on their website.
