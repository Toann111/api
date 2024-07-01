import { StatusCodes } from "http-status-codes";
// import ApiError from '~/utils/ApiError'
import { userService } from "~/services/userService";

const createNew = async (req, res, next) => {
  try {
    const createUser = await userService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createUser);
  } catch (error) {
    next(error);
  }
};
const getDetails = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await userService.getDetails(userId);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};
export const userController = {
  createNew,
  getDetails,
};
