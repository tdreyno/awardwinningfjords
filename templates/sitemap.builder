xml.instruct!
xml.urlset "xmlns" => "http://www.sitemaps.org/schemas/sitemap/0.9" do
  @articles.each do |article|
    xml.url do
      xml.loc article.url
      xml.lastmod article[:date].iso8601
      xml.monthly "monthly"
    end
  end
end
