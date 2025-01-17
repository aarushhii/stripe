// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   console.log("hello")
//   switch (req.method) {
//     case "POST":
//       try {
//         // Create Checkout Sessions from body params.
//         const session = await stripe.checkout.sessions.create({
//           ui_mode: 'embedded',
//           line_items: [
//             {
//               // Provide the exact Price ID (for example, pr_1234) of
//               // the product you want to sell
//               price: 'price_1OyVMrSFtqgp1xNVnD7L3Ovm',
//               quantity: 1,
//             },
//           ],
//           mode: 'subscription',
//           return_url:
//             `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
//         });

//         res.send({clientSecret: session.client_secret});
//       } catch (err) {
//         res.status(err.statusCode || 500).json(err.message);
//       }
//       break;
//     case "GET":
//       try {
//         const session =
//           await stripe.checkout.sessions.retrieve(req.query.session_id);

//         res.send({
//           status: session.status,
//           customer_email: session.customer_details.email
//         });
//       } catch (err) {
//         res.status(err.statusCode || 500).json(err.message);
//       }
//       break;
//     default:
//       res.setHeader('Allow', req.method);
//       res.status(405).end('Method Not Allowed');
//   }
// }
import { NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  switch (req.method) {
    case "POST":
      try {
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of
              // the product you want to sell
              price: 'price_1OyVMrSFtqgp1xNVnD7L3Ovm',
              quantity: 1,
            },
          ],
          mode: 'subscription',
          return_url:
            `${req.headers.origin}/return?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.json({ clientSecret: session.client_secret });
      } catch (err) {
        return NextResponse.error(err, { status: err.statusCode || 500 });
      }
    default:
      return NextResponse.error(new Error('Method Not Allowed'), { status: 405 });
  }
}

export async function GET(req) {
  switch (req.method) {
    case "GET":
      try {
        const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

        return NextResponse.json({
          status: session.status,
          customer_email: session.customer_details.email
        });
      } catch (err) {
        return NextResponse.error(err, { status: err.statusCode || 500 });
      }
    default:
      return NextResponse.error(new Error('Method Not Allowed'), { status: 405 });
  }
}

