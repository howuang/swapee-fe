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
        .limit(limit).lean().populate({ path: "item", populate: "owner" }).lean().populate("owner").lean().populate("itemOffer").lean();
    return sendResponse(res, 200, true, { offers }, null, "Received all offer requests");
});


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
    const offerId = req.params.id;
    console.log("req body", req.body);
    const { status } = req.body;
    console.log("status body", req.body)
    console.log("status", status)
    let found = await OfferRequest.findById(offerId)
    if (!found) {
        res.status(404).json({ message: "Swap request not found" });
    } else {
        if (status === "success") {
            found = await OfferRequest.findByIdAndUpdate(offerId, {status: "success"}, {new: true}).populate({ path: "item", populate: "offers" }).lean();
            await Promise.all(
                //Update other received offer requests of this item 
                found.item.offers.map(async (offer) => {
                    await OfferRequest.findByIdAndUpdate(found.item.offers._id, { status: "denied" }, {new: true})
                })
            )
            //Update both items in the request as swapped
            await Item.findByIdAndUpdate(found.item._id, { isSwapped: true, newOwner: found.owner._id });
            await Item.findByIdAndUpdate(found.itemOffer._id, { isSwapped: true, newOwner: found.item.owner._id });
        } else if (status === "deny") {
             found = await OfferRequest.findByIdAndUpdate(offerId, {status: "denied"}, {new: true})
        }
        return sendResponse(
            res,
            200,
            true,
            found,
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