/**
 * jQWidon't v0.1 - Suppress typographic widows
 *   * http://davecardwell.co.uk/javascript/jquery/plugins/jquery-widont/0.1/
 *
 * Dave Cardwell <http://davecardwell.co.uk/>
 *
 * Built on the shoulders of giants:
 *   * John Resig <http://jquery.com/>
 *   * Shaun Inman <http://www.shauninman.com/plete/2006/08/...
 *                                             ...widont-wordpress-plugin.php>
 *
 *
 * Copyright (c) 2006 Dave Cardwell, dual licensed under the MIT and GPL
 * licenses:
 *   * http://www.opensource.org/licenses/mit-license.php
 *   * http://www.gnu.org/licenses/gpl.txt
 */
/**
 * For the latest version of this plugin, and a discussion of its usage and
 * implementation, visit:
 *   * http://davecardwell.co.uk/javascript/jquery/plugins/jquery-widont/
 */
new function(){function d(a){return a.replace(b.regexp,"&#160;$1")}function c(){$("h1,h2,h3,h4,h5,h6").widont()}var a={auto:function(a){return a!=undefined?b.auto=a:b.auto},init:function(){return b.init()},transform:function(a){return b.widont(a)}};$.jqwidont=a;var b={auto:!0,init:c,widont:d,regexp:new RegExp("[\\n\\r\\s]+([^\\n\\r\\s(?:&#160;)]+[\\n\\r\\s]*)$","m")};$(document).ready(function(){b.auto&&c()}),$.fn.widont=function(){return $(this).each(function(){var a=$(this);a.html(b.widont(a.html()))})}}