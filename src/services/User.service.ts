import { getRepository, Repository } from "typeorm";
import { CLoginEntities } from "../db/entities/CLogin.entities";
import { UserModel } from "../db/models/User.model";
import { IUser } from "../interfaces/User.interface";
import { UserEntities } from "../db/entities/User.entities";
import AppDataSource from "../db/dataSource";

export class UserService {

  [x: string]: any;
  static registerUser(arg0: { username: any; email: any; password: any; role: any; }) {
    throw new Error("Method not implemented.");
  }
  private userModel = new UserModel();

  
  async registerUser(data: IUser) {
    // Check if the user already exists by email
    const existingUser = await this.userModel.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create a new user if no existing user is found
    return await this.userModel.createUser(data);
  }




  async getUserByEmail(email: string) {
    return this.userModel.getByEmail(email);  // Pass email to model method
  }
  
   // Method to get a user by ID
  async getUserById(userId: number) {
    const userRepository = getRepository(CLoginEntities);
    
    const user = await userRepository.findOne({ where: { userId: userId.toString() } });

    if (!user) {
        throw new Error('User not found'); 
    }

    return user; 
}


async filterUser(filters: { username?: string; email?: string; role?: string }) {
  const userRepository: Repository<CLoginEntities> = AppDataSource.getRepository(CLoginEntities);

  const query = userRepository.createQueryBuilder('user');

  if (filters.username) {
    query.andWhere('user.username = :username', { username: filters.username });
  }

  if (filters.email) {
    query.andWhere('user.email = :email', { email: filters.email });
  }

  if (filters.role) {
    query.andWhere('user.role = :role', { role: filters.role });
  }

  const users = await query.getMany();
  return users.length ? users : null;
}



  // Method to get all users
  async getAllUsers() {
    const userRepository = AppDataSource.getRepository(CLoginEntities);
    const users = await userRepository.find();

    if (users.length === 0) {
      throw new Error('No users found');
    }

    return users;
  }



  async updateUser(id: number, data: Partial<UserEntities>) {
    const userRepository = AppDataSource.getRepository(UserEntities);

    // Ensure the ID is valid
    const user = await userRepository.findOne({ where: { userId: id } }); // Correctly use 'userId'
    if (!user) {
      throw new Error('User not found');
    }

    // Perform the update
    await userRepository.update(id, data);

    // Fetch the updated user
    const updatedUser = await userRepository.findOne({ where: { userId: id } });
    return updatedUser;
  }



   // New Method: Patch user 
   async patchUser(id: number, data: { email?: string; mobileNumber?: string }) {
    // Initialize the repository
    const userRepository = AppDataSource.getRepository(CLoginEntities);

    // Find the user by ID
    const user = await userRepository.findOne({ where: { loginId: id } }); // Use loginId as it matches your entity

    if (!user) {
        throw new Error("User not found");
    }

    // Update fields dynamically
    if (data.email) user.email = data.email;
    if (data.mobileNumber) user.mobileNumber = data.mobileNumber;

    // Save the updated user
    await userRepository.save(user);
    return user;
}



  async deleteUser(id: number) {
    const userRepository = AppDataSource.getRepository(CLoginEntities);

    // Find the user by ID
    const user = await userRepository.findOne({ where: { userId: id.toString() } });
    if (!user) {
        throw new Error("User not found");
    }

    // Remove the user from the database
    await userRepository.remove(user);
    return { message: "User deleted successfully" };
}

}



