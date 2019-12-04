const http = require('http')
const ex = require('./start')

const port = process.env.PORT || 8081;

const server = http.createServer(ex)

server.listen(port, () => console.log(`Server Running on PORT : ${port}`))

