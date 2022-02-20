const express = require('express')
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient

const app = express()
const port = 3000

app.use(bodyParser.json())
app.get('/api/products', async (req, res) => {

    const uri = "mongodb://localhost:27017";
    const databaseName = "vue-db";

    MongoClient.connect(uri, { useNewUrlParser: true }, async (error, client) => {
        if (error) {
            return console.log("connection failed");
        }
        console.log("Connection established - All well");
        const db = client.db(databaseName);
        const products = await db.collection('products').find({}).toArray();
        res.status(200).json(products)
        client.close();
    });

})

app.get('/api/user/:user_id/cart', async (req, res) => {
    const uri = "mongodb://localhost:27017";
    const databaseName = "vue-db";
    const userID = req.params.user_id;
    MongoClient.connect(uri, { useNewUrlParser: true }, async (error, client) => {
        if (error) {
            return console.log("connection failed");
        }
        console.log("Connection established - All well");
        const db = client.db(databaseName);
        const user = await db.collection('users').findOne({ id: userID });
        if (user) {
            const cartItemIDs = user.cartItems;
            const cartItems = []
            const products = await db.collection('products').find({}).toArray();
            products.forEach(product => {
                cartItemIDs.forEach(cartItemID => {
                    if (cartItemID === product.id) {
                        cartItems.push(product)
                    }
                });
            });
            res.status(200).json(cartItems)

        } else {
            res.status(404).json("No user found")
        }
        client.close();
    });
})

app.get('/api/product/:product_id', (req, res) => {
    const uri = "mongodb://localhost:27017";
    const databaseName = "vue-db";
    const productID = req.params.product_id;
    MongoClient.connect(uri, { useNewUrlParser: true }, async (error, client) => {
        if (error) {
            return console.log("connection failed");
        }
        console.log("Connection established - All well");
        const db = client.db(databaseName);
        const product = await db.collection('products').findOne({ id: productID });
        if (product) {
            res.status(200).json(product)

        } else {
            res.status(404).json("No product found")
        }
        client.close();
    });
})

app.post('/api/user/:user_id/cart', (req, res) => {
    const uri = "mongodb://localhost:27017";
    const databaseName = "vue-db";
    const productID = req.body.product_id;
    const userID = req.params.user_id;
    MongoClient.connect(uri, { useNewUrlParser: true }, async (error, client) => {
        if (error) {
            return console.log("connection failed");
        }
        console.log("Connection established - All well");
        const db = client.db(databaseName);
        await db.collection('users').updateOne({ id: userID }, {
            $addToSet: { cartItems: productID }
        });
        const user = await db.collection('users').findOne({ id: userID });
        const cartItemIDs = user.cartItems;
        const cartItems = []
        const products = await db.collection('products').find({}).toArray();
        products.forEach(product => {
            cartItemIDs.forEach(cartItemID => {
                if (cartItemID === product.id) {
                    cartItems.push(product)
                }
            });
        });
        res.status(200).json(cartItems)
        client.close();
    })
})
app.delete('/api/user/:user_id/cart', (req, res) => {
    const uri = "mongodb://localhost:27017";
    const databaseName = "vue-db";
    const productID = req.body.product_id;
    const userID = req.params.user_id;
    MongoClient.connect(uri, { useNewUrlParser: true }, async (error, client) => {
        if (error) {
            return console.log("connection failed");
        }
        console.log("Connection established - All well");
        const db = client.db(databaseName);
        await db.collection('users').updateOne({ id: userID }, {
            $pull: { cartItems: productID }
        });
        const user = await db.collection('users').findOne({ id: userID });
        const cartItemIDs = user.cartItems;
        const cartItems = []
        const products = await db.collection('products').find({}).toArray();
        products.forEach(product => {
            cartItemIDs.forEach(cartItemID => {
                if (cartItemID === product.id) {
                    cartItems.push(product)
                }
            });
        });
        res.status(200).json(cartItems)
        client.close();
    })
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})