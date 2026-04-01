import HikingItem from "../models/HikingItems.js";

export const getHikingItems = async (req, res) => {
  try {
    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // filters
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.isEssential) {
      filter.isEssential = req.query.isEssential === "true";
    }

    if (req.query.difficultyLevel) {
      filter.difficultyLevel = req.query.difficultyLevel;
    }

    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: "i" };
    }

    // sorting
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    const items = await HikingItem.find(filter)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    const total = await HikingItem.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};