const
  inquirer = require("inquirer"),
  fs = require("fs");

inquirer.prompt([
  {
    message: "What is your name?",
    name: "name"
  },
  {
    message: "Please provide a brief bio.",
    name: "bio"
  },
  {
    message: "What is the URL for your LinkedIn profile?",
    name: "linkedin"
  },
  {
    message: "What is the URL for your GitHub profile?",
    name: "github"
  }
]).then(response => {
  let html = htmlHeader.replace('{0}', `${response.name}'s portfolio`)

  html += writeTitle(`${response.name}'s Portfolio`)
  html += writeSection("Bio", response.bio)
  html += writeSection(
    "LinkedIn Profile",
    writeLink(response.linkedin, "LinkedIn profile")
  )
  html += writeSection(
    "GitHub Profile",
    writeLink(response.linkedin, "GitHub profile")
  )
  html += htmlFooter

  saveHtml(html);
})


function writeTitle(title) {
  return write("h1", title)
}

function writeSection(header, body) {
  return writeHeader(header) +  writeParagraph(body)
}

function writeHeader(header) {
  return write("h2", header)
}

function writeParagraph(body) {
  return write("p", body)
}

function writeLink(url, title) {
  return write("a", title, false).replace('<a>', `<a href="${url}">`)
}

function write(element, content, block = true) {
  return `<${element}>${content}</${element}>${block ? '\n' : ''}`
}

const
  htmlHeader = `
<!doctype html>
<html>
 <head>
  <title>{0}</title>
  <link rel="stylesheet" href="./assets/style.css" />
 </head>
 <body>
`,
  htmlFooter = `
 </body>
</html>`


function saveHtml(html) {
  const outFile = "portfolio.html"
  fs.writeFile(outFile, html, "utf8", (error) => {
    if (error) {
      return console.log(error);
    }
    console.log(`File saved at: ${__dirname}/${outFile}`)
  })
}