// Full Documentation - https://docs.turbo360.co
const express = require('express')
const router = express.Router()

const mongoose = require("mongoose")

const Activity = require("../models/activity.js")
const config = require("../models/config.js")
const activitydb = require("../models/activity2.js")
/*  This is a sample API route. */

// router.get('/:resource', (req, res) => {
// 	res.json({
// 		confirmation: 'success',
// 		resource: req.params.resource,
// 		query: req.query // from the url query string
// 	})
// })

// router.get('/:resource/:id', (req, res) => {
// 	res.json({
// 		confirmation: 'success',
// 		resource: req.params.resource,
// 		id: req.params.id,
// 		query: req.query // from the url query string
// 	})
// })
const Ban = require("../models/ban.js")
router.get('/bans', (req, res) => {
    mongoose.connect("mongodb+srv://FreezeBall1:JTqYCqmNCoT2S2QF@cluster0-oovta.mongodb.net/bondi", { useUnifiedTopology: true });
    Ban.find()
        .then(bans => {
            res.json({
                confirmation: "Found",
                data: bans
            })
        })
})

router.post('/bans/add', (req, res) => {
    console.log(req.body.token)
    console.log(req.body.bannedby)
    console.log(req.body.reason)
    console.log(req.body.bannedplruserID)
    console.log(req.body.duration)
    if (req.body.token === "f1ocv51LpHM94wQ2s24CLoFv8Fpy24Oyk8o8kcXHcAKEv77sgMKSsChMTq1L") {
        mongoose.connect("mongodb+srv://FreezeBall1:JTqYCqmNCoT2S2QF@cluster0-oovta.mongodb.net/bondi", { useUnifiedTopology: true });
        const newBan = new Ban({
            bannedby: req.body.bannedby,
            reason: req.body.reason,
            bannedplruserID: req.body.bannedplruserID,
            duration: req.body.duration
        });
        newBan.save()
        Ban.find()
            .then(bans => {
                res.json({
                    confirmation: "Found",
                    data: bans
                })
            })
    }
});


router.post('/activity', (req, res) => {
    console.log(req)
    mongoose.connect("mongodb+srv://FreezeBall1:JTqYCqmNCoT2S2QF@cluster0-oovta.mongodb.net/dbot", { useUnifiedTopology: true });
    config.findOne({ premiumkey: req.body.token }, (err, info) => {
        if (req.body.token === info.premiumkey) {
            Activity.findOne({ username: req.body.username }, (err, activity) => {
                if (err) console.log(err);
                if (!activity) {
                    const newActivity = new Activity({
                        GuildId: info.GuildId,
                        RobloxId: req.body.RobloxId,
                        username: req.body.username,
                        activity: req.body.activity,
                        warnings: 0,
                        sessions: 0,
                        inactivity: false
                    });
                    newActivity.save();
                } else {
                    let ActivityToAddVar = req.body.activity;
                    var ActivityToAdd = parseInt(ActivityToAddVar, 10);
                    activity.activity = activity.activity++ + ActivityToAdd;
                    activity.save().catch(err => console.log(err));
                }
            })
        }
    })
})


router.post('/bondi', (req, res) => {
    console.log(req)
    mongoose.connect("mongodb+srv://FreezeBall1:JTqYCqmNCoT2S2QF@cluster0-oovta.mongodb.net/bondi", { useUnifiedTopology: true });
    activitydb.findOne({ robloxID: req.body.robloxid }, (err, activity) => {
        if (err) console.log(err);
        if (!activity) {
            const newActivity = new activitydb({
                groupId: req.body.groupid,
                robloxID: req.body.robloxid,
                activity: req.body.activity,
                warnings: 0,
                sessions: 0,
                inactivity: false
            });
            newActivity.save();
        } else {
            let ActivityToAddVar = req.body.activity;
            var ActivityToAdd = parseInt(ActivityToAddVar, 10);
            activitydb.activity = activitydb.activity++ + ActivityToAdd;
            activitydb.save().catch(err => console.log(err));
        }
    })
})


module.exports = router

router.post('/bondi2', (req, res) => {
    	res.json({
    		confirmation: 'success',
    		resource: "success",
    		query: "success" // from the url query string
    	})
})