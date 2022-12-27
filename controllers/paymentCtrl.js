// const InputFieldConfigProduct = require('../models/InputFieldConfigProduct.js');
const paypal = require("paypal-rest-sdk");
const url = require("url");
const sendEMailPurchase = require("../utils/sendMailPurchase.js");

// const baseURL = "https://buihoanglong19012001.netlify.app/";
const baseURL = "http://localhost:1901";
const baseURLBE = "http://localhost:8800/api";
// const baseURLBE = "https://servernodeapp1901.herokuapp.com/api";

const paypalProductCtrl = {
  createPaypalPayment: async (req, res) => {
    const { products, email, message, paymentFee, serviceTypeId } = req.body;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    const items = products.map((product, _) => {
      const priceNew = +product.price / 23085;
      return {
        name: product.name,
        sku: product._id,
        price: formatter.format(priceNew).replace("$", "").replace(",", ""),
        currency: "USD",
        quantity: product.qty,
        description: product.image,
      };
    });

    const total = items.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    try {
      const create_payment = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          return_url: `${baseURLBE}/payment/success?total=${total}&email=${email}&paymentFee=${paymentFee}&serviceTypeId=${serviceTypeId}`,
          cancel_url: `${baseURLBE}/payment/cancel`,
        },
        transactions: [
          {
            item_list: {
              items: items,
            },
            amount: {
              currency: "USD",
              total: formatter.format(total).replace("$", "").replace(",", ""),
            },
            description: message,
          },
        ],
      };

      const create_payment_json = JSON.stringify(create_payment);

      paypal.payment.create(create_payment_json, (err, payment) => {
        if (err) {
          console.log({ payment: err });
          res.status(400).json(err);
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              console.log("send url success");
              res.status(200).json({
                paymentUrl: payment.links[i].href,
              });
            }
          }
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getPaypalPaymentSuccess: async (req, res) => {
    console.log({ paymentSuccess: true });
    try {
      const { PayerID, paymentId, total, email, paymentFee, serviceTypeId } =
        req.query;

      const execute_payment_json = {
        payer_id: PayerID,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: total,
            },
          },
        ],
      };

      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        function (error, payment) {
          if (error) {
            console.log({ paymentError: error });
            return res.redirect(`${baseURL}/order/cancel`);
          } else {
            const stringItemId = payment.transactions[0].item_list.items.reduce(
              (string, item) => {
                return string + "-" + item.sku;
              },
              ""
            );

            const { first_name, last_name } = payment.payer.payer_info;

            sendEMailPurchase(
              email,
              `${last_name} ${first_name}`,
              payment.transactions[0].item_list.items
            );

            return res.redirect(
              url.format({
                pathname: `${baseURL}/order/success/${paymentId}`,
                query: {
                  username: `${last_name} ${first_name}`,
                  productsId: stringItemId,
                  isPayment: "true",
                  message: payment.transactions[0].description,
                  paymentFee,
                  serviceTypeId,
                },
              })
            );
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  getPaypalPaymentCancel: async (req, res) => {
    try {
      return res.redirect(`${baseURL}/order/cancel`);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

module.exports = paypalProductCtrl;
