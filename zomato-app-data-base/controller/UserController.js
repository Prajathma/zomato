const { request, response } = require("express");
const UserModel = require("../model/UserModel");


const UserController = {

    userHome: (request, response) => {
        response.send({
            status: true,
            message: 'welcome to Home'
        })
    },
    getUserList: async (request, response) => {
        let { gender } = request.params;
        let result = await UserModel.find({ gender: { $regex: gender, $options: "i" } }, { first_name: 1, last_name: 1 });
        response.send({
            status: true,
            list: result,
        })
    },
    saveUserData: async (request, response) => {
        let user = request.body;

        let saveData = {
            first_name: user.f_name,
            last_name: user.l_name,
            gender: user.gender,
            address: user.address,
            email: user.email,
            mobile: user.mobile,
            password: user.password,
        };

        let result = await UserModel.findOne({ mobile: user.mobile });
        if (result) {
            response.send({
                call: false,
                message: "user number exist",
            })
        } else {
            let newUser = new UserModel(saveData);
            await newUser.save();// insert data in

            response.send({
                call: true,
                // result,
            })
        }
    },

    userLogin: async (request, response) => {
        let { username, password } = request.body;
        let isUserValid = await UserModel.findOne({ mobile: username, password: password }, { password: 0 })
        if (isUserValid) {
            response.send({
                call: true,
                user: isUserValid
            })
        } else {
            response.send({
                call: false,
            })
        }
    },

}

module.exports = UserController;