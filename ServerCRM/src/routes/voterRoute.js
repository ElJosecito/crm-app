//express router
const express = require('express');
const voter = require('../schema/voterSchema');

//config
const config = require('../../config');
const router = express.Router();

//get all voters
router.get('/getAll', async (req, res) => {
    try {
        const allVoters = await voter.find();
        res.json({"status": "success", "data": allVoters});
        console.log("All voters fetched successfully! ");
    } catch (error) {
        console.log("Error: ", error);
    }
});

//get all voters with coordinator and school reference

router.get('/getAllWithCoordinator', async (req, res) => {
    try {
        const allVoters = await voter.find().populate('coordinator').populate('colegio');
        res.json({"status": "success", "data": allVoters});
        console.log("All voters fetched successfully! ");
    } catch (error) {
        console.log("Error: ", error);
    }
});


//get voter by id
router.get('/getById/:id', async (req, res) => {
    try {
        const voterById = await voter.findById(req.params.id);
        res.json({"status": "success", "data": voterById});
        console.log("Voter fetched successfully! ");
    } catch (error) {
        console.log("Error: ", error);
    }
});



router.get('/getByName/:name', async (req, res) => {
    try {
        const regex = new RegExp(req.params.name, 'i');

        const voterByName = await voter.find({ firstName: { $regex: regex } });

        res.json({ "status": "success", "data": voterByName });
        console.log("Voter fetched successfully! ");
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ "status": "error", "message": "Internal Server Error" });
    }
});

//add new voter
router.post('/addVoter', async (req, res) => {
    try {
        const {firstName, lastName, phone, identification, coordinator, colegio} = req.body;

        const newVoter = new voter({
            firstName,
            lastName,
            phone,
            identification,
            coordinator,
            colegio
        });

        const voterSaved = await newVoter.save();
        res.json(voterSaved);
        console.log("Voter added successfully!");
    } catch (error) {
        console.log("Error: ", error);
    }
});


//update voter by id
router.put('/updateVoter/:id', async (req, res) => {
    try {
        const {firstName, lastName, phone, identification, coordinator, colegio} = req.body;

        const voterUpdated = await voter.findByIdAndUpdate(req.params.id, {
            firstName,
            lastName,
            phone,
            identification,
            coordinator,
            colegio
        });

        res.json(voterUpdated);
        console.log("Voter updated successfully!");
    } catch (error) {
        console.log("Error: ", error);
    }
});

//delete voter by id
router.delete('/deleteVoter/:id', async (req, res) => {
    try {
        const voterDeleted = await voter.findByIdAndRemove(req.params.id);
        res.json(voterDeleted);
        console.log("Voter deleted successfully!");
    } catch (error) {
        console.log("Error: ", error);
    }
});

//make voter true
router.put('/makeVoterTrue/:id', async (req, res) => {
    try {
        const voterUpdated = await voter.findByIdAndUpdate(req.params.id, {
            voted: true
        });

        res.json(voterUpdated);
        console.log("Voter updated successfully!");
    } catch (error) {
        console.log("Error: ", error);
    }
});

//make voter false
router.put('/makeVoterFalse/:id', async (req, res) => {
    try {
        const voterUpdated = await voter.findByIdAndUpdate(req.params.id, {
            voted: false
        });

        res.json(voterUpdated);
        console.log("Voter updated successfully!");
    } catch (error) {
        console.log("Error: ", error);
    }
});


//export router
module.exports = router;