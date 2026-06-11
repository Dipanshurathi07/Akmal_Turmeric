import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../Redux/Slice/OrderSlice";

const ManageOrders = () => {
  const dispatch = useDispatch();

  const {
    allOrders,
    loading,
    error,
  } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusChange = async (
    orderId,
    orderStatus
  ) => {
    await dispatch(
      updateOrderStatus({
        orderId,
        orderStatus,
      })
    );

    dispatch(getAllOrders());
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading Orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Orders
      </h2>

      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-3 text-left">
                  Order No.
                </th>

                <th className="px-4 py-3 text-left">
                  Customer
                </th>

                <th className="px-4 py-3 text-left">
                  Email
                </th>

                <th className="px-4 py-3 text-left">
                  Amount
                </th>

                <th className="px-4 py-3 text-left">
                  Payment
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>

                <th className="px-4 py-3 text-left">
                  Date
                </th>

                <th className="px-4 py-3 text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {allOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {order.orderNumber}
                  </td>

                  <td className="px-4 py-3">
                    {order.user?.name}
                  </td>

                  <td className="px-4 py-3">
                    {order.user?.email}
                  </td>

                  <td className="px-4 py-3">
                    ₹
                    {order.totalAmount?.toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    {order.paymentStatus}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus ===
                        "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.orderStatus ===
                            "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="pending">
                        Pending
                      </option>

                      <option value="confirmed">
                        Confirmed
                      </option>

                      <option value="processing">
                        Processing
                      </option>

                      <option value="shipped">
                        Shipped
                      </option>

                      <option value="delivered">
                        Delivered
                      </option>

                      <option value="cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {allOrders.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No Orders Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;