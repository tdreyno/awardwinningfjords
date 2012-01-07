---
title: Introducing iPhone-style Checkboxes
slug: iphone-style-checkboxes
date: 2009/06/16
---

[Prototype version]:    /2009/06/29/prototype-iphone-style-checkboxes.html
[ExtJS version]:        http://github.com/steelThread/ExtJs-ToggleSlide
[Download the package]: http://github.com/tdreyno/iphone-style-checkboxes/zipball/master
[https://github.com/tdreyno/iphone-style-checkboxes]: https://github.com/tdreyno/iphone-style-checkboxes

Ever wanted those flash iPhone on/off toggle switches on your webpage? Love jQuery? Well then I've got something special for you. iphone-style-checkboxes implements the iPhone toggles as replacements for standard HTML checkboxes. Simply run the script and your site will be updated with these specialized controls. Best of all, the underlying checkbox is not touched and backend system will never know the difference. The change is purely visual.

[UPDATED: Now with Prototype-based version here.][Prototype version]

[UPDATED2: Now with ExtJS-based version here.][ExtJS version]

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

Download and implement
----------------------

In keeping with the jQuery philosophy, using the iphone-style-checkboxes library is very simple.
[Download the package],
unzip it and place the javascript, images and stylesheet where you please. You'll need to update the stylesheet to point to the new location of your images if they have changed relative to the stylesheet.

Once the files are available to your site, activating the script is very easy:

    :::html
    <head>
      <script src="jquery-1.4.js" type="text/javascript"></script>
      <script src="jquery/iphone-style-checkboxes.js" type="text/javascript"></script>
      <link rel="stylesheet" href="path_to/style.css" type="text/css" media="screen" />
      <script type="text/javascript">
        $(document).ready(function() {
          $(':checkbox').iphoneStyle();
        });
      </script>
    </head>

The initialization method takes a handful of options.

<ul>
  <li><tt>checkedLabel</tt> sets the text of the "on" state. Defaults to: <strong>ON</strong></li>
  <li><tt>uncheckedLabel</tt> sets the text of the "off" state. Defaults to: <strong>OFF</strong></li>
</ul>

For example:

    :::javascript
    $(':checkbox').iphoneStyle({
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

Contribute
----------

The source is available, and forkable, on GitHub at
[https://github.com/tdreyno/iphone-style-checkboxes].
Please direct comments, support requests, bug reporting and pull requests to there.

<script src='/projects/iphone-style-checkboxes/jquery.min.js' type='text/javascript'></script>
<script src='/projects/iphone-style-checkboxes/iphone-style-checkboxes.js' type='text/javascript'></script>
<link href='/projects/iphone-style-checkboxes/style.css' media='screen' rel='stylesheet' type='text/css'>
<script src='/projects/iphone-style-checkboxes/setup.js' type='text/javascript'></script>