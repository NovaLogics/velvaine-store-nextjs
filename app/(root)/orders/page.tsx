"use client";
import { getOrders } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async (userId: string) => {
    try {
      const fetchedOrders = await getOrders(userId);
      setOrders(fetchedOrders);
      console.log(fetchedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchOrders(user?.id as string);
  }, [user?.id]);

  console.log(orders);

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="text-heading3-bold font-semibold my-10">Your Orders</p>
      {!orders ||
        (orders.length === 0 && (
          <p className="text-body-bold font-bold my-5">
            You have no orders yet!
          </p>
        ))}

      <div className="flex flex-col gap-10">
        {orders.map((order: OrderType) => (
          <div
            key={order._id}
            className="flex flex-col gap-8 hover:bg-grey-2 py-2"
          >
            <div className="flex gap-20 max-md:flex-col max-md:gap-3">
              <p className="text-base-bold font-bold">Order ID: {order._id}</p>
              <p className="text-base-bold">
                Total Amount: ${order.totalAmount}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {order.products.map((orderItem: OrderItemType) => (
                <div key={orderItem._id} className="flex gap-4">
                  <Image
                    className="w-32 h-32 object-cover rounded-lg"
                    src={orderItem.product.media[0]}
                    alt={orderItem.product.title}
                    width={100}
                    height={100}
                  />

                  <div className="flex flex-col justify-between">
                    <p className="text-small-medium">
                      Title:{" "}
                      <span className="text-small-bold font-semibold">
                        {orderItem.product.title}
                      </span>
                    </p>

                    {orderItem.color && (
                      <p className="text-small-medium">
                        Color:{" "}
                        <span className="text-small-bold font-semibold">
                          {orderItem.color}
                        </span>
                      </p>
                    )}

                    {orderItem.size && (
                      <p className="text-small-medium">
                        Size:{" "}
                        <span className="text-small-bold font-semibold">
                          {orderItem.size}
                        </span>
                      </p>
                    )}

                    <p className="text-small-medium">
                      Unit Price::{" "}
                      <span className="text-small-bold font-semibold">
                        ${orderItem.product.price}
                      </span>
                    </p>
                    <p className="text-small-medium">
                      Quantity:{" "}
                      <span className="text-small-bold font-semibold">
                        {orderItem.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
