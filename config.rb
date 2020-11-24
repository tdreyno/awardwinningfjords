page "/feed.xml", :layout => false

activate :blog do |blog|
  blog.sources = ":year/:month/:day/:title.html"
end

activate :syntax

set :markdown_engine, :redcarpet
set :markdown, :tables => true, :autolink => true, :gh_blockcode => true, :with_toc_data => true

configure :production do
  activate :minify_css
end