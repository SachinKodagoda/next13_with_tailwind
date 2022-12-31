import { ProductEstimatedArrival } from "#/components/product/ProductEstimatedArrival";
import { ProductLowStockWarning } from "#/components/product/ProductLowStockWarning";
import { ProductPrice } from "#/components/product/ProductPrice";
import { ProductSplitPayments } from "#/components/product/ProductSplitPayments";
import { ProductUsedPrice } from "#/components/product/ProductUsedPrice";
import { type IProduct } from "#/data/products";
import { dinero, type DineroSnapshot } from "dinero.js";
import { AddToCart } from "./AddToCart";
import { delay } from "./delay";

const shimmer = `relative overflow-hidden rounded-xl before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;

export function PricingSkeleton() {
  return (
    <div
      className={`h-[161px] space-y-4 rounded-lg bg-gray-800 ${shimmer}`}
    ></div>
  );
}

export async function Pricing({
  product,
  cartCount,
}: {
  product: IProduct;
  cartCount: number;
}) {
  const price = dinero(product.price as DineroSnapshot<number>);

  // Normally you would fetch data here
  await delay(500);

  return (
    <div className="space-y-4 rounded-lg bg-gray-900 p-3">
      <ProductPrice price={price} discount={product.discount} />
      <ProductSplitPayments price={price} />
      {product.usedPrice ? (
        <ProductUsedPrice usedPrice={product.usedPrice} />
      ) : null}
      <ProductEstimatedArrival leadTime={product.leadTime} hasDeliveryTime />
      {product.stock <= 1 ? (
        <ProductLowStockWarning stock={product.stock} />
      ) : null}
      <div className="space-y-2">
        <AddToCart initialCartCount={Number(cartCount)} />
      </div>
    </div>
  );
}
