const { Router } = require("express");

const router = new Router();

const { Database } = require("beta.db")
const db = new Database('./config.json');

router.get("/", (req, res) => {
    const config = db.all();

    res.render("index", {
        config,
        layout: "./"
    });
});

module.exports = router;
