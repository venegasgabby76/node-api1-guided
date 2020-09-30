const http = require("http")

const server = http.createServer((req, res) => {
    // use "req" to get information about the http request
    // use "res" to send information back to the server

    //send back a "success" status code 
    res.statusCode = 200

    //tell the broswer we're sending back html
    res.setHeader("Content-Type", "text/html")

    //send the actual html
    res.write("<h1>Hello, World</h1>")

    //send this built response out into the internet
    res.end()
})

//web servers need to be continuously listening. 
server.listen(8080, () => {
    console.log("server started")
})