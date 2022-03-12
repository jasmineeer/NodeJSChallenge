const express = require(`express`)
const app = express()
const PORT = 8080

let routes = [
    { prefix: `/member`, route: require(`./routes/member`)},
    { prefix: `/user`, route: require(`./routes/user`)},
    { prefix: `/paket`, route: require(`./routes/paket`)},
    { prefix: `/transaksi`, route: require(`./routes/transaksi`)}
]

for (let i = 0; i < routes.length; i++) {
    app.use(routes[i].prefix, routes[i].route)
    
}

app.listen(PORT, () => {
    console.log(`Server run on post ${PORT}`);
})