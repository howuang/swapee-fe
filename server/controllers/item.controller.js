const Item = require("../models/Item");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const OfferRequest = require("../models/OfferRequest");


const itemController = {};

itemController.create = catchAsync(async (req, res) => {
    const { name, description, category, condition, imageUrl } = req.body;
    let item;
    if (!imageUrl) {
        item = await Item.create({ owner: req.userId, name, description, condition, category });
    } else {
        item = await Item.create({ owner: req.userId, name, description, condition, category, imageUrl });
    }
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
            .limit(limit).populate("owner")
        
    } else if (category) {
        items = await Item.find({ category: category })
            .sort({ ...sortBy, createdAt: -1 })
            .skip(offset)
            .limit(limit).populate("owner")
    } else if (owner) {
        items = await Item.find({ owner: owner })
            .sort({ ...sortBy, createdAt: -1 })
            .skip(offset)
            .limit(limit).populate("owner")
    }
    else {
        items = await Item.find()
            .sort({ ...sortBy, createdAt: -1 })
            .skip(offset)
            .limit(limit).populate("owner")
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
    console.log("item offer", itemOffer)
    console.log("id", id)
    const userId = req.userId;
    const offer = await OfferRequest.findOne({item: id, itemOffer: itemOffer })
    if (offer) {
        res.status(404).json({ message: "Cannot make the same offer again" });
    } else if (id === itemOffer) {
       res.status(404).json({ message: "Cannot offer same item" })
    };
    const item = await Item.findById(id);
    
    const offerRequest = await OfferRequest.create({
        itemOffer,
        owner: userId,
        message,
        item: id
    });

    item.offers.push(offerRequest._id);

    await item.save();
    await item.populate("offers");
    // await item.execPopulate();
    return sendResponse(res, 200, true, { offerRequest }, null, "Create comment");
});


module.exports = itemController;