const UserModel = require("../models/users");

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserById = (_id: any) => UserModel.findById({ _id });

export const registerUser = async ({req, res}: any)=> {

   const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      await bcrypt.hash(req.body.password, 10).then((hash: string) => {
        const user = new UserModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: hash,
        });

        user
          .save()
          .then((response: any) => {
            res.status(201).json({
              statusCode: 201,
              message: "User successfully created!",
              result: response,
            });
          })
          .catch((error: Error) => {
            res.status(500).json({
              error: error,
              message:
                "Sorry, something went wrong on our server. Please try again",
            });
          });
      });
    }
  }

}

export const updateUserRole = (_id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(_id, values);
