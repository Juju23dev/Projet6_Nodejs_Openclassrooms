import { mongoModels } from "../../../mongoDB/models.js";
import { tokenManager } from "../../../utils/jwt.js";
import { hashManager } from "../../../utils/hash-argon2.js";
import { typeVerificator, regexVerificator } from "../../../utils/object-verifier.js";
import { userType } from "../../../utils/object-typeChecker/user-type-checker-obj.js";

const { User } = mongoModels;

export const loginController = async (req, res) => {
  const { email, password } =  req.body;
  const isDataGood = typeVerificator(userType, {email: email, password: password});
  const isFormatDataGood = regexVerificator(userType, {email: email, password: password})

  if (isDataGood && isFormatDataGood) {
    const getUser = await User.model.findOne({email: email});
    const isPasswordValid = (getUser.password && await hashManager.verify(password, getUser.password));

    if (isPasswordValid) {
      const token = tokenManager.create({id: getUser.id});

      return res.send({userId: getUser.id,token: token});
    }
  }
  const errorMessage = (isDataGood && !isFormatDataGood) ? 'invalid password or email format' : 'Bad Request';

  return res.status(400).send(errorMessage);
}