---
title: iPhone-style Checkboxes for Prototype
slug: prototype-iphone-style-checkboxes
date: 2009-06-29
---

[Elijah Miller]:        http://jqr.github.com/
[download the package]: http://github.com/tdreyno/iphone-style-checkboxes/zipball/master
[original]:             /2009/06/16/iphone-style-checkboxes.html
[http://github.com/tdreyno/iphone-style-checkboxes]: http://github.com/tdreyno/iphone-style-checkboxes

Big thanks to [Elijah Miller] for stepping up and finishing the work on the Prototype version of the iPhone-style checkboxes. Elijah now has write-access to the official repository at GitHub and will be maintaining it alongside my jQuery version.

Examples
--------

<div class='table'>
  <table>
    <tr>
      <td style='vertical-align: middle !important;'>
        A checkbox defaulting to <strong>checked</strong>
      </td>
      <td>
        <input checked='checked' class='normal' type='checkbox' />
      </td>
    </tr>
    <tr>
      <td style='vertical-align: middle !important;'>
        A checkbox defaulting to <strong>unchecked</strong>
      </td>
      <td>
        <input class='normal' type='checkbox' />
      </td>
    </tr>
  </table>
</div>
<link charset='utf-8' href='/iphone-style-checkboxes/style.css' media='screen' rel='stylesheet' type='text/css' />
<script src='/iphone-style-checkboxes/prototype/prototype-1.6.0.3.js' type='text/javascript'></script>
<script src='/iphone-style-checkboxes/prototype/scriptaculous-effects-1.8.2.js' type='text/javascript'></script>
<script src='/iphone-style-checkboxes/prototype/iphone-style-checkboxes.js' type='text/javascript'></script>
<script type='text/javascript'>
  new iPhoneStyle('#post input[type=checkbox].normal');
</script>

Download and implement
----------------------

As with the jQuery version, [download the package], unzip it and place the javascript, images and stylesheet where you please. You'll need to update the stylesheet to point to the new location of your images if they have changed relative to the stylesheet.

Once the files are available to your site, activating the script is very easy:

    <head>
      <script src="prototype.js" type="text/javascript"></script>
      <script src="scriptaculous.js" type="text/javascript"></script>
      <script src="prototype/iphone-style-checkboxes.js" type="text/javascript"></script>
      <link rel="stylesheet" href="path_to/style.css" type="text/css" media="screen" />
      <script type="text/javascript">
        document.observe("dom:loaded", function() {
          new iPhoneStyle('input[type=checkbox]');
        });
      </script>
    </head>

The initialization method takes a handful of options.

<ul><li><tt>checkedLabel</tt> sets the text of the "on" state. Defaults to: <strong>ON</strong></li><li><tt>uncheckedLabel</tt> sets the text of the "off" state. Defaults to: <strong>OFF</strong></li></ul>

For example:

    new iPhoneStyle('input[type=checkbox]', {
      checkedLabel: 'YES',
      uncheckedLabel: 'NO'
    });

<div class='table'>
  <table>
    <tr>
      <td style='vertical-align: middle !important;'>
        A checkbox defaulting to <strong>checked</strong>
      </td>
      <td>
        <input checked='checked' class='yesno' type='checkbox' />
      </td>
    </tr>
    <tr>
      <td style='vertical-align: middle !important;'>
        A checkbox defaulting to <strong>unchecked</strong>
      </td>
      <td>
        <input class='yesno' type='checkbox' />
      </td>
    </tr>
  </table>
</div>
<script type='text/javascript'>
  new iPhoneStyle('#post input[type=checkbox].yesno', { checkedLabel: 'YES', uncheckedLabel: 'NO', background: '#F9F3E8' });
</script>

Original version and Contributing
---------------------------------

You can read about the original jQuery version [here][original].
Both versions are maintained using GitHub: [http://github.com/tdreyno/iphone-style-checkboxes]