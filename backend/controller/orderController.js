const Order = require("../models/orderModel");

const newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsprice,
    taxprice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const { user } = req.user._id;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsprice,
    taxprice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  });
  res.status(201).json({ success: true, order });
};

const getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return res.status(401).json({
      success: false,
      message: "The item is not found in orders",
    });
  }
  res.status(201).json({
    success: true,
    order,
  });
};

const myOrders = async (req, res, next) => {
  let totalAmount = 0;
  const order = await Order.find({ user: req.user._id });
  if (!order) {
    return res.status(401).json({
      success: false,
      message: "Your item is not find the order list",
    });
  }
  order.forEach((order) => (totalAmount += order.totalPrice));
  res.status(201).json({
    success: true,
    totalAmount,
    order,
  });
};

const getAllOrder = async (req, res, next) => {
  let totalAmout = 0; // Initialize totalSum to 0
  const orders = await Order.find();

  if (!orders || orders.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No orders",
    });
  }

  orders.forEach((order) => (totalAmout += order.totalPrice));

  res.status(201).json({
    success: true,
    totalAmout,
    orders,
  });
};

const updateOrder = async (req, res, next) => {
  const updatedData = { status: "" };
  let order = await Order.findByIdAndUpdate(req.params.id);
  res.status(201).json({
    success: true,
    totalAmout,
    orders,
  });
};

const deleteOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: "The order is not found" });
  }
  await Order.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "The order is deleted successfully" });
};

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrder,
  deleteOrder,
};
