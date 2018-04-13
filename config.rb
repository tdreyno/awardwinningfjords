page "/feed.xml", :layout => false

activate :blog do |blog|
  blog.sources = ":year/:month/:day/:title.html"
end

set :markdown_engine, :redcarpet
set :markdown, :tables => true, :autolink => true, :gh_blockcode => true, :with_toc_data => true

# Build-specific configuration
configure :build do
  ignore "stylesheets/bower_components/*"
end

configure :production do
  activate :minify_css
end