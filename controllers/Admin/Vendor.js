const Common = require("../../Models/Admin/Common");
const crypto = require("crypto");

class Vendor {

    constructor() {
        this.ObjCommon = new Common();
        this.table;
    }

    async insert(req) {
        const data = [];
        data["name"] = req.body.name;
        data["email"] = req.body.email;
        data["mobile"] = req.body.mobile;
        data["password"] = crypto.createHash("sha1").update(req.body.password).digest("hex");
        this.table = "register";
        return this.ObjCommon.insert(this.table, data);
    }

    async insert(req) {
        const data = [];
        data["name"] = req.body.fname+' '+req.body.lname;
        data["email"] = req.body.email;
        data["mobile"] = req.body.mobile;
        data["password"] = crypto.createHash("sha1").update(req.body.mobile).digest("hex");
        this.table = "register";
        return this.ObjCommon.insert(this.table, data);
    }

}

const ObjVendor = new Vendor();

exports.insert = async (req, res, next) => {
    const insert = await ObjVendor.insert(req);

    console.log(insert);

    if (insert == undefined || insert.length === 0) {
        req.flash("info", "Something went wrong.");
        res.redirect("/admin");
    } else {
        req.flash("info", "You are now logged in.");
        res.redirect("/admin/dashboard");
    }
};

exports.add = async (req, res, next) => {
    const add = await ObjVendor.insert(req);

    console.log(add);
    
    if (add == undefined || add.length === 0) {
        res.render("admin/vendor/add", { message: "Something went wrong." });
    } else {
        res.render("admin/vendor/add", { message: "Vendor added successfully." });
    }
};