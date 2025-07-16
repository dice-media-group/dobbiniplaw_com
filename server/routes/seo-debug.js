// server/routes/seo-debug.js
export default defineEventHandler(async (event) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>SEO Debug - Dobbin IP Law P.C.</title>
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    <meta name="bingbot" content="index, follow">
    <meta name="description" content="SEO debug page to test robot meta tags">
    <link rel="canonical" href="https://dobbiniplaw.com/seo-debug">
</head>
<body>
    <h1>SEO Debug Page</h1>
    <p>This page tests basic robots meta tags without any framework interference.</p>
    <ul>
        <li>robots: index, follow</li>
        <li>googlebot: index, follow</li>
        <li>bingbot: index, follow</li>
        <li>canonical: https://dobbiniplaw.com/seo-debug</li>
    </ul>
    <p><a href="/">Back to Homepage</a></p>
</body>
</html>
  `
  
  setHeader(event, 'Content-Type', 'text/html')
  setHeader(event, 'X-Robots-Tag', 'index, follow')
  return html
})
