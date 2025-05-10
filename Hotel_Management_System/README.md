#  Hotel Management System 

<p align="justify">
The <b>Hotel Management System</b> is a hotel room booking system that allows users to search for hotels, view available rooms, and make reservations, while administrators can manage hotels, rooms, and bookings. Users can register and log in using their email and password, with authentication handled through JWT for secure access. Once logged in, users can search for hotels based on location, date, and availability, view hotel details, and select rooms for booking. The booking details, including check-in and check-out dates, are saved in the database and linked to the user’s account. The admin panel enables hotel administrators to add, update, and delete hotels and rooms, as well as manage user bookings and update room availability. The backend is built using Node.js and Express.js, connected to a MongoDB database, with API routes handling authentication, hotel data retrieval, and booking management. This project serves as a functional hotel booking system that can be customized for various types of accommodations and booking applications.
</p>


---

## 🚀 Working of the Project

### -> User Authentication & Authorization
- Users can register and log in using their email and password.
- Authentication is handled using **JWT (JSON Web Token)** for secure access.
- Logged-in users can **book rooms**, while admins have additional privileges.

### -> Searching & Viewing Hotels
- Users can search for hotels based on **location, date, and availability**.
- The homepage lists hotels, showing basic details like **name, price, and rating**.
- Clicking on a hotel provides more details, including available rooms.

### -> Booking a Room
- Users select a hotel and choose an **available room**.
- After selecting the **check-in/check-out dates**, they confirm the booking.
- The booking is saved in the **database** and linked to the user account.

### -> Admin Panel (Managing Hotels & Bookings)
- **Admins** can **add, update, and delete** hotels and rooms.
- They can view **all bookings** made by users.
- Room availability is updated based on **user bookings**.

### -> Database & Backend Functionality
- The backend is built using **Node.js and Express.js**, connected to a **MongoDB database**.
- **API routes** handle **user authentication, hotel data, and booking processes**.
- **Admins and users have different permissions** for accessing features.

---

## 🛠️ Technology Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Token)  

---
## 🔑 Environment Variables (Create .env file)
Create a .env file in the backend (api) folder and add the following:<br>
MONGO_URL=your_mongodb_connection_string<br>
JWT_SECRET=your_secret_key<br>
PORT=8800

---
## Admin credentials
username: Rose <br>
password:123456789
## 👨‍💻 Contributors

Thanks to the following people who have contributed to this project:  

- Roopa L S - [GitHub](https://github.com/Roopa4112)  
- Shivanand Rayaraddi - [GitHub](https://github.com/Shivu0711)  
- Vikas Gowda - [GitHub](https://github.com/vvg070)  
 

## 📌 How to Run the Project

### Clone the Repository<br>
git clone https://github.com/Roopa4112/Hotel-Management-System.git <br>
cd Hotel-Management-System<br>

### Install Dependencies<br>
   npm install<br>

### Start the Backend Server<br>
  cd api<br>
  npm start<br>

 ### Start the Frontendr<br>
  cd client<br>
  npm start<br>

 ### Start the Admin<br>
  cd admin<br>
  npm start



