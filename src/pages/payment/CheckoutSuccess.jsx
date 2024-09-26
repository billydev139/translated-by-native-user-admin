import React from 'react'

function CheckoutSuccess() {
  return (
    <div>
        <h1>Thank you for your purchase!</h1>
        <p>Your order has been successfully placed.</p>
      <button onClick={() => window.location.href = '/'}>Go back to Homepage</button>
    </div>
  )
}

export default CheckoutSuccess
