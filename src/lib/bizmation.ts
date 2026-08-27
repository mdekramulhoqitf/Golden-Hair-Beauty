import { getBrowserUid } from "@/lib/browser-id";

const WORKER_URL = process.env.NEXT_PUBLIC_META_CONVERSION_WORKER_URL;

interface OrderItem {
  product_title: string;
  price: number;
  quantity: number;
}

export function pushBizmationOrder(order: {
  name: string;
  address: string;
  mobile_number: string;
  delivery_charge: number;
  note?: string;
  items: OrderItem[];
}) {
  if (!WORKER_URL) return;

  fetch(`${WORKER_URL}/bizmation/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uu_id: getBrowserUid(),
      name: order.name,
      address: order.address,
      mobile_number: order.mobile_number,
      delivery_charge: order.delivery_charge,
      check_duplicate_order: "No",
      note: order.note,
      order_items: order.items.map((item) => ({
        type: "Title",
        product_title: item.product_title,
        price: item.price,
        quantity: item.quantity,
      })),
    }),
  }).catch(() => {});
}

export function pushBizmationFailedOrder(order: {
  name: string;
  address: string;
  mobile_number: string;
  shipping_charge: number;
  items: OrderItem[];
}) {
  if (!WORKER_URL) return;

  fetch(`${WORKER_URL}/bizmation/failed-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      uid: getBrowserUid(),
      shipping_name: order.name,
      shipping_mobile_number: order.mobile_number,
      shipping_address: order.address,
      shipping_charge: order.shipping_charge,
      product_datas: order.items.map((item) => ({
        type: "Title",
        product_title: item.product_title,
        selling_price: item.price,
        quantity: item.quantity,
      })),
    }),
  }).catch(() => {});
}
