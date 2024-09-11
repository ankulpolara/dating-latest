
import User from "@/models/User";
import connectDB from "../../../lib/connectDB";
import bcrypt from "bcryptjs"



export async function POST(request) {
    await connectDB(); // Connect to the database

    try {
        const { userName, email, password } = await request.json(); // Parse the request body


        console.log(userName, email, password)

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User already exists try to sign-in' }), { status: 404 });
        }

        // Create a new user instance

        let hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            userName,
            email,
            password: hashedPassword, // Ideally, hash the password before saving
        });

        // Save the user to the database
        let user = await newUser.save();

        return new Response(JSON.stringify({ message: 'User registered successfully', user }), { status: 201 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
