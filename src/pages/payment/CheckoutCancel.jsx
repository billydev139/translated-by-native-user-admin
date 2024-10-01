import React from 'react'
import { Link } from 'react-router-dom'

function CheckoutCancel() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
        <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
          <path fill="currentColor"
            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 14.93V17a1 1 0 1 1-2 0v-1.07a6.84 6.84 0 0 1-4.6-4.6H7a1 1 0 1 1 0-2H6.4A6.84 6.84 0 0 1 11 6.07V5a1 1 0 1 1 2 0v1.07a6.84 6.84 0 0 1 4.6 4.6H17a1 1 0 1 1 0 2h.6A6.84 6.84 0 0 1 13 15.93Z">
          </path>
        </svg>
        <h3 className="md:text-2xl text-base text-gray-900 font-semibold">Payment Cancelled</h3>
        <p className="text-gray-600 my-2">Your payment has been cancelled. You can continue shopping or try again later.</p>
        <div className="py-10">
          <Link to="/" className="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutCancel
