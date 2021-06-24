import express, { response } from "express"

const app = express()

app.get("/test-get", (request, response) => {

    response.send("Olá NLW! GET")

})

app.post("/test-post", (request, response) => {

    response.send("Olá NLW! POST")

})

// http://localhost:3000
app.listen(3000, () => console.log("server is running"))