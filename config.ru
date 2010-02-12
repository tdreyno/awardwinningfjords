require 'toto'

class Toto::Article
  def path()
    self[:date].strftime("/%Y/%m/%d/#{slug}.html")
  end
end

# Rack config
use Rack::Static, :urls => ['/stylesheets', '/javascripts', '/images', '/albums', '/iphone-style-checkboxes', '/pageSlider', '/favicon.ico'], :root => 'public'
use Rack::CommonLogger

if ENV['RACK_ENV'] == 'development'
  use Rack::ShowExceptions
end

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

#
# Create and configure a toto instance
#
toto = Toto::Server.new do
  #
  # Add your settings here
  # set [:setting], [value]
  # 
  set :url,       ENV['RACK_ENV'] == 'development' ? "http://localhost:3000" : "http://awardwinnginfjords.com"
  set :author,    "Thomas Reynolds"                         # blog author
  set :title,     "Award Winning Fjords"                    # site title
  # set :root,      "index"                                   # page to load on /
  set :date,      lambda {|now| now.strftime("%Y/%m/%d") }  # date format for articles
  # set :markdown,  :smart                                    # use markdown + smart-mode
  # set :disqus,    false                                     # disqus id, or false
  # set :summary,   :max => 150, :delim => /~/                # length of article summary and delimiter
  # set :ext,       'txt'                                     # file extension for articles
  set :cache,      2592000                                    # cache duration, in seconds

  set :date, lambda {|now| now.strftime("%B #{now.day.ordinal} %Y") }
end

run toto


