export const isValidUrl = (url) => {
  const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
  const validUrl = regex.test(url);
  return validUrl;
};

export const previewUrl = (url) => {
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      var parser = new DOMParser();
      const htmlDocument = parser.parseFromString(data, "text/html");
      const jsonLdDoc = htmlDocument.querySelector('script[type="application/ld+json"]');

      const favicon = htmlDocument.querySelector('link[rel="icon"]')?.href || htmlDocument.querySelector('link[rel="apple-touch-icon"]')?.href

      const title =
        htmlDocument.querySelector('meta[property="og:title"]')?.content || htmlDocument.title;

      const description =
        htmlDocument.querySelector('meta[property="og:description"]')?.content ||
        htmlDocument.querySelector('meta[name="description"]')?.content;

      const image = htmlDocument.querySelector('meta[property="og:image"]')?.content;
      const domain = (new URL(url).hostname);
      var type;
      if (JSON.parse(jsonLdDoc.innerHTML)["@type"] != null) {
        type = JSON.parse(jsonLdDoc.innerHTML)["@type"]?.toLowerCase();
      } else {
        type = htmlDocument.querySelector('meta[property="og:type"]')?.content.toLowerCase();
      }

      if(type.includes("movie")){
          type = "Movie"
      }
      else if(type.includes("book")){
          type = "Book"
      }
      else if(type.includes("series")){
          type = "TV Series"
      }
      else if(type.includes("article")){
          type = "Article"
      }
      else{
          type = "Url"
      }

      

      console.log(title, description, image, type, domain, favicon);
      return {
        title,
        description,
        image,
        type,
        domain,
        favicon
      };
    });
};
