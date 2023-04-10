// Define an array of URLs to the sitemap.xml files for each website
const sitemapUrls = [
    'https://library.yeahgames.net/sitemap.xml',
    'https://search.yeahgames.net/sitemap.xml'
  ];
  
  // Define a function to fetch and parse a sitemap.xml file
  async function parseSitemap(url) {
    const response = await fetch(url);
    const xml = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const urls = doc.querySelectorAll('urlset url loc');
    return Array.from(urls).map(url => url.textContent);
  }
  
  // Define a function to fetch and parse a webpage
  async function parseWebpage(url) {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const title = doc.querySelector('title').textContent;
    const summary = doc.querySelector('meta[name="description"]').getAttribute('content');
    // Add additional parsing logic here as needed
    return { url, title, summary };
  }
  
  // Define a function to aggregate the data from multiple websites
  async function aggregateData() {
    const data = [];
    for (const url of sitemapUrls) {
      const sitemapUrls = await parseSitemap(url);
      for (const url of pageUrls) {
        const webpageData = await parseWebpage(url);
        data.push(webpageData);
      }
    }
    return data;
  }
  
  // Call the aggregateData() function and search the resulting data array
  aggregateData().then(data => {
    const query = 'example query';
    const searchResults = data.filter(item => {
      const titleMatches = item.title.toLowerCase().includes(query.toLowerCase());
      const summaryMatches = item.summary.toLowerCase().includes(query.toLowerCase());
      return titleMatches || summaryMatches;
    });
    // Display the search results on the page


    function search() {
        let input = document.getElementById('search-input').value.toLowerCase();
        let results = [];
      
        // Search through the sitemap data
        for (let i = 0; i < sitemapData.length; i++) {
          let title = sitemapData[i].title.toLowerCase();
          let content = sitemapData[i].content.toLowerCase();
          let url = sitemapData[i].url;
          if (title.includes(input) || content.includes(input)) {
            results.push({
              title: title,
              content: content,
              url: url
            });
          }
        }
      
        // Search through the json data
        for (let i = 0; i < jsonData.length; i++) {
          let title = jsonData[i].title.toLowerCase();
          let content = jsonData[i].content.toLowerCase();
          let url = jsonData[i].url;
          if (title.includes(input) || content.includes(input)) {
            results.push({
              title: title,
              content: content,
              url: url
            });
          }
        }
      
        // Remove duplicate results
        let uniqueResults = results.filter((item, index) => {
          return results.indexOf(item) === index;
        });
      
        // Display search results
        let searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';
        if (uniqueResults.length === 0) {
          searchResults.innerHTML = '<p>No results found</p>';
        } else {
          for (let i = 0; i < uniqueResults.length; i++) {
            searchResults.innerHTML += `
              <div class="result">
                <a href="${uniqueResults[i].url}">
                  <h3>${uniqueResults[i].title}</h3>
                </a>
                <p>${uniqueResults[i].content}</p>
              </div>
            `;
          }
        }
      }
      