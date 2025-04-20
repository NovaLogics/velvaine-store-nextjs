import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white text-black">
      <Image
        src="/banner.jpg"
        alt="banner"
        width={2000}
        height={1000}
        className="w-screen"
      />
      <Collections />
      <ProductList />
    </div>
  );
}

export const dynamic = "force-dynamic";
