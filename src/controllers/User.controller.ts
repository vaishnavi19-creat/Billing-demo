import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/User.service";

const userService = new UserService();

export class UserController{

  // Register user
  static registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body (ensure that all required fields are present)
      const { username, email, password, role } = req.body;

      // Ensure all required fields are provided
      if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields (username, email, password, role) are required.' });
      }

      // If the validation passes, proceed with the service
      const user = await UserService.registerUser({ username, email, password, role });

      return res.status(201).json(user);
    } catch (error) {
      // Handle any errors from the service
      return res.status(400).json({ message: error.message });
    }
  }

static getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;  // Extract email from the URL params
    const user = await userService.getUserByEmail(email);
    
    // If no user found
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // If user found, return user data
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}


    // Method to get a user by ID
static getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { id } = req.params;
      const userId = parseInt(id, 10); 
      const user = await userService.getUserById(userId);
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }
          return res.status(200).json(user);
      } catch (error) {
          return res.status(400).json({ message: error.message });
      }
  };


   static filterUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = req.query.username ? (req.query.username as string) : undefined;
      const email = req.query.email ? (req.query.email as string) : undefined;
      const role = req.query.role ? (req.query.role as string) : undefined;

      const filters: { username?: string; email?: string; role?: string } = {
        username,
        email,
        role,
      };

      // Correctly instantiate the CUserService class
      const userService = new UserService(); // Use the correct class name
      const user = await userService.filterUser(filters);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({
        message: error.message || "An error occurred while filtering the user",
      });
    }
  };


  // New Method: Get all users
  static getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const userService = new userService(); // Instantiate the service
      const users = await userService.getAllUsers(); // Call the service
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };




  static updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the 'id' parameter from the route
      const { id } = req.params;

      // Validate and convert 'id' to a number
      const userId = Number(id);
      if (isNaN(userId) || userId <= 0) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Log the incoming data for debugging
      console.log("Request Params ID:", userId);
      console.log("Request Body Data:", req.body);

      // Extract the data from the request body
      const data = req.body;

      // Call the service to perform the update
      const updatedUser = await userService.updateUser(userId, data);

      // Return the updated user as a JSON response
      return res.status(200).json(updatedUser);
    } catch (error) {
      // Log the error for debugging
      console.error("Error in updateUser controller:", error.message);

      // Handle any errors and return an appropriate response
      return res.status(400).json({ message: error.message });
    }
  };


  // New Method: Patch user (Update specific fields)
  static patchUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // Extract ID from params
        const { email, mobileNumber } = req.body; // Extract fields from body

        // Ensure the ID is a number
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const userService = new UserService(); // Instantiate the service

        // Call the service method to update the user
        const updatedUser = await userService.patchUser(Number(id), { email, mobileNumber });

        return res.status(200).json(updatedUser); // Respond with updated user
    } catch (error) {
        return res.status(400).json({ message: error.message }); // Error response
    }
};


 // Controller method to handle user deletion
static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    // Ensure that id is passed as a number and handle any invalid or missing ids
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const userService = new UserService(); 

    // Call the delete method from the service to delete the user
    const result = await userService.deleteUser(Number(id));

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};




}





















// import { Request, Response, NextFunction } from "express";
// import { UserService } from "../services/User.service";

// const userService = new UserService();

// export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { username, email, password, role } = req.body;
//     const user = await userService.registerUser({ username, email, password, role });
//     return res.status(201).json(user);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

// export const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { email } = req.params;
//     const user = await userService.getUserByEmail(email);
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };
