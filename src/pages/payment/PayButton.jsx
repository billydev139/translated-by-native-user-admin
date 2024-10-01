import axios from "axios";
import { useSelector } from "react-redux";
import { config } from "../../utils/EndPoints";
import Swal from "sweetalert2";
import api from "../../utils/Api";
import { useState } from "react";

const PayButton = ({ cartItems, paymentMethod, termsAccepted }) => {
const orderSummary = useSelector(state => state?.order?.orderSummary);
const User = useSelector((state) => state?.auth?.user);

// isLoading 
const [isLoading, setIsLoading] = useState(false);
cartItems = {
    ...cartItems,
    docData : orderSummary?.file,
    userId : User?._id
}
    const handleStripeCheckout = async () => {
        setIsLoading(true);
        try {
          const response = await api.post(`${config.BASE_URL}/payment/create-checkout-session`, {
            cartItems,
          });
      
          console.log("Stripe response:", response); // Log the response
          if (response.data.url) {
            window.location.href = response.data.url; // Redirect to Stripe checkout
          } else {
            console.error("No URL returned from Stripe:", response.data);
          }
        } catch (err) {
          console.error("Stripe Checkout Error:", err);
          Swal.fire({
            title: "Error",
            text: "There was an issue processing your payment.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
        setIsLoading(false);
      };
      

  const handlePayPalCheckout = () => {
    // Implement PayPal checkout logic here
    console.log("Redirecting to PayPal checkout...");
    // For example, you could open a PayPal window here
    // window.open('PAYPAL_CHECKOUT_URL', '_blank');
  };

  const handleCheckout = () => {
    console.log("Checkout button clicked");
    console.log("Payment Method:", paymentMethod); // Log the payment method
    
    if (!termsAccepted) {
      Swal.fire({
        title: "Error",
        text: "You must accept the terms and conditions before proceeding!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (paymentMethod === "Stripe") {
      handleStripeCheckout();
    } else if (paymentMethod === "PayPal") {
      handlePayPalCheckout();
    } else {
      console.error("Unsupported payment method");
      Swal.fire({
        title: "Error",
        text: "Unsupported payment method selected.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <button
        onClick={handleCheckout} // Use the updated checkout handler
        className="bg-[#FD8C04] text-white text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base font-semibold px-5 py-2 rounded-md hover:bg-[#e69500]"
      >
        {isLoading ? "Processing..." : "Checkout"}
      </button>
    </>
  );
};

export default PayButton;
