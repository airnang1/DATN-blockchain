const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND,
);

//send mail
const sendEMailPurchase = (to, username, products) => {
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    });

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'phamcongtuanz2001@gmail.com',
            pass: process.env.PASS_EMAIL,
            clientId: 'CLIENT_ID_HERE',
            clientSecret: 'CLIENT_SECRET_HERE',
            refreshToken: 'REFRESH_TOKEN_HERE',
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: 'Shop Điện tử Phạm Tuấn',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
            <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'>
            <link rel="stylesheet" href="../public/css/optionEmailPaymentStyle.css">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
            <style type="text/css">
            body {
                text-align: center;
                padding: 40px 0;
                background: #EBF0F5;
            }
        
            h1 {
                color: #88B04B;
                font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
                font-weight: 900;
                font-size: 40px;
                margin-bottom: 10px;
            }
        
            p {
                color: #404F5E;
                font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
                font-size: 20px;
                margin: 0;
            }
        
            i {
                color: #9ABC66;
                font-size: 100px;
                line-height: 200px;
                margin-left: -15px;
                position: inherit;
            }
        
            .card {
                background: white;
                padding: 60px;
                border-radius: 4px;
                box-shadow: 0 2px 3px #C8D0D8;
                display: inline-block;
                margin: 0 auto;
            }
              
  .table-wrap {
    overflow-x: scroll; }
    .table {
        min-width: 1000px !important;
        width: 100%;
        -webkit-box-shadow: 0px 5px 12px -12px rgba(0, 0, 0, 0.29);
        -moz-box-shadow: 0px 5px 12px -12px rgba(0, 0, 0, 0.29);
        box-shadow: 0px 5px 12px -12px rgba(0, 0, 0, 0.29); }
        .table thead th {
          border: none;
          padding: 30px;
          font-size: 13px;
          font-weight: 500;
          color: gray; }
        .table thead tr {
          background: #fff;
          border-bottom: 4px solid #eceffa; }
        .table tbody tr {
          margin-bottom: 10px;
          border-bottom: 4px solid #f8f9fd; }
          .table tbody tr:last-child {
            border-bottom: 0; }
        .table tbody th, .table tbody td {
          border: none;
          padding: 30px;
          font-size: 14px;
          background: #fff;
          vertical-align: middle; }
        .table tbody td.status span {
          position: relative;
          border-radius: 30px;
          padding: 4px 10px 4px 25px; }
          .table tbody td.status span:after {
            position: absolute;
            top: 9px;
            left: 10px;
            width: 10px;
            height: 10px;
            content: '';
            border-radius: 50%; }
        .table tbody td.status .active {
          background: #cff6dd;
          color: #1fa750; }
          .table tbody td.status .active:after {
            background: #23bd5a; }
        .table tbody td.status .waiting {
          background: #fdf5dd;
          color: #cfa00c; }
          .table tbody td.status .waiting:after {
            background: #f2be1d; }
        .table tbody td .img {
          width: 50px;
          height: 50px;
          border-radius: 50%; }
        .table tbody td .email span {
          display: block; }
          .table tbody td .email span:last-child {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.3); }
        .table tbody td .close span {
          font-size: 12px;
          color: #dc3545; }
          .d-flex {
            display: -webkit-box !important;
            display: -ms-flexbox !important;
            display: flex !important; }
            .align-items-center {
                -webkit-box-align: center !important;
                -ms-flex-align: center !important;
                align-items: center !important; }
                .border-bottom-0 {
                    border-bottom: 0 !important; }
        </style>
        
        </head>
        <body>
            <div class="card">
                <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
                    <i class="checkmark">✓</i>
                </div>
                <h1>Thanks ${username} for purchase</h1>
                <p>Thank you for purchasing from our shop, and we will respond to you soon when the order is confirmed
                    successfully!</p>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="table-wrap">
                        <table class="table table-responsive-xl">
                            <thead>
                                <tr>
                                    <th>image</th>
                                    <th>name</th>
                                    <th>price</th>
                                    <th>quantity</th>
                                    <th>total</th>
                                </tr>
                            </thead>
                            <tbody>
                            ${products.map(
                                (
                                    product,
                                    index,
                                ) => `<tr class="alert" role="alert" key=${index}>
                                    <td class="border-bottom-0"><img src=${
                                        product.description
                                    } alt=${
                                    product.name
                                } style="width: 35%, height: 35%"/></td>
                                    <td class="border-bottom-0">${
                                        product.name
                                    }</td>
                                    <td class="status border-bottom-0"><span class="waiting">${
                                        product.price
                                    }$</span></td>
                                    <td class="status border-bottom-0"><span class="waiting">${
                                        product.quantity
                                    }$</span></td>
                                    <td class="border-bottom-0">
                                    ${product.price * product.quantity} $
                                    </td>
                                </tr>`,
                            )}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </body>
        
        </html>
       `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Verfication email is sent to your gmail account');
        }
    });
};

module.exports = sendEMailPurchase;
