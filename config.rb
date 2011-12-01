require "susy"

set :markdown_engine, :redcarpet

page "/feed.xml", :layout => false
page "/mint/*", :layout => false

require "middleman-blog"
activate :blog
set :disqus, "awf"

# activate :livereload

require 'rack/codehighlighter'
use Rack::Codehighlighter, 
  :pygments_api,
  :element => "pre>code",
  :pattern => /\A:::([-_+\w]+)\s*\n/,
  :markdown => true

# Build-specific configuration
configure :build do
  Compass.configuration do |config|
    config.line_comments = false
  end
  
  activate :cache_buster

  # For example, change the Compass output style for deployment
  activate :minify_css
  
  # Minify Javascript on build
  activate :minify_javascript
end