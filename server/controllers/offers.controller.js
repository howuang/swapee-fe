const OfferRequest = require("../models/OfferRequest");
const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Item = require("../models/Item");

const offerController = {};

offerController.getAllOffers = catchAsync(async (req, res) => {
    let { page, limit, sortBy, ...filter } = { ...req.query };
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const totalItems = await OfferRequest.countDocuments({ ...filter });
    const totalPages = Math.ceil(totalItems / limit);
    const offset = limit * (page - 1);
    const offers = await OfferRequest.find(filter)
        .sort({ ...sortBy, createdAt: -1 })
        .skip(offset)
        .limit(limit).populate({ path: "item", populate: "owner" }).lean().populate("owner").lean().populate("itemOffer").lean();
    return sendResponse(res, 200, true, { offers }, null, "Received all offer requests");
});

offerController.getReceiveOffers = catchAsync(async (req, res) => {
    let userId = req.userId;
     const sentOffers = await OfferRequest.find({ owner: userId })

})

offerController.getSingleOffer = catchAsync(async (req, res) => {
    const offerRequest = await OfferRequest.findById(req.params.id)
    if (!offerRequest) {
        res.status(404).json({ message: "Swap request not found" });
    } else {
        return sendResponse(
            res,
            200,
            true,
            offerRequest,
            null,
            "Successfully get single swap request"
        );
    }
});

offerController.update = catchAsync(async (req, res) => {
    const offerRequest = await OfferRequest.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }).populate("item");
    
    //Update both items in the request as swapped
    await Item.findByIdAndUpdate(offerRequest.item._id, { isSwapped: true, newOwner: offerRequest.owner._id });
    await Item.findByIdAndUpdate(offerRequest.itemOffer._id, { isSwapped: true, newOwner: offerRequest.item.owner._id });
    if (!offerRequest) {
        res.status(404).json({ message: "Swap request not found" });
    } else {
        return sendResponse(
            res,
            200,
            true,
            offerRequest,
            null,
            "Successfully update swap request"
        );
    }
});

offerController.delete = catchAsync(async (req, res) => {
    const offerRequest = await OfferRequest.findByIdAndDelete(req.params.id)
    if (!offerRequest) {
        res.status(404).json({ message: "Swap request not found" });
    } else {
        return sendResponse(
            res,
            200,
            true,
            offerRequest,
            null,
            "Successfully delete swap request"
        );
    }
});

module.exports = offerController;