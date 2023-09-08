const LocationModel = require("../model/LocationModel")

const LocationController = {
    getLocationList: async (request,response) => {
        let result = await LocationModel.find()
        response.send({
            call: true,
            result,
        })
    },
    // getMealType: async (request,response) => {
    //     let mealResult = await 
    // }
}

module.exports = LocationController;