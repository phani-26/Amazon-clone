const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const cors= require("cors");
const stripe = require('stripe')('sk_test_51MfcsVSFo2jxqtMCnO2epBtedbZQXejC5cTJEp1qybS4GY3f6dcqWMsvlgXIbJIidr8ziwIOJI2nRqg8m8bl4kYG00tUC3zcuK');
//APP
const app= express();
//APP MIDDLEWARES   
app.use(cors({origin:true}));
app.use(express.json());
//APP routes
app.get('/create/payment', async (request, response) => {
    var amo = request.query.totalPrice;
    const paymentIntent = await stripe.paymentIntents.create({
      description: 'Software development services',
  shipping: {
    name: 'Jenny Rosen',
    address: {
      line1: '510 Townsend St',
      postal_code: '98140',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
    },
  },
        amount: amo,//subunits like pounds, paise
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });
      response.status(200);
    response.json({client_secret: paymentIntent.client_secret});
});
app.get('/', (request, response) => {logger.info(" log testing");response.status(200).send("your test is  kawjqdgqjafdjworking");});

logger.info("hey phani");
exports.api = onRequest(app);
