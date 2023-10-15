//express
const express = require('express');
//express router
const router = express.Router();
//import voter model
const coordinator = require('../schema/coordinatorSchema');


//get all coordinators
router.get('/getAll', async (req, res) => {
    try {
        const allCoordinators = await coordinator.find();
        res.json({"status": "success", "data": allCoordinators});
        console.log("All coordinators fetched successfully! ");
    } catch (error) {
        console.log("Error: ", error);
    }
});

//get coordinator by id
router.get('/getCoordinator/:id', async (req, res) => {
    try {
        const coordinatorById = await coordinator.findById(req.params.id);
        res.json({"status": "success", "data": coordinatorById});
        console.log("Coordinator fetched successfully! ");
    } catch (error) {
        console.log("Error: ", error);
    }
});


//function to format number
const formatPhoneNumber = (phoneNumber) => {
    try {
        // Eliminar cualquier caracter que no sea un número
        const numeroLimpio = phoneNumber.replace(/\D/g, "");
  
        // Verificar si el número tiene al menos 10 dígitos
        if (numeroLimpio.length >= 10) {
          // Formatear el número en el formato deseado
          return(
            `${numeroLimpio.slice(0, 3)}-${numeroLimpio.slice(
              3,
              6
            )}-${numeroLimpio.slice(6, 10)}`
          );
        } else {
          // Si el número no tiene al menos 10 dígitos, devolver el número sin formato
  
          console.log(numeroLimpio);
        }
      } catch (error) {
        console.log(error);
      }
};

//add new coordinator
router.post('/addCoordinator', async (req, res) => {
    try {
        const {firstName, lastName, phone} = req.body;

        // Formatear el número de teléfono
        const formattedPhone = formatPhoneNumber(phone);

        const newCoordinator = new coordinator({
            firstName,
            lastName,
            phone: formattedPhone
        });

        const coordinatorSaved = await newCoordinator.save();
        res.json(coordinatorSaved);
        console.log("Coordinator added successfully!");
    } catch (error) {
        console.log("Error: ", error);
    }
});


//delete coordinator by id
router.delete('/deleteCoordinator/:id', async (req, res) => {
    try {
        const coordinatorDeleted = await coordinator.findByIdAndDelete(req.params.id);
        res.json(coordinatorDeleted);
        console.log("Coordinator deleted successfully!");
    } catch (error) {
        console.log("Error: ", error);
    }
});

module.exports = router;


