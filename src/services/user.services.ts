import UserModel from '../models/user.model'
import { IUser } from '../types'

class UserService {
  async create (user: IUser) {
    const u = new UserModel(user)
    return u.save()
  }

  async delete (id: Number) {
    return await UserModel.findOneAndDelete({ id })
  }

  async update (username: string) {
    return await UserModel.findOne({ username })
  }

  async get ({ pageSize = 10, pageNum = 1 }) {
    const total = await UserModel.countDocuments()
    const list = await UserModel.aggregate([
      {
        $sort: {
          _id: 1
        }
      },
      {
        $skip: (pageNum - 1) * pageSize
      },
      {
        $limit: +pageSize
      },
      {
        $set: {
          id: '$_id'
        }
      },
      {
        $unset: '_id'
      }
    ])
    return {
      total,
      list
    }
  }

  async findOne (username: string) {
    return await UserModel.findOne({ username })
  }

  async findById (id: string) {
    return await UserModel.findById(id)
  }
}

// 单例模式，为了在control使用多个services的时候好区分
export default () => {
  let service: any
  if (!service) {
    service = new UserService()
  }
  return service
}
