require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const authRoutes = require("./routes/authRoutes");
const alertRoutes = require("./routes/alertRoutes");
const tradingRoutes = require("./routes/tradingRoutes");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ─── AUTH ROUTES ──────────────────────────────────────────
app.use("/auth", authRoutes);

// ─── TRADING ROUTES ───────────────────────────────────────
app.use("/trade", tradingRoutes);

app.use("/alerts", alertRoutes);

// ─── CONTACT FORM ─────────────────────────────────────────
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Please fill in all fields",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "shubhagarwal291@gmail.com",
      replyTo: email,
      subject: `InvestSphere Contact Form - Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Email sending failed:", error);

    res.status(500).json({
      error: "Failed to send message",
    });
  }
});

// ─── HOLDINGS ─────────────────────────────────────────────
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

// ─── STOCK DETAILS ─────────────────────────────────────────────
app.get("/stock-details/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;

    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS?interval=1d&range=1y`,
    );

    const data = await response.json();

    const meta = data.chart.result[0].meta;

    res.json({
      price: meta.regularMarketPrice,
      high52: meta.fiftyTwoWeekHigh,
      low52: meta.fiftyTwoWeekLow,
      volume: meta.regularMarketVolume,

      marketCap: "Live Data",
      pe: "Live Data",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Unable to fetch stock data",
    });
  }
});

// ─── POSITIONS ────────────────────────────────────────────
app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// ─── ORDERS ───────────────────────────────────────────────
app.post("/newOrder", async (req, res) => {
  let newOrder = new OrdersModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });
  newOrder.save();
  res.send("Order saved!");
});

// ─── STOCK PRICE PROXY ────────────────────────────────────
app.get("/stock/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS?interval=1d&range=1d`,
    );
    const data = await response.json();
    const meta = data.chart.result[0].meta;
    const price = meta.regularMarketPrice.toFixed(2);
    const prevClose = meta.chartPreviousClose;
    const change = (
      ((meta.regularMarketPrice - prevClose) / prevClose) *
      100
    ).toFixed(2);
    res.json({
      name: symbol,
      price,
      percent: `${change > 0 ? "+" : ""}${change}%`,
      isDown: change < 0,
    });
  } catch (err) {
    res.status(404).json({ error: "Stock not found" });
  }
});

// ─── START SERVER ─────────────────────────────────────────
mongoose
  .connect(uri)
  .then(() => {
    console.log("DB started!");
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });
