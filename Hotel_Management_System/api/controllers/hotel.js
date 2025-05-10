import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// export const createHotel = async (req, res, next) => {
//   const newHotel = new Hotel(req.body);

//   try {
//     const savedHotel = await newHotel.save();
//     res.status(200).json(savedHotel);
//   } catch (err) {
//     next(err);
//   }
// };

export const createHotel = async (req, res, next) => {
  try {
    const imagePaths = req.files?.map((file) => `/uploads/${file.filename}`) || [];
    // const imagePaths = req.files?.map((file) => `/uploads/${file.filename`) || [];


    const newHotel = new Hotel({
      ...req.body,
      photos: imagePaths,
    });

    // 
    console.log("req.files:", req.files);
    console.log("req.body:", req.body);
    // 

    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};




/*
export const createHotel = async (req, res, next) => {
  try {
    console.log("Received Request Body:", req.body);  // ✅ Log request data

    // ✅ Validation: Ensure required fields are provided
    const { name, city, address, cheapestPrice, photos } = req.body;

    if (!name || !city || !address || !cheapestPrice || !photos) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields (name, city, address, cheapestPrice, photos)."
      });
    }

    // ✅ Create new hotel instance
    const newHotel = new Hotel(req.body);

    // ✅ Save to MongoDB
    const savedHotel = await newHotel.save();

    console.log("Hotel Created Successfully:", savedHotel);  // ✅ Log saved hotel
    res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      data: savedHotel
    });

  } catch (err) {
    console.error("Error Creating Hotel:", err);  // ✅ Log full error details

    // ✅ Send specific error message
    res.status(500).json({
      success: false,
      message: "Failed to create hotel",
      error: err.message
    });
  }
};
*/
export const updateHotel = async (req, res, next) => {
  const hotelId = req.params.id.trim();

  // ✅ Validate ID before updating
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ success: false, message: "Invalid Hotel ID" });
  }

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,    // ✅ Use trimmed ID
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

export const deleteHotel = async (req, res, next) => {
  const hotelId = req.params.id.trim();

  // ✅ Validate ID before deleting
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ success: false, message: "Invalid Hotel ID" });
  }

  try {
    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  const hotelId = req.params.id.trim();

  // ✅ Validate ID before querying
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ success: false, message: "Invalid Hotel ID" });
  }

  try {
    const hotel = await Hotel.findById(hotelId);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export const getHotels = async (req, res, next) => {
  const { city, min, max } = req.query;

  const minPrice = parseInt(min) || 1;
  const maxPrice = parseInt(max) || 999;

  console.log("City:", city, "Min Price:", minPrice, "Max Price:", maxPrice);

  try {
    // Build query
    const query = { cheapestPrices: { $gte: minPrice, $lte: maxPrice } }; // Corrected field name

    if (city) {
      query.city = { $regex: new RegExp(city, "i") };
    }

    console.log("Constructed MongoDB Query:", query);

    const hotels = await Hotel.find(query);

    if (hotels.length === 0) {
      console.log("No hotels found for query:", query);
      return res.status(200).json([]);  // Return empty array if no results found
    }

    console.log("Filtered Hotels:", hotels);
    res.status(200).json(hotels);

  } catch (err) {
    console.error("Error during fetching hotels:", err);
    next(err);
  }
};


/*
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities ? req.query.cities.split(",") : [];

  try {
    const list = await Promise.all(
      cities.map((city) => Hotel.countDocuments({ city: city }))
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
*/
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities ? req.query.cities.split(",") : [];

  // Debugging: Check the cities received in the query
  console.log("Cities received:", cities);

  try {
    const list = await Promise.all(
      cities.map((city) =>
        // Use a case-insensitive query to match cities
        Hotel.countDocuments({
          city: { $regex: new RegExp(`^${city}$`, "i") }, // Match city case-insensitively
        })
      )
    );

    console.log("City counts:", list); // Debugging: Check the counts returned from the database

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};


export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  const hotelId = req.params.id.trim();

  // ✅ Validate ID before querying
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ success: false, message: "Invalid Hotel ID" });
  }

  try {
    const hotel = await Hotel.findById(hotelId);
    const list = await Promise.all(
      hotel.rooms.map((room) => Room.findById(room))
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
