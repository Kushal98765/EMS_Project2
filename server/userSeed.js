import bcrypt from 'bcrypt'
import connectToDatabase from './db/db.js'
import User from './models/User.js'

const userRegister = async () => {
    try {
        connectToDatabase()
        const hashPassword = await bcrypt.hash("admin", 10)
        const newUser = new User({
            name: "Admin",
            email: "admin@gmail.com",
            password: hashPassword,
            role: "admin"
        })
        await newUser.save()
    } catch(error) {
        console.log(error)
    }
}

userRegister();



