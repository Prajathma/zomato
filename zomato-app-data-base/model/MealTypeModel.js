const mongoose = require('mongoose');



const MealTypeSchema = new mongoose.Schema({
                name: {type: String},
                content: {type: String},
                image:{type: String},
                meal_type: {type: Number}
});


const MealTypeModel = mongoose.model('mealtype',MealTypeSchema, 'mealtypes');

module.exports = MealTypeModel