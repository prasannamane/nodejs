const express = require("express");
const Common = require("../../Controllers/Admin/Common");
const Vendor = require("../../Controllers/Admin/Vendor");
const router = express.Router();

/**
 * Common
 */

/**
 * Loading login page by default
 * Loading dashbord if loged in admin
 */
router.get("/", (req, res) => {
    const message = req.flash("info")[0];
    if (req.session.userid > 0) {
        res.render("admin/index", { message: message });
    } else {
        res.render("admin/login", { title: "App", message: message });
    }
});

/**
 * Loding after customer entered data
 */
router.route("/login").post(Common.login);

/**
 * Loading dashbord if loged in admin
 */
router.route("/dashboard").get(Common.dashboard);

router.route("/logout").get(Common.logout);

/**
 * Vendor
 */
//router.route("/vendor").post(Vendor.retrieve);

router.get("/vendor-add", (req, res) => {
    res.render("admin/vendor/add", { title: "App" });
});

router.route('/vendor/add').post(Vendor.add);

/*
app.post("/vendor/add", urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);
});
*/




router.route("/vendor/add").post(Vendor.insert);
router.route("/vendor/insert").post(Vendor.insert);

module.exports = router;
