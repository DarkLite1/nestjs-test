import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { RoleTypeStrings } from './dto/enum/role-type.enum'

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      role: 'INTERN',
      email: 'l@g.com',
    },
    {
      id: 2,
      name: 'Bob',
      role: 'ENGINEER',
      email: 'bob@g.com',
    },
    {
      id: 3,
      name: 'Mike',
      role: 'ADMIN',
      email: 'mike@g.com',
    },
  ]

  findAll(role?: RoleTypeStrings) {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role)
      if (!rolesArray.length) throw new NotFoundException('User role not found')
      return rolesArray
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id)

    if (!user) throw new NotFoundException('User not found')

    return user
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)

    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    }

    this.users.push(newUser)
    return newUser
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto }
      }
      return user
    })

    return this.findOne(id)
  }

  delete(id: number) {
    const removedUser = this.findOne(id)

    this.users = this.users.filter((user) => user.id !== id)

    return removedUser
  }
}
