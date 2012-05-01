page "/feed.xml", :layout => false

require "middleman-blog"
activate :blog do |blog|
  blog.sources = ":year/:month/:day/:title.html"
end

set :markdown, :tables => true, :autolink => true

# Build-specific configuration
configure :build do
  activate :cache_buster

  # For example, change the Compass output style for deployment
  # activate :minify_css
  
  # Minify Javascript on build
  # activate :minify_javascript
end