import React from "react";
import StripeCheckout from "react-stripe-checkout";

function StripeCheckoutButton({ totalAmount }) {
  // stripe expects amount to be in cents
  const totalAmountInCents = totalAmount * 100;
  const stripePublicKey = "pk_test_olbMGPKYThBmahdHfJMBGIqH00AeUZrXFB";

  const onToken = (token) => {
    console.log(token);
    alert("payment successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      panelLabel="Pay Now"
      name="Crown Clothing"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your Total is: ${totalAmount}`}
      amount={totalAmountInCents}
      stripeKey={stripePublicKey}
      token={onToken}
    />
  );
}

export default StripeCheckoutButton;
