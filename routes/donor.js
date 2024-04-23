const express = require('express');
const Model = require('../model/Donor');
const router = express.Router()

//Post Method
router.post('/post', async (req, res) => {
    try {
        // Check if a donor with the same details already exists
        const existingDonor = await Model.findOne({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            blood_group: req.body.blood_group,
            location: req.body.location
        });

        // If donor already exists, return a message
        if (existingDonor) {
            return res.status(400).json({ message: "This Donor already exists" });
        }

        // If donor doesn't exist, save the new donor
        const newDonor = new Model({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            blood_group: req.body.blood_group,
            location: req.body.location
        });

        const savedDonor = await newDonor.save();
        res.status(200).json({ message: "Donor added successfully", data: savedDonor });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



//Get all Method
router.get('/get', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message:error.message});
    }
});

//Get by ID Method
router.get('/get/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;