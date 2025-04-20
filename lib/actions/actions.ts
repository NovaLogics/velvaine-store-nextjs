export const getCollections = async () => {
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`
  );
  return await collections.json();
};

export const getCollectionDetails = async (collectionId: string) => {
  const collections = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}`
  );
  return await collections.json();
};

export const getProducts = async () => {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);

  return await products.json();
};

export const getProductDetails = async (productId: string) => {
  const products = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
  );

  return await products.json();
};

export const getSearchProducts = async (query: string) => {
  const searchProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/search/${query}`
  );
  return await searchProducts.json();
};


export const getOrders = async (customerId: string) => {
  const orders = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`
  );

  return await orders.json();
};