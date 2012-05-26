set :autoload_sprockets, false

page "/feed.xml", :layout => false

# require "middleman-blog"
activate :blog do |blog|
  blog.sources = ":year/:month/:day/:title.html"
end

set :markdown_engine, :redcarpet
set :markdown, :tables => true, :autolink => true

# Build-specific configuration
configure :build do
  activate :asset_hash, :exts => ['.css'], :ignore => [/projects\//, /solarized_light/, /3d-accordion/]
  # activate :cache_buster

  # For example, change the Compass output style for deployment
  # activate :minify_css
  
  # Minify Javascript on build
  # activate :minify_javascript
  
  # Minify HTML
  # activate :minify_html
end