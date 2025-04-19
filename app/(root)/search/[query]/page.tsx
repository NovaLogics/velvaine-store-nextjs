import ProductCard from "@/components/ProductCard";
import { getSearchProducts } from "@/lib/actions/actions";

const SearchPage = async ({ params }: { params: { query: string } }) => {
  const { query } = await params;

  const searchProducts = await getSearchProducts(query);

  const decodedQuery = decodeURIComponent(query);

  return (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Search results for {decodedQuery}</p>
      {!searchProducts ||
        (searchProducts.length === 0 && (
          <p className="text-body-bold font-bold my-5">No result found!</p>
        ))}
      <div className="flex flex-wrap justify-between gap-16">
        {searchProducts.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
