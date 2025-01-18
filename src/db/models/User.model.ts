import AppDataSource from "../dataSource";
import bcrypt from "bcryptjs";
import { IUser, IUserCreateResp, IUserGetByEmailResp, IUserGetByIdResp } from "../../interfaces/User.interface";
import { UserEntities } from "../entities/User.entities";
import { CLoginEntities } from "../entities/CLogin.entities";

// UserModel class to interact with the database
export class UserModel {
  [x: string]: any;
    protected repository;
  findByEmail: any;

    // Initialize the repository for the UserEntities
    constructor() {
        this.repository = AppDataSource.getRepository(UserEntities);
    }

    // Method to create a new user
    // public async createUser(data: IUser): Promise<IUserCreateResp> {
    //     try {
    //         console.log('Jumped in UserModel => createUser()');
    //         // Hash the password before saving the user
    //         const hashedPassword = await bcrypt.hash(data.password, 10);

    //         // Save the user data along with the hashed password
    //         const { userId, name, email } = await this.repository.save({ ...data, password: hashedPassword });

    //         // Return a response with the userId, name, and email
    //         return { userId, name, email };
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // }


    public async createUser(data: IUser): Promise<IUserCreateResp> {
        try {
            console.log('Jumped in UserModel => createUser()');

            const hashedPassword = await bcrypt.hash(data.password, 10);

            const user = this.repository.create({ ...data, password: hashedPassword });
            const savedUser = await this.repository.save(user);

            const { userId, name, email } = savedUser;

            // Return a response with userId, name, and email
            return { userId, name, email };

        } catch (error) {
            // Throw a custom error with a more descriptive message
            throw new Error(`Error creating user: ${error.message}`);
        }
    }


    public async getByEmail(email: string): Promise<IUserGetByEmailResp | null> {
        try {
            console.log('Jumped in UserModel => getByEmail()');
            const user = await this.repository.findOne({
                select: {
                    userId: true,
                    name: true,
                    email: true
                },
                where: {
                    email: email
                }
            });
            return user || null;
        } catch (error) {
            throw new Error(error);
        }
    }
      

    // Method to get user details by ID
    public async getById(id: number): Promise<IUserGetByIdResp | null> {
        try {
            console.log('Jumped in UserModel => getById()');

            // Find the user by ID
            const user = await this.repository.findOne({
                select: {
                    userId: true,
                    name: true,
                    email: true
                },
                where: {
                    userId: id
                }
            });

            // Return user or null if not found
            return user || null;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getAllUsers() {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }
    
        const userRepository = AppDataSource.getRepository(CLoginEntities);
        return userRepository.find();
      }


      static async filterUser(filters: { username?: string; email?: string; role?: string }) {
        const userRepository = AppDataSource.getRepository(CLoginEntities);
    
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
    
        // Execute the query and return the result
        const users = await query.getMany();
        return users.length ? users : null;
      }

      async patchUser(id: number, data: { email?: string; mobileNumber?: string }) {
        const userRepository = AppDataSource.getRepository(CLoginEntities);
        const user = await userRepository.findOne({ where: { loginId: id } });
        if (!user) {
            throw new Error("User not found");
        }
        if (data.email) user.email = data.email;
        if (data.mobileNumber) user.mobileNumber = data.mobileNumber;
        await userRepository.save(user);
        return user;
    }
    

      async deleteUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { userId: id.toString() } });
        if (!user) {
          throw new Error('User not found');
        }
    
        // Remove the user from the database
        await this.userRepository.remove(user);
        return { message: 'User deleted successfully' };
      }
}























