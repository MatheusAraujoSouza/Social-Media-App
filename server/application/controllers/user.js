import container from '../../app.js';
const userServer = container.resolve('UserServer');;

export const signin = async (req, res) => {
    const { email, password } = req.body;
    const { status, data } = await userServer.signInServer(email, password);
    res.status(status).json(data);
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    const { status, data } = await userServer.signUpServer(email, password, confirmPassword, firstName, lastName);
    res.status(status).json(data);
}
