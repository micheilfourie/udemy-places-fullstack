import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/user.js";
import dotenv from "dotenv";

dotenv.config();

const mongoDB = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.7dayc.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`;

async function seedUsers() {
  await mongoose.connect(mongoDB);
  console.log("✅ Connected to MongoDB");

  const users = Array.from({ length: 50 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync("123456", 12),
    image: "",
  }));

  await User.insertMany(users);
  console.log(`🎉 Inserted ${users.length} dummy users`);

  await mongoose.connection.close();
}

seedUsers();
