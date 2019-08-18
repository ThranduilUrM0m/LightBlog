const User = require('../../models/Users.js');
const passwordHash = require("password-hash");
const nodemailer = require('nodemailer');

async function main(user_email) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // true for 465, false for other ports
        auth: {
            user: 'yassmineboutalebqlii@gmail.com', // generated ethereal user
            pass: '[1234abcd]' // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'yassmineboutalebqlii@gmail.com', // sender address
        to: user_email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
async function signup(req, res) {
    const { signup_username, signup_password, signup_email, activated, messages } = req.body;
    if (!signup_username || !signup_email || !signup_password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        return res.status(400).json({
            text: "Requête invalide"
        });
    }
    // Création d'un objet user, dans lequel on hash le mot de passe
    const user = {
        email: signup_email,
        username: signup_username,
        password: passwordHash.generate(signup_password),
        activated: activated,
        messages: messages,
    };
    // On check en base si l'utilisateur existe déjà
    try {
        const findUserByEmail = await User.findOne({
            email: user.email
        });
        const findUserByUsername = await User.findOne({
            username: user.username
        });
        if (findUserByEmail || findUserByUsername) {
            return res.status(400).json({
                text: "L'utilisateur existe déjà"
            });
        }
    } catch (error) {
        return res.status(500).json({ error });
    }

    try {
        // Sauvegarde de l'utilisateur en base
        const userData = new User(user);
        const userObject = await userData.save();

        main(user.email).catch(console.error);

        return res.status(200).json({
            text: "Succès",
            email: user.email,
            username: user.username,
            token: userObject.getToken()
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

async function login(req, res) {
    const { password, email } = req.body;
    if (!email || !password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        return res.status(400).json({
            text: "Requête invalide"
        });
    }
    try {
        // On check si l'utilisateur existe en base
        const findUser = await User.findOne({ 
            email 
        });
        if (!findUser)
            return res.status(401).json({
                text: "L'utilisateur n'existe pas"
            });
        if (!findUser.authenticate(password))
            return res.status(401).json({
                text: "Mot de passe incorrect"
            });
        console.log(findUser);
        return res.status(200).json({
            token: findUser.getToken(),
            email: findUser.email,
            username: findUser.username,
            text: "Authentification réussi"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error
        });
    }
}

//On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;