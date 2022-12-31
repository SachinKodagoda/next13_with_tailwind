import { type IProduct } from "#/data/products";
import { dinero, type DineroSnapshot } from "dinero.js";
import Image from "next/image";
import Link from "next/link";
import { ProductBestSeller } from "./ProductBestSeller";
import { ProductEstimatedArrival } from "./ProductEstimatedArrival";
import { ProductLowStockWarning } from "./ProductLowStockWarning";
import { ProductPrice } from "./ProductPrice";
import { ProductRating } from "./ProductRating";
import { ProductUsedPrice } from "./ProductUsedPrice";

export const ProductCard = ({
  product,
  href,
}: {
  product: IProduct;
  href: string;
}) => {
  const price = dinero(product.price as DineroSnapshot<number>);

  return (
    <Link href={href} className="group block">
      <div className="space-y-2">
        <div className="relative">
          {product.isBestSeller ? (
            <div className="absolute top-2 left-2 z-10 flex">
              <ProductBestSeller />
            </div>
          ) : null}
          <Image
            src={`/products/${product.image}`}
            width={400}
            height={400}
            className="rounded-xl grayscale group-hover:opacity-80"
            alt={product.name}
            placeholder="blur"
            blurDataURL={product.imageBlur}
          />
        </div>

        <div className="truncate text-sm font-medium text-white group-hover:text-vercel-pink">
          {product.name}
        </div>

        {product.rating ? <ProductRating rating={product.rating} /> : null}

        <ProductPrice price={price} discount={product.discount} />

        {/* <ProductSplitPayments price={price} /> */}

        {product.usedPrice ? (
          <ProductUsedPrice usedPrice={product.usedPrice} />
        ) : null}

        <ProductEstimatedArrival leadTime={product.leadTime} />

        {product.stock <= 1 ? (
          <ProductLowStockWarning stock={product.stock} />
        ) : null}
      </div>
    </Link>
  );
};
