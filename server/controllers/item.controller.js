const Item = require("../models/Item");
const User = require("../models/User");
const OfferRequest = require("../models/OfferRequest");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");


const itemController = {};

itemController.create = catchAsync(async (req, res) => {
    const { name, description, category, condition, imageUrl } = req.body;
    let item;
    const owner = await User.findById(req.userId);
    let ownItems = await Item.find({ owner: owner });
    let availableItems = ownItems.filter((item) => item.isSwapped === "false");
    if (owner.membership === "basic" && availableItems.length >= 5) {
        res.status(404).json({ message: "Please upgrade or swap more before adding items" })
    } else if (owner.membership === "pro" && availableItems.length >= 10) {
        res.status(404).json({ message: "Please upgrade or swap more before adding items" })
    } else {
        if (!imageUrl) {
            item = await Item.create({ owner: req.userId, name, description, condition, category });
        } else {
            item = await Item.create({ owner: req.userId, name, description, condition, category, imageUrl });
        }
    };
    return sendResponse(
        res,
        200,
        true,
        { item },
        null,
        "Successfully create item"
    );
});

itemController.list = catchAsync(async (req, res) => {
    let { page, limit, sortBy, q, owner, category, ...filter } = { ...req.query }
    // req.query = { page: 1, limit: 10, name: { $regex: q, $options: 'i' }, category: { $regex: category, $options: 'i' } };
    let items;
    
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalItems = await Item.countDocuments({ ...filter });
    const totalPages = Math.ceil(totalItems / limit);
    const offset = limit * (page - 1);
    if (q) {
        items = await Item.find({ name: { $regex: q, $options: 'i' } })
            .sort({ ...sortBy, createdAt: -1 })
            .skip(offset)
            .limit(limit).populate("owner").lean()
        
    } else if (category) {
        items = await Item.find({ category: category })
            .sort({ ...sortBy, createdAt: -1 })
            .skip(offset)
            .limit(limit).populate("owner").lean()
    } else if (owner) {
        items = await Item.find({ owner: owner })
            .sort({ ...sortBy, createdAt: -1 })
            .skip(offset)
            .limit(limit).populate("owner").lean()
    }
    else {
        items = await Item.find()
            .sort({ ...sortBy, createdAt: -1 })
            .skip(offset)
            .limit(limit).populate("owner").lean()
    }
    return sendResponse(res, 200, true, { items }, null, "Received all items");
});

itemController.getOwnItems = catchAsync(async (req, res) => {
    const userId = req.userId;
    console.log("userId", userId);
    const ownItems = await Item.find({owner: userId})
    if (!ownItems) {
        res.status(404).json({message: "You don't have any item yet. Please add item"})
    } else {
        return sendResponse(
            res,
            200,
            true,
            ownItems,
            null,
            "Successfully get all your item"
        );
    }
})

itemController.getSingleItem = catchAsync(async (req, res) => {
    const item = await Item.findById(req.params.id).populate("owner").lean();
    if (!item) {
        res.status(404).json({ message: "Item not found" });
    } else {
        return sendResponse(
            res,
            200,
            true,
            item,
            null,
            "Successfully get single item"
        );
    }
});


itemController.update = catchAsync(async (req, res, next) => {
    let item;
    const allowOptions = ["name", "category", "description", "condition", "imageUrl"];
    const updateObject = {};
    try {
        allowOptions.forEach((option) => {
            if (req.body[option] !== "") {
                updateObject[option] = req.body[option];
            }
        });
        item = await Item.findByIdAndUpdate(
            req.params.id,
            updateObject,
            { new: true })

    } catch (error) {
        return next(error);
    }
    return sendResponse(
        res,
        200,
        true,
        item,
        null,
        "Successfully update item"
    ); 
});

itemController.delete = catchAsync(async (req, res) => {
    await Item.findByIdAndDelete(req.params.id, (err, item) => {
        if (!item) {
            res.status(404).json({ message: "Item not found" });
        } else {
            res.json(item)
        }
    })
});

itemController.createOfferRequest = catchAsync(async (req, res) => {
    const { message, itemOffer } = req.body;
    const { id } = req.params;
    const userId = req.userId;
    const owner = await User.findById(userId);
    let ownOffers = await OfferRequest.find({ owner: userId })
    let pendingOffers = ownOffers.filter((offer) => offer.status === 'pending');
    if (owner.membership === "basic" && pendingOffers.length >= 2) {
        res.status(404).json({ message: "Please upgrade or swap more before making swap requests" })
    } else if (owner.membership === "pro" && pendingOffers.length >= 5) {
        res.status(404).json({ message: "Please upgrade or swap more before making swap requests" })
    } else {
        if (id === itemOffer) {
            res.status(404).json({ message: "Cannot offer same item" })
        } 
        const item = await Item.findById(id);
        const offerRequest = await OfferRequest.create({
            itemOffer: itemOffer,
            owner: userId,
            message,
            item: id
        });
    
        item.offers.push(offerRequest._id);
    
        await item.save();
        await item.populate("offers");
        return sendResponse(res, 200, true,  offerRequest , null, "Create comment");
    }
});


module.exports = itemController;