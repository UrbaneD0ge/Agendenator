var $1hYtP$path = require("path");
var $1hYtP$express = require("express");
var $1hYtP$mongoose = require("mongoose");
var $1hYtP$methodoverride = require("method-override");
var $1hYtP$cookiesession = require("cookie-session");
var $1hYtP$slugify = require("slugify");


var $5deb65237ce573e4$var$$parcel$__dirname = $1hYtP$path.resolve(__dirname, "..");


const $5deb65237ce573e4$var$app = $1hYtP$express();
var $7d60790966ad30df$exports = {};

const $7d60790966ad30df$var$router = $1hYtP$express.Router();
var $be705586a8252573$exports = {};


const $be705586a8252573$var$applicationSchema = new $1hYtP$mongoose.Schema({
    NPU: String,
    month: {
        type: Array
    },
    date: String,
    address: String,
    type: String,
    title: String,
    descr: String,
    notes: String,
    applicant: String,
    applURL: String,
    URL1: String,
    URL2: String,
    URL3: String,
    URL4: String,
    status: String,
    ordLink: String,
    adjacent: {
        type: Array,
        default: "-"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});
$be705586a8252573$var$applicationSchema.pre("validate", function(next) {
    if (this.title) this.slug = $1hYtP$slugify(this.title, {
        lower: true,
        strict: true
    });
    next();
});
$be705586a8252573$exports = $1hYtP$mongoose.model("Application", $be705586a8252573$var$applicationSchema);


$7d60790966ad30df$var$router.get("/new", (req, res)=>{
    res.render("applications/new", {
        applications: new $be705586a8252573$exports()
    });
});
$7d60790966ad30df$var$router.get("/edit/:id", async (req, res)=>{
    const application = await $be705586a8252573$exports.findById(req.params.id);
    res.render("applications/edit", {
        application: application
    });
});
$7d60790966ad30df$var$router.get("/:slug", async (req, res)=>{
    const application = await $be705586a8252573$exports.findOne({
        slug: req.params.slug
    });
    if (application == null) res.redirect("/");
    else res.render("applications/show", {
        application: application
    });
});
$7d60790966ad30df$var$router.post("/", async (req, res, next)=>{
    if (req.session.isPopulated) {
        req.application = new $be705586a8252573$exports();
        next();
    } else {
        res.redirect("/login/google");
        return;
    }
}, $7d60790966ad30df$var$saveAndRedirect("show"));
$7d60790966ad30df$var$router.put("/:id", async (req, res, next)=>{
    if (req.session.isPopulated) {
        req.application = await $be705586a8252573$exports.findById(req.params.id);
        next();
    } else res.redirect("/login/google");
}, $7d60790966ad30df$var$putUpdate("show"));
$7d60790966ad30df$var$router.delete("/:id", async (req, res)=>{
    if (req.session.isPopulated) {
        await $be705586a8252573$exports.findByIdAndDelete(req.params.id);
        res.redirect("/applications");
    } else res.redirect("/login/google");
});
$7d60790966ad30df$var$router.get("/", async (req, res)=>{
    const applications = await $be705586a8252573$exports.find().sort({
        NPU: "asc"
    });
    await res.render("applications/applications", {
        applications: applications
    });
});
// console.dir(router, { depth: 5 });
function $7d60790966ad30df$var$saveAndRedirect(path) {
    return async (req, res)=>{
        //    for (keys in req.body) {
        //      application[keys] = body[keys];
        //    }
        let application = req.application;
        application.NPU = req.body.NPU;
        application.adjacent = req.body.adjacent;
        application.date = req.body.date;
        application.month = req.body.month;
        application.address = req.body.address;
        application.type = req.body.type;
        application.title = req.body.title;
        application.descr = req.body.descr;
        application.notes = req.body.notes;
        application.applicant = req.body.applicant;
        application.applURL = req.body.applURL;
        application.URL1 = req.body.URL1;
        application.URL2 = req.body.URL2;
        application.URL3 = req.body.URL3;
        application.URL4 = req.body.URL4;
        try {
            // console.dir(req);
            // console.dir(application);
            application = await application.save();
            res.redirect(`/show/${application.slug}`);
        } catch (err) {
            console.log(err);
            res.render(`/${path}`, {
                application: application
            });
        }
    };
}
function $7d60790966ad30df$var$putUpdate(path) {
    return async (req, res)=>{
        let application = req.application;
        //  assign fields to application and save
        for(keys in req.body)application[keys] = req.body[keys];
        try {
            // console.dir(req);
            // console.dir(application);
            application = await application.save();
            res.redirect(`/show/${application.slug}`);
        } catch (err) {
            console.log(err);
            res.render(`/${path}`, {
                application: application
            });
        }
    };
}
$7d60790966ad30df$exports = $7d60790966ad30df$var$router;


var $e4b812ee459d52fa$exports = {};

var $e4b812ee459d52fa$require$application = $1hYtP$express.application;

const $e4b812ee459d52fa$var$router = $1hYtP$express.Router();

var $1f40464000f09ae1$exports = {};

const $1f40464000f09ae1$var$NPUSchema = new $1hYtP$mongoose.Schema({
    NPU: String,
    chair: String,
    chairE: String,
    planner: String,
    plannerE: String,
    meeting: String,
    ZoomID: String,
    ZoomPW: String,
    ZoomURL: String,
    bylawsURL: String
});
$1f40464000f09ae1$exports = $1hYtP$mongoose.model("NPU", $1f40464000f09ae1$var$NPUSchema);


// show applications matching request parameters
$e4b812ee459d52fa$var$router.get("/", async (req, res)=>{
    // find where NPU or adjacent matches request parameters and month
    const applications = await $be705586a8252573$exports.find({
        $or: [
            {
                NPU: req.query.NPU
            },
            {
                adjacent: req.query.NPU
            }
        ],
        month: req.query.month
    });
    const NPUs = await $1f40464000f09ae1$exports.findOne({
        NPU: req.query.NPU
    });
    // console.log(applications)
    // render an agenda page with the applications and NPU info
    // res.render(`agendas/agemplates/${req.query.NPU}`, { applications: applications, NPUs: NPUs });
    res.render("agendas/agenda", {
        applications: applications,
        NPUs: NPUs
    });
});
$e4b812ee459d52fa$var$router.get("/roster", async (req, res)=>{
    // find where NPU or adjacent matches request parameters and month
    const applications = await $be705586a8252573$exports.find({
        $or: [
            {
                NPU: req.query.NPU
            },
            {
                adjacent: req.query.NPU
            }
        ],
        month: req.query.month
    }).sort({
        NPU: "asc",
        type: "asc"
    });
    const NPUs = await $1f40464000f09ae1$exports.findOne({
        NPU: req.query.NPU
    });
    // render an agenda page with the applications and NPU info
    res.render("agendas/roster", {
        applications: applications,
        NPUs: NPUs
    });
});
$e4b812ee459d52fa$var$router.get("/dashboard", async (req, res)=>{
    // find where NPU or adjacent matches request parameters and month
    const applications = await $be705586a8252573$exports.find({
        $or: [
            {
                NPU: req.query.NPU
            },
            {
                adjacent: req.query.NPU
            }
        ],
        month: req.query.month
    }).sort({
        NPU: "asc",
        type: "asc"
    });
    const NPUs = await $1f40464000f09ae1$exports.findOne({
        NPU: req.query.NPU
    });
    // // fetch from GIS website
    // await fetch(`https://gis.atlantaga.gov/dpcd/rest/services/LandUsePlanning/LandUsePlanning/MapServer/10/query?where=DOCKET_NO%3D'Z-22-001'&outFields=ORDHYPERLINK,%20STATUSTYPE&returnGeometry=false&returnTrueCurves=false&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&returnDistinctValues=false&returnExtentOnly=false&f=pjson`)
    //   .then((response) => {
    //     // console.log(response);
    //     return response.json();
    //   }).then((data) => {
    //     application.status = data.features[0].attributes.STATUSTYPE;
    //     application.ordLink = data.features[0].attributes.ORDHYPERLINK;
    //     // console.log(application.status);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // render an agenda page with the applications and NPU info
    res.render("agendas/dashboard", {
        applications: applications,
        NPUs: NPUs
    });
});
$e4b812ee459d52fa$exports = $e4b812ee459d52fa$var$router;


var $830f31cdb4a1e1a4$exports = {};


var $830f31cdb4a1e1a4$require$application = $1hYtP$express.application;

const $830f31cdb4a1e1a4$var$router = $1hYtP$express.Router();

// add new NPU
$830f31cdb4a1e1a4$var$router.get("/new", (req, res)=>{
    res.render("NPUs/new", {
        NPUs: new $1f40464000f09ae1$exports()
    });
});
// edit NPU
$830f31cdb4a1e1a4$var$router.get("/edit/:id", async (req, res)=>{
    const npu = await $1f40464000f09ae1$exports.findById(req.params.id);
    res.render("NPUs/edit", {
        NPU: npu
    });
});
// update NPU
$830f31cdb4a1e1a4$var$router.put("/:id", async (req, res, next)=>{
    if (req.session) {
        req.NPU = await $1f40464000f09ae1$exports.findById(req.params.id);
        next();
    } else res.redirect("/login/google");
}, $830f31cdb4a1e1a4$var$putUpdate("NPUs"));
// post new NPU
$830f31cdb4a1e1a4$var$router.post("/", async (req, res, next)=>{
    if (req.session) {
        req.NPU = new $1f40464000f09ae1$exports();
        next();
    } else res.redirect("/login/google");
}, $830f31cdb4a1e1a4$var$saveAndRedirect("NPUs"));
// delete NPU
$830f31cdb4a1e1a4$var$router.delete("/:id", async (req, res)=>{
    if (req.session.isPopulated) {
        await $1f40464000f09ae1$exports.findByIdAndDelete(req.params.id);
        res.redirect("/NPUs");
    } else res.redirect("/login/google");
});
// show all NPUs
$830f31cdb4a1e1a4$var$router.get("/", async (req, res)=>{
    const NPUs = await $1f40464000f09ae1$exports.find().sort({
        NPU: "asc"
    });
    await res.render("NPUs/NPUs", {
        NPUs: NPUs
    });
});
function $830f31cdb4a1e1a4$var$saveAndRedirect(path) {
    return async (req, res)=>{
        let NPU = req.NPU;
        NPU.NPU = req.body.NPU;
        NPU.chair = req.body.chair;
        NPU.chairE = req.body.chairE;
        NPU.planner = req.body.planner;
        NPU.plannerE = req.body.plannerE;
        NPU.meeting = req.body.meeting;
        NPU.ZoomID = req.body.ZoomID;
        NPU.ZoomPW = req.body.ZoomPW;
        NPU.ZoomURL = req.body.ZoomURL;
        NPU.bylawsURL = req.body.bylawsURL;
        try {
            NPU = await NPU.save();
            res.redirect(`NPUs`);
        } catch (e) {
            console.log(e);
            res.render("/");
        }
    };
}
function $830f31cdb4a1e1a4$var$putUpdate(path) {
    return async (req, res)=>{
        let NPU = req.NPU;
        //  assign fields to application and save
        for(keys in req.body)NPU[keys] = req.body[keys];
        try {
            // console.dir(req);
            // console.dir(application);
            NPU = await NPU.save();
            res.redirect(`/NPUs`);
        } catch (err) {
            console.log(err);
            res.render(`/${path}`);
        }
    };
}
$830f31cdb4a1e1a4$exports = $830f31cdb4a1e1a4$var$router;




const $5deb65237ce573e4$var$mongoConnect = process.env.mongoConnect;
const $5deb65237ce573e4$var$client_id = process.env.client_id;
const $5deb65237ce573e4$var$client_secret = process.env.client_secret;
const $5deb65237ce573e4$var$cookie_secret = process.env.cookie_secret;
const $5deb65237ce573e4$var$port = process.env.PORT || 3000;
// get callback uri from environment
function $5deb65237ce573e4$var$getCallbackURI() {
    if (process.env.NODE_ENV === "production") var callbackURI = "https://agendenator.up.railway.app/";
    else var callbackURI = `http://localhost:${$5deb65237ce573e4$var$port}`;
    return callbackURI;
}
$5deb65237ce573e4$var$app.listen($5deb65237ce573e4$var$port, ()=>{
    console.log(`Listening at http://localhost:${$5deb65237ce573e4$var$port}`);
});
$5deb65237ce573e4$var$app.set("view engine", "ejs");
$5deb65237ce573e4$var$app.use($1hYtP$express.urlencoded({
    extended: false
}));
$5deb65237ce573e4$var$app.use($1hYtP$express.static($5deb65237ce573e4$var$$parcel$__dirname + "/public"));
$5deb65237ce573e4$var$app.use($1hYtP$methodoverride("_method"));
$5deb65237ce573e4$var$app.use($1hYtP$cookiesession({
    secret: $5deb65237ce573e4$var$cookie_secret,
    maxAge: 86400000,
    keys: [
        $5deb65237ce573e4$var$cookie_secret
    ]
}));
$5deb65237ce573e4$var$app.get("/", async (req, res)=>{
    res.render("index");
});
$5deb65237ce573e4$var$app.get("/logout", (req, res)=>{
    req.session = null;
    req.cookies = null;
    res.redirect("/");
});
$5deb65237ce573e4$var$app.get("/login/google", (req, res)=>{
    const callbackURI = $5deb65237ce573e4$var$getCallbackURI();
    res.redirect("https://accounts.google.com/o/oauth2/v2/auth?client_id=" + $5deb65237ce573e4$var$client_id + "&redirect_uri=" + callbackURI + "/login/google/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email");
});
async function $5deb65237ce573e4$var$getAccessToken(code) {
    const callbackURI = $5deb65237ce573e4$var$getCallbackURI();
    const url = "https://oauth2.googleapis.com/token";
    const params = {
        client_id: $5deb65237ce573e4$var$client_id,
        client_secret: $5deb65237ce573e4$var$client_secret,
        redirect_uri: `${callbackURI}/login/google/callback`,
        grant_type: "authorization_code",
        code: code
    };
    const body = Object.keys(params).map((key)=>key + "=" + params[key]).join("&");
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    };
    const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body
    }).then((response)=>{
        // console.log(response)
        return response.json();
    }).then((data)=>{
        return data;
    });
    // console.log(body);
    // console.log('getAccessTokenResults', JSON.stringify(res));
    return res.access_token;
}
async function $5deb65237ce573e4$var$getGoogleUser(access_token) {
    const url = "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + access_token;
    const res = await fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        return data;
    }).catch((err)=>{
        console.log("getGoogleUser", err);
    });
    // console.log('getGoogleUser results:', res);
    return res;
}
$5deb65237ce573e4$var$app.get("/login/google/callback", async (req, res)=>{
    const code = req.query.code;
    const token = await $5deb65237ce573e4$var$getAccessToken(code);
    const googleUserData = await $5deb65237ce573e4$var$getGoogleUser(token);
    if (googleUserData) {
        req.session.user = googleUserData.id;
        req.session.email = googleUserData.email;
        req.session.token = token;
        // console.log('Google User Data:', googleUserData);
        res.redirect("/applications");
    } else res.send("Error!");
});
// Connecting to the database
$1hYtP$mongoose.connect($5deb65237ce573e4$var$mongoConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Successfully connected to the database");
}).catch((err)=>{
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});
$5deb65237ce573e4$var$app.use("/agenda", $e4b812ee459d52fa$exports);
$5deb65237ce573e4$var$app.use("/show", $7d60790966ad30df$exports);
$5deb65237ce573e4$var$app.use("/NPUs", $830f31cdb4a1e1a4$exports);
$5deb65237ce573e4$var$app.use("/applications", $7d60790966ad30df$exports);


//# sourceMappingURL=build.js.map
