import { StringUtil } from "../../Utilities/string-util.js";
import User from "../../model/user-model.js";
import { generateJWT } from "../../services/auth-service.js";

export function index(req, res) {
    const validation = validateIndex(req.body);
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
    }
    User.findOne({ username: req.body.username.toLowerCase() }, (error, user) => {
        if (error) {
            return res.status(500).json({ error: "User not found." });
        }
        if (!user) {
            return res
                .status(401)
                .json({ error: "Username or password is incorrect" });
        }
        const passwordsMatch = User.passwordMatches(
            req.body.password,
            user.password
        );
        if (!passwordsMatch) {
            return res.status(401).json();
        }
        const token = generateJWT(user);
        return res.status(200).json({ token: token });
    });
}
function validateIndex(body) {
    let errors = "";
    if (StringUtil.isEmpty(body.username)) {
        errors += "Username is required.";
    }
    if (StringUtil.isEmpty(body.password)) {
        errors += "Password is required.";
    }
    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors,
    };
}
