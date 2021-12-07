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
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalItems = await Item.countDocuments({ ...filter });
    const totalPages = Math.ceil(totalItems / limit);
    const offset = limit * (page - 1);
    const items = await Item.find(filter)
        .sort({ ...sortBy, createdAt: -1 })
        .skip(offset)
        .limit(limit).populate("owner")
    return sendResponse(res, 200, true, { items }, null, "Received all items");
})

itemController.getSingleItem = catchAsync(async (req, res) => {
    const item = await Item.findById(req.params.id).populate({ path: "offers", populate: "itemOffer" });
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


itemController.update = catchAsync(async (req, res) => {
    const { name, description, condition, imageUrl } = req.body;
    const item = await Item.findByIdAndUpdate(
        req.params.id,
        { name, description, condition, imageUrl },
        { new: true },
        (err, item) => {
        if (!item) {
            res.status(404).json({ message: "Item not found" })
        } else {
            return sendResponse(
                res,
                200,
                true,
                item,
                null,
                "Successfully update item"
            );
        }
    });
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
    if (id === itemOffer) throw new Error("Cannot create offer with this item");

    const item = await Item.findById(id);
    if (userId === item.owner._id) throw new Error("Cannot offer to own item");
    
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