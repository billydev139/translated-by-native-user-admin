import React from "react";

import { LuEye, LuTrash2 } from "react-icons/lu";
import { MdEdit, MdOutlineFileDownload, MdOutlineFileDownloadOff } from "react-icons/md";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu, } from "../Dropdown/Dropdown";
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { FaUsers, FaCrown, FaUserTie } from 'react-icons/fa';
import StatusBadge from "../Badge";

const Table = ({
  columns,
  data,
  handleFileDownload,
  viewOrderDetails,
  onDelete,
  onEdit = () => {},
  isModalOpen,
  setEditFlag = () => {},
  setOpenAddUserModal,
  setCompanyId,
  setOpenAssignCardModal = () => {},
  setSelectedUserCard
}) => {

  console.log("DATA INSIDE TABLE: ", data );

  return (
<div className="overflow-hidden rounded-xl border border-[#e5e5e5] shadow-lg mt-3">
  {/* Wrapper to handle horizontal scrolling */}
  <div className="overflow-x-auto">
    <table className="w-full text-left bg-white p-9 table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          {columns.map((column, index) => (
            <th key={index} className="p-1">
              <h5 className="min-w-[150px] text-subtitle-xsm py-3 px-4 font-medium text-black dark:text-white">
                {column.title}
              </h5>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="bg-white dark:bg-boxdark">
        {data?.map((item, rowIndex) => (
          <tr key={item._id || rowIndex} className="border-t border-[#EEEEEE] dark:border-strokedark">
            {columns?.map((column, colIndex) => (
              <td key={colIndex} className="border-b border-[#eee] py-3 px-4 dark:border-strokedark">
                <div className="text-subtitle-xsm text-[#495057] dark:text-bodydark">
                  {/* Render action column */}
                  {column.field === "action" && (
                    <div className="flex space-x-4">
                      <Dropdown>
                        <DropdownButton plain aria-label="More options">
                          <EllipsisVerticalIcon />
                        </DropdownButton>
                        <DropdownMenu anchor="bottom end">
                          <DropdownItem>
                            <MdEdit className="cursor-pointer text-green-500" />
                            <button onClick={() => { setEditFlag(true); onEdit(item); }}>
                              Edit
                            </button>
                          </DropdownItem>

                          <DropdownItem>
                            <LuTrash2 className="cursor-pointer text-red-500" />
                            <button className="pl-5" onClick={() => onDelete(item?._id)}>
                              Delete
                            </button>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  )}

                  {/* Render customer name */}
                  {column.field === "customer" ? (
                    <div className="flex justify-between lg:w-[60%] items-start space-x-2">
                      <span className="underline">{item?.name + " " + item?.surname}</span>
                    </div>
                  ) : column.field === "targetLanguage" ? (
                    <div className="flex gap-1 flex-wrap">
                      {item[column.field].map((language, index) => (
                        <span key={index}>
                          <StatusBadge language={language} />
                        </span>
                      ))}
                    </div>
                  ) : column.field === "name" ? (
                    <div className="flex justify-between lg:w-[60%] items-start space-x-2">
                      <span className="underline">{item?.name + " " + item?.surname}</span>
                    </div>
                  ) : column.title === "Role" ? (
                    <div className="flex items-center">
                      {item[column.field] === "SUPER-ADMIN" && (
                        <span className="flex items-center text-xs font-semibold py-1 px-3 rounded-full bg-red-500 text-white">
                          <FaCrown className="mr-2" />
                          Super Admin
                        </span>
                      )}
                      {item[column.field] === "ADMIN" && (
                        <span className="flex items-center text-xs font-semibold py-1 px-3 rounded-full bg-blue-500 text-white">
                          <FaUserTie className="mr-2" />
                          ADMIN
                        </span>
                      )}
                      {item[column.field] === "USER" && (
                        <span className="flex items-center text-xs font-semibold py-1 px-3 rounded-full bg-green-500 text-white">
                          <FaUsers className="mr-2" />
                          USER
                        </span>
                      )}
                    </div>
                  ) : column.field === "document" ? (
                    <div className="flex space-x-6">
                      <LuEye className="size-4 xl:size-6 text-red-500 cursor-pointer" onClick={() => viewOrderDetails(item._id)} />
                      {item?.translatedDoc?.length > 0 ? (
                        <MdOutlineFileDownload
                          className="size-4 xl:size-6 text-green-500 cursor-pointer"
                          onClick={() => handleFileDownload(item)}
                        />
                      ) : (
                        <MdOutlineFileDownloadOff className="size-4 xl:size-6 text-gray-500 cursor-pointer" />
                      )}
                    </div>
                  ) : column.field === "status" ? (
                    <StatusBadge status={item.status} />
                  ) : column.field === "totalPricing" ? (
                    <div>{`€ ${item[column.field].toFixed(2)}`}</div>
                  ) : (
                    <div>{item[column.field]}</div>
                  )}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    
  );
};

export default Table;
