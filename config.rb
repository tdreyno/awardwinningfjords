require "susy"

# page "/*", :layout_engine => 'erb', :layout => :article_layout

page "/feed.xml", :layout => false

activate :blog
# set :blog_permalink, "/:year/:month/:day/:title.html"
set :disqus, "awf"

#set :summary,   :max => 150, :delim => /READMORE/

require 'coderay'
require 'rack/codehighlighter'

use Rack::Codehighlighter, :coderay, :markdown => true, :element => "pre>code", 
  :pattern => /\A:::([-_+\w]+)\s*(\n|&#x000A;)/, :logging => false

# Per-page layout changes
# With no layout
# page "/path/to/file.html", :layout => false
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout

# Build-specific configuration
configure :build do
  Compass.configuration do |config|
    config.line_comments = false
  end

  # For example, change the Compass output style for deployment
  activate :minify_css
  
  # Minify Javascript on build
  activate :minify_javascript
  
  # Enable cache buster
  # activate :cache_buster
end