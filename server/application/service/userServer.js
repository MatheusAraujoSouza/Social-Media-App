
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../domain/models/user.js';

class UserServer {

    async signInServer(email, password){
        try {
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return { status: 404, data: { message: "User doesn't exist" } };
            }
    
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    
            if (!isPasswordCorrect) {
                return { status: 400, data: { message: "Invalid credentials" } };
            }
    
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
    
            return { status: 200, data: { result: existingUser, token } };
        } catch (error) {
            return { status: 500, data: { message: "Something went wrong" } };
        }
    };

    async signUpServer(email, password, confirmPassword, firstName, lastName){
        try {
            const existingUser = await User.findOne({ email });
    
            if (existingUser) {
                return { status: 400, data: { message: "User already exists" } };
            }
    
            if (password !== confirmPassword) {
                return { status: 400, data: { message: "Passwords don't match" } };
            }
    
            const hashedPassword = await bcrypt.hash(password, 12);
    
            const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
    
            const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
    
            return { status: 200, data: { result, token } };
        } catch (error) {
            return { status: 500, data: { message: "Something went wrong" } };
        }
    };
}

export default UserServer;