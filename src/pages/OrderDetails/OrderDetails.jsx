
import { useSelector } from 'react-redux';

const OrderDetails = () => {

  const singleOrderDetails = useSelector((state) => state?.order?.singleOrder?.order);
  console.log('singleOrderDetails: ', singleOrderDetails);

  return (
    <div class="mt-6 max-w-6xl mx-auto p-4 bg-gray-50 shadow-md rounded-lg">

      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Order Details</h2>

      {/* <!-- Responsive Grid Layout --> */}
      <div class="grid grid-cols-1 md:grid-cols-2">
        {/* <!-- Customer Information --> */}
        <div class="p-6 rounded-lg bg-white">
          <h3 class="text-lg font-semibold text-blue-700 mb-4">Customer Information</h3>
          <div class="space-y-2">
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>User Type:</strong> { singleOrderDetails.whatAreYou.userType }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Company Name:</strong> { singleOrderDetails.whatAreYou.companyName }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>VAT:</strong> { singleOrderDetails.whatAreYou.VAT }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Address:</strong> { singleOrderDetails.whatAreYou.address }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Country:</strong> { singleOrderDetails.whatAreYou.country }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Municipality:</strong> { singleOrderDetails.whatAreYou.municipality }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Postcode:</strong> { singleOrderDetails.whatAreYou.postcode }</p>
          </div>
        </div>

        {/* <!-- Order Information --> */}
        <div class="p-6 rounded-lg bg-white">
          <h3 class="text-lg font-semibold text-green-700 mb-4">Order Information</h3>
          <div class="space-y-2">
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Order ID:</strong> { singleOrderDetails._id }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Customer Name:</strong> { singleOrderDetails.name } { singleOrderDetails.surname }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Phone:</strong> { singleOrderDetails.phone }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Source Language:</strong> { singleOrderDetails.sourceLanguage }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Target Language:</strong> { singleOrderDetails.targetLanguage.join(", ") }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Topic:</strong> { singleOrderDetails.topic }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Total Pricing:</strong> ${ singleOrderDetails.totalPricing.toFixed(2) }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Service Type:</strong> { singleOrderDetails.serviceType[0].serviceName }</p>
            <p class="text-gray-700 rounded-md pl-2 py-1"><strong>Status:</strong> { singleOrderDetails.status }</p>
          </div>
        </div>
      </div>

    </div>
  );
  }

export default OrderDetails;
