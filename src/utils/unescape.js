export function escapeHTML(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/script/g, "scrip");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#x27;/g, "'");
    htmlStr = htmlStr.replace(/&#x2F;/g, "/");
    htmlStr = htmlStr.replace(/&amp;/g, "&");

    return htmlStr;
  }