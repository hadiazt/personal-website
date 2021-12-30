const { Router } = require("express");
const router = new Router();


router.get("/", async (req, res) => {
    const student = await req.query.student;
    res.render("pages/blog.ejs", {
        student,
        layout: "./pages/blog.ejs"
    });
});


module.exports = router;
