import { getBrowserUid } from "@/lib/browser-id";

const WORKER_URL = process.env.NEXT_PUBLIC_BIZMATION_API;
const TOKEN = '$2y$10$lQnUx1Nk3UJI/ROdBCj/neQBU53eUBIzEOBd/cbaUiN95c44rx6/S';
const INVENTORY_ID = process.env.NEXT_PUBLIC_BIZMATION_ID;

interface OrderItem {
  product_title: string;
  price: number;
  quantity: number;
  attributes?:string
}

export async function pushBizmationOrder(order: {
  name: string;
  address: string;
  mobile_number: string;
  delivery_charge: number;
  note?: string;
  items: OrderItem[];
}) {
  if (!WORKER_URL) return null;

  try {
    const response = await fetch(`${WORKER_URL}/orders/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        uu_id: getBrowserUid(),
        name: order.name,
        address: order.address,
        mobile_number: order.mobile_number,
        delivery_charge: order.delivery_charge,
        check_duplicate_order: "No",
        note: order.note,
        inventory_id: INVENTORY_ID,
        order_items: order.items.map((item) => ({
          type: "Title",
          product_title: item.product_title,
          price: item.price,
          quantity: item.quantity,
          attributes: item.attributes,
        })),
      }),
    });

    const data = await response.json();

    return {
      ok: response.ok,
      ...data,
    };
  } catch (error) {
    console.error("Bizmation Order Error:", error);

    return {
      ok: false,
      success: false,
      message: "Order submission failed",
    };
  }
}

export function pushBizmationFailedOrder(order: {
  name: string;
  address: string;
  mobile_number: string;
  shipping_charge: number;
  items: OrderItem[];
  attributes?:string
}) {
  if (!WORKER_URL) return;

  fetch(`${WORKER_URL}/orders/custom-ft`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
    },
    keepalive: true,
    body: JSON.stringify({
      uid: getBrowserUid(),
      shipping_name: order.name,
      shipping_mobile_number: order.mobile_number,
      shipping_address: order.address,
      shipping_charge: order.shipping_charge,
      inventory_id: INVENTORY_ID,
      product_datas: order.items.map((item) => ({
        type: "Title",
        product_title: item.product_title,
        selling_price: item.price,
        quantity: item.quantity,
        attributes: item.attributes
      })),
    }),
  }).catch(() => {});
}
