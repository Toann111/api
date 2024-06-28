/* eslint-disable no-useless-catch */

/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody
    }
    const createUser = await userModel.createNew(newBoard)

    const getNewUser = await userModel.findOneById(createUser.insertedId)

    return getNewUser
  } catch (error) { throw error }
}
const getDetails = async (userId) => {
  try {
    const user = await userModel.getDetails(userId)
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found! .')
    }
    return user
  } catch (error) { throw error }
}
export const userService = {
  createNew,
  getDetails
}