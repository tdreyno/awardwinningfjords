require "susy"

page "/*", :layout_engine => 'erb', :layout => :article_layout

set :disqus, "awf"
#activate :blog_engine
#set :blog_engine_permalink, ":year/:month/:day/:title"
# set :disqus,    'awf'                                     # disqus id, or false
#set :summary,   :max => 150, :delim => /READMORE/
data_content :blog, {
  :article => {
    :title => "Sup",
    :url   => "/hi",
    :path  => "/hi",
    :date  => Date.today
  },
  :articles => [
    {
      :title => "Sup",
      :url   => "/hi",
      :path  => "/hi",
      :date  => Date.today
    }
  ]
}

helpers do 
  def title
    "hi"
  end
end

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