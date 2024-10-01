import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table/Table";
import Spinner from "../../components/Spinner/Spinner";

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

import { getMyOrder, getSingleOrder } from "../../redux/feature/order/order.service";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const OrderList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  //Data From Redux Store
  const isLoading = useSelector((state) => state?.loading[getMyOrder.typePrefix]);
  
  const myOrderListData = useSelector((state) => state?.order?.myOrder?.orders?.orders);
  
  const totalPages = useSelector((state) => state?.order?.myOrder?.orders?.pages);
  const totalRecords = useSelector((state) => state?.order?.myOrder?.orders?.total);
  console.log("totalPages: ", totalPages + "\ntotalRecords: ", totalRecords);

  //Table Columns
  const columns = [
    { title: "Customer", field: "name", span: 1 },
    { title: "Source Language", field: "sourceLanguage", span: 1 },
    { title: "Target Language", field: "targetLanguage", span: 1 },
    { title: "Topic", field: "topic", span: 1 },
    { title: "Status", field: "status", span: 1 },
    { title: "Payment", field: "payment_status", span: 1 },
    { title: "Total Pricing", field: "totalPricing", span: 1 },
    { title: "Action", field: "document", span: 1 },
  ];

  useEffect(() => {
    console.log("INSIDE USEEFFECT")
    if (searchQuery !== undefined && searchQuery.trim() !== "") {
      
      console.log("INSIDE USEEFFECT IF")

      const handler = setTimeout(() => {
        console.log("Dispatching with searchQuery:", searchQuery);
        dispatch(
          getMyOrder({ page: currentPage, limit: itemsPerPage, search: searchQuery })
        );
      }, 1000);

      return () => clearTimeout(handler);

    } else {
      console.log("INSIDE USEEFFECT ELSE")
      console.log("Fetching users without searchQuery");
      dispatch(getMyOrder({ page: currentPage, limit: itemsPerPage }));
    }

  }, [dispatch, currentPage, itemsPerPage, searchQuery]);


  const downloadFilesAsZip = async (docData) => {
  
    const zip = new JSZip();

    // Fetch each file and add it to the ZIP
    const fetchFiles = docData.map(async (fileObj) => {
      
      const url = `${process.env.REACT_APP_BASE_URL}/documents/${fileObj.fileName}`;

      try {
        const response = await axios.get(url, { responseType: 'blob' }); // Fetch the file using its URL
        const blob = response.data; // Blob data from response
        
        const fileName = url.substring(url.lastIndexOf('/') + 1); // Extract the file name from URL
        zip.file(fileName, blob); // Add file to the ZIP

      } catch (error) {
        console.error(`Failed to fetch ${url}:`, error);
      }
    });

    // Once all files are processed, generate and download the ZIP file
    try {
      await Promise.all(fetchFiles);
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'documents.zip'); // Download the ZIP file

    } catch (error) {
      console.error('Failed to generate ZIP file:', error);
      alert('An error occurred while generating the ZIP file.');
    }
  }

  const handleFileDownload = (item) => {

    const docData = item?.docData
    
    if (docData.length === 1) {
      // If there's only one file, download it directly
      const file = docData[0];
      const url = `${process.env.REACT_APP_BASE_URL}/documents/${file.fileName}`;
      const fileName = url.substring(url.lastIndexOf('/') + 1); // Extract file name

      axios.get(url, { responseType: 'blob' })
        .then(response => saveAs(response.data, fileName))
        .catch(error => {
          console.error(`Failed to download file ${fileName}:`, error);
        });
    } 
    else if (docData.length > 1) {
      // If there are multiple files, download them as a ZIP
      downloadFilesAsZip(docData);
    }
  }


  const viewOrderDetails = (id) => {
    localStorage.setItem('orderId', id);
    dispatch(getSingleOrder(id))
    .then(() => {
      // dispatch(openModal({ componentName: OrderDetails }))
      navigate('/order/detail');
    })
  }


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Order List" />
      <div className="max-w-full overflow-auto bg-white dark:bg-white">
        <div>
          <div className="py-2 p-1 gap-3 flex flex-col sm:flex-row justify-between items-center space-x-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

          {isLoading ? (
            <Spinner/>
          ) : totalRecords > 0 ? (
            // overflow-x-auto
            <div className="min-h-[300px] md:min-h-[600px] bg-white p-1">
              <Table
                columns={columns}
                data={myOrderListData}
                handleFileDownload={handleFileDownload}
                viewOrderDetails={viewOrderDetails}
              />
            </div>
          ) : (
            <div className="bg-white flex justify-center items-center min-h-[300px] md:min-h-[600px]">
              <p className="font-bold text-center"> No Record found </p>
            </div>
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="p-4 sm:p-6 xl:p-7.5 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

    </DefaultLayout>
  );
};

export default OrderList;