require 'toto'

class Toto::Article
  def path()
    self[:date].strftime("/%Y/%m/%d/#{slug}.html")
  end
end

# Rack config
require "rack/contrib/static_cache"
use Rack::StaticCache, :urls => ['/'], :root => 'build'

class NoWww
  def initialize(app)
    @app = app
  end
  
  def call(env)
    if env["HTTP_HOST"].include? "www."
      [301, { 
        "Location"     => env["rack.url_scheme"] + "://" + env["HTTP_HOST"].gsub("www.", "") + env["PATH_INFO"],
        "Content-Type" => "text/plain"
      }, 'No-www']
    else
      @app.call(env)
    end
  end
end
use NoWww

# require 'dalli'
# require "rack/cache"
# 
# $cache = Dalli::Client.new
# use Rack::Cache, :metastore => $cache, :entitystore => 'file:tmp/cache/entity'

#
# Create and configure a toto instance
#
toto = Toto::Server.new do
  #
  # Add your settings here
  # set [:setting], [value]
  
  set :url,       ENV['RACK_ENV'] == 'development' ? "http://localhost:3000" : "http://awardwinningfjords.com"
  set :author,    "Thomas Reynolds"                         # blog author
  set :title,     "Award Winning Fjords"                    # site title
  # set :root,      "index"                                   # page to load on /
  set :date,     lambda {|now| now.strftime("%B #{now.day.ordinal} %Y") }  # date format for articles
  # set :markdown,  :smart                                    # use markdown + smart-mode
  set :disqus,    'awf'                                     # disqus id, or false
  set :summary,   :max => 150, :delim => /READMORE/                # length of article summary and delimiter
  # set :ext,       'txt'                                     # file extension for articles
  set :cache,      2592000                                    # cache duration, in seconds

end

run toto


