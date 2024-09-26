import axios from "axios";
import { useSelector } from "react-redux";
import { config } from "../../utils/EndPoints";
import Swal from "sweetalert2";

const PayButton = ({ cartItems, paymentMethod, termsAccepted }) => {
  const user = useSelector((state) => state.auth);

  const handleStripeCheckout = async () => {
    try {
      const response = await axios.post(`${config.BASE_URL}/payment/create-checkout-session`, {
        cartItems,
        userId: user._id,
      });
      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to Stripe checkout
      }
    } catch (err) {
      console.error("Stripe Checkout Error:", err.message);
    }
  };

  const handlePayPalCheckout = () => {
    // Implement PayPal checkout logic here
    console.log("Redirecting to PayPal checkout...");
    // For example, you could open a PayPal window here
    // window.open('PAYPAL_CHECKOUT_URL', '_blank');
  };

  const handleCheckout = () => {
    if (!termsAccepted) {
        Swal.fire({
          title: "Error",
          text: "You must accept the terms and conditions before proceeding!",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
  
    // Route to Stripe or PayPal based on the selected payment method
    if (paymentMethod === "stripe") {
      handleStripeCheckout();
    } else if (paymentMethod === "paypal") {
      handlePayPalCheckout();
    } else {
      console.error("Unsupported payment method");
    }
  };

    // Handle Confirm Order action
    const handleConfirmOrder = () => {
        if (!termsAccepted) {
          Swal.fire({
            title: "Error",
            text: "You must accept the terms and conditions before proceeding!",
            icon: "error",
            confirmButtonText: "OK",
          });
          return;
        }
      };

  return (
    <>
      <button
        onClick={handleCheckout} // Use the updated checkout handler
        className="bg-[#FD8C04] text-white text-[10px] xl:text-xs 2xl:text-sm 3xl:text-base font-semibold px-5 py-2 rounded-md hover:bg-[#e69500]"
      >
        Confirm order
      </button>
    </>
  );
};

export default PayButton;
