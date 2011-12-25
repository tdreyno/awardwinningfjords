page "/feed.xml", :layout => false

require "middleman-blog"
activate :blog

set :markdown, :tables => true

require "pygments"
require 'rack/codehighlighter'
use Rack::Codehighlighter, 
  :pygments,
  :element => "pre>code",
  :pattern => /\A:::([-_+\w]+)\s*\n/,
  :markdown => true

# Build-specific configuration
configure :build do
  activate :cache_buster

  # For example, change the Compass output style for deployment
  activate :minify_css
  
  # Minify Javascript on build
  activate :minify_javascript
end