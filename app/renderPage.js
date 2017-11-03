const renderPage = html => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
      <meta charset="UTF-8">
      <title>Wiki Challenge</title>
    </head>
    <body>
    <div id='app'>${html}</div>
    <script type="text/javascript" src="../public/bundle.js"></script>
    </body>
    </html>`
}

export default renderPage
