// Fetching sitemap.xml files:

function fetchSitemaps() {
    const sitemaps = [
      "https://example.com/sitemap.xml",
      "https://example.net/sitemap.xml",
      // Add more sitemap URLs here
    ];
  
    const urls = [];
  
    sitemaps.forEach((sitemap) => {
      fetch(sitemap)
        .then((response) => response.text())
        .then((xml) => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xml, "text/xml");
  
          const locs = xmlDoc.getElementsByTagName("loc");
  
          for (let i = 0; i < locs.length; i++) {
            const url = locs[i].textContent.trim();
            urls.push(url);
          }
        })
        .catch((error) => {
          console.error(`Error fetching sitemap ${sitemap}: ${error}`);
        });
    });
  
    return urls;
  }

  // This function fetches the sitemap.xml files from the URLs specified in the sitemaps array, extracts the URLs from the XML using the DOMParser API, and returns an array of URLs.

  // Fetching webpages and extracting data:

  async function fetchWebpages(urls) {
    const data = [];
  
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
  
      try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
  
        const title = doc.querySelector("title").textContent.trim();
        const description = doc.querySelector('meta[name="description"]').getAttribute("content").trim();
        const content = doc.querySelector("body").textContent.trim();
  
        const pageData = {
          url,
          title,
          description,
          content,
        };
  
        data.push(pageData);
      } catch (error) {
        console.error(`Error fetching webpage ${url}: ${error}`);
      }
    }
  
    return data;
  }

  // This function fetches the webpages from the URLs specified in the urls array using the Fetch API, extracts the title, description, and content from the HTML using the DOMParser API and returns an array of objects containing the extracted data.

  // JSON file storage:

  function storeData(data) {
    const jsonData = JSON.stringify(data);
  
    const blob = new Blob([jsonData], { type: "application/json" });
  
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
  
    URL.revokeObjectURL(url);
  }
  
  //This function converts the data array to JSON format using the JSON.stringify method, creates a Blob object with the JSON data and sets its type to "application/json", creates a URL object from the Blob using the URL.createObjectURL method, creates an <a> element with the URL as its href and sets its download attribute to "data.json", clicks the <a> element programmatically to download the JSON file, and revokes the URL object using the URL.revokeObjectURL method to free up memory.

  