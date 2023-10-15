//express
const express = require('express');
//express router
const router = express.Router();
//import colegio model
const colegio = require('../schema/colegioSchema');


//get all colegios
router.get('/getAll', async (req, res) => {
    try {
        const allColegios = await colegio.find();
        res.json({"status": "success", "data": allColegios});
        console.log("All colegios fetched successfully! ");
    } catch (error) {
        console.log("Error: ", error);
    }
});

//get colegio by id
router.get('/getColegio/:id', async (req, res) => {
    try {
        const colegioById = await colegio.findById(req.params.id);
        res.json({"status": "success", "data": colegioById});
        console.log("Colegio fetched successfully! ");
    } catch (error) {
        console.log("Error: ", error);
    }
});

//add new colegio
router.post('/addSchool', async (req, res) => {
    try {
        const newColegio = new colegio({
            name: req.body.name,
            mesa: req.body.mesa,
        });
        await newColegio.save();
        res.json({"status": "success", "data": newColegio});
        console.log("New colegio added successfully! ");
    } catch (error) {
        console.log("Error: ", error);
    }
});

//delete colegio by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedColegio = await colegio.findByIdAndDelete(req.params.id);
        res.json({"status": "success", "data": deletedColegio});
        console.log("Colegio deleted successfully! ");
    } catch (error) {
        console.log("Error: ", error);
    }
});



module.exports = router;