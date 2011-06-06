task :default => :new

desc "Create a new article."
task :new do
  title = ask('Title: ')
  slug = title.empty?? nil : title.strip.slugize

  article = {'title' => title, 'date' => Time.now.strftime("%d/%m/%Y")}.to_yaml
  article << "\n"
  article << "Once upon a time...\n\n"

  path = "#{Toto::Paths[:articles]}/#{Time.now.strftime("%Y-%m-%d")}#{'-' + slug if slug}.#{@config[:ext]}"

  unless File.exist? path
    File.open(path, "w") do |file|
      file.write article
    end
    toto "an article was created for you at #{path}."
  else
    toto "I can't create the article, #{path} already exists."
  end
end

desc "Publish my blog."
task :publish do
  toto "publishing your article(s)..."
  `mm-build`
  #`commit`
  `git push heroku master`
end

def toto msg
  puts "\n  toto ~ #{msg}\n\n"
end

def ask message
  print message
  STDIN.gets.chomp
end

def perform_git_push(options = '')
  cmd = "git push #{options}"
  out, code = sh_with_code(cmd)
  raise "Couldn't git push. `#{cmd}' failed with the following output:\n\n#{out}\n" unless code == 0
end

def sh(cmd, &block)
  out, code = sh_with_code(cmd, &block)
  code == 0 ? out : raise(out.empty? ? "Running `#{cmd}' failed. Run this command directly for more detailed output." : out)
end

def sh_with_code(cmd, &block)
  cmd << " 2>&1"
  outbuf = ''
  Bundler.ui.debug(cmd)
  Dir.chdir(base) {
    outbuf = `#{cmd}`
    if $? == 0
      block.call(outbuf) if block
    end
  }
  [outbuf, $?]
end