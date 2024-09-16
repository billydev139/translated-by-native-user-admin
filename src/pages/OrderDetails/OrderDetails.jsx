import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrder } from '../../redux/feature/order/order.service';

const OrderDetails = ({ orderId, whatAreYou, _id, name, surname, phone, sourceLanguage, targetLanguage, topic, totalPricing, serviceType, status }) => {

  const dispatch = useDispatch();

  if(orderId){
    dispatch(getSingleOrder(orderId));
  }

  const singleOrderDetails = useSelector((state) => state?.order?.singleOrder?.order);
  console.log('singleOrderDetails: ', singleOrderDetails);

  if(singleOrderDetails)
  {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg rounded-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Order Details</h2>
        
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Customer Information */}
          <div className="border-2 border-blue-200 p-6 rounded-lg bg-blue-100">
            <h3 className="font-semibold text-blue-700 mb-4 text-xl">Customer Information</h3>
            <p className="text-blue-800"><strong>User Type:</strong> {singleOrderDetails.whatAreYou.userType}</p>
            <p className="text-blue-800"><strong>Company Name:</strong> {singleOrderDetails.whatAreYou.companyName}</p>
            <p className="text-blue-800"><strong>VAT:</strong> {singleOrderDetails.whatAreYou.VAT}</p>
            <p className="text-blue-800"><strong>Address:</strong> {singleOrderDetails.whatAreYou.address}</p>
            <p className="text-blue-800"><strong>Country:</strong> {singleOrderDetails.whatAreYou.country}</p>
            <p className="text-blue-800"><strong>Municipality:</strong> {singleOrderDetails.whatAreYou.municipality}</p>
            <p className="text-blue-800"><strong>Postcode:</strong> {singleOrderDetails.whatAreYou.postcode}</p>
          </div>
  
          {/* Order Information */}
          <div className="border-2 border-green-200 p-6 rounded-lg bg-green-100">
            <h3 className="font-semibold text-green-700 mb-4 text-xl">Order Information</h3>
            <p className="text-green-800"><strong>Order ID:</strong> {singleOrderDetails._id}</p>
            <p className="text-green-800"><strong>Customer Name:</strong> {singleOrderDetails.name} {singleOrderDetails.surname}</p>
            <p className="text-green-800"><strong>Phone:</strong> {singleOrderDetails.phone}</p>
            <p className="text-green-800"><strong>Source Language:</strong> {singleOrderDetails.sourceLanguage}</p>
            <p className="text-green-800"><strong>Target Language:</strong> {singleOrderDetails.targetLanguage.join(", ")}</p>
            <p className="text-green-800"><strong>Topic:</strong> {singleOrderDetails.topic}</p>
            <p className="text-green-800"><strong>Total Pricing:</strong> ${singleOrderDetails.totalPricing.toFixed(2)}</p>
            <p className="text-green-800"><strong>Service Type:</strong> {singleOrderDetails.serviceType[0].serviceName}</p>
            <p className="text-green-800"><strong>Status:</strong> {singleOrderDetails.status}</p>
          </div>
        </div>
        
        {/* Message */}
        {/* <p className="mt-6 text-lg text-purple-700 text-center"><strong>Message:</strong> {props.message}</p> */}
      </div>
    );
  }

  else {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg rounded-md">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Order Details</h2>
        
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Customer Information */}
          <div className="border-2 border-blue-200 p-6 rounded-lg bg-blue-100">
            <h3 className="font-semibold text-blue-700 mb-4 text-xl">Customer Information</h3>
            <p className="text-blue-800"><strong>User Type:</strong> {whatAreYou.userType}</p>
            <p className="text-blue-800"><strong>Company Name:</strong> {whatAreYou.companyName}</p>
            <p className="text-blue-800"><strong>VAT:</strong> {whatAreYou.VAT}</p>
            <p className="text-blue-800"><strong>Address:</strong> {whatAreYou.address}</p>
            <p className="text-blue-800"><strong>Country:</strong> {whatAreYou.country}</p>
            <p className="text-blue-800"><strong>Municipality:</strong> {whatAreYou.municipality}</p>
            <p className="text-blue-800"><strong>Postcode:</strong> {whatAreYou.postcode}</p>
          </div>
  
          {/* Order Information */}
          <div className="border-2 border-green-200 p-6 rounded-lg bg-green-100">
            <h3 className="font-semibold text-green-700 mb-4 text-xl">Order Information</h3>
            <p className="text-green-800"><strong>Order ID:</strong> {_id}</p>
            <p className="text-green-800"><strong>Customer Name:</strong> {name} {surname}</p>
            <p className="text-green-800"><strong>Phone:</strong> {phone}</p>
            <p className="text-green-800"><strong>Source Language:</strong> {sourceLanguage}</p>
            <p className="text-green-800"><strong>Target Language:</strong> {targetLanguage.join(", ")}</p>
            <p className="text-green-800"><strong>Topic:</strong> {topic}</p>
            <p className="text-green-800"><strong>Total Pricing:</strong> ${totalPricing.toFixed(2)}</p>
            <p className="text-green-800"><strong>Service Type:</strong> {serviceType[0].serviceName}</p>
            <p className="text-green-800"><strong>Status:</strong> {status}</p>
          </div>
        </div>
        
        {/* Message */}
        {/* <p className="mt-6 text-lg text-purple-700 text-center"><strong>Message:</strong> {props.message}</p> */}
      </div>
    );
  }
};

export default OrderDetails;
