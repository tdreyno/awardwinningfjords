source "http://rubygems.org"

gem "unicorn"

group :production do
  gem "dalli"
  gem "rack-cache"
  gem "rack-contrib"
end

group :development do
  gem "builder"
  gem "rdiscount"
  gem "middleman", :git => "git://github.com/tdreyno/middleman.git"
  gem "heroku"
  gem "foreman"
end