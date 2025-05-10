import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);


// db.users.insertOne({
//   username: "Amjad Raza",
//   email: "amjad@gmail.com",
//   country: "India",
//   img: "/Users/amjadraza/Downloads/MERN_PROJECTS_2025/Hotel_Management_System/Booking app photo/people/1.jpg",
//   city: "Sirsi",
//   phone: "9986458809",
//   password: "amjad",
//   isAdmin: true
// })
