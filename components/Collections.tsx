import { getCollections } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div>
      <p className="text-heading1-bold">Collections</p>
      <div>
        {collections.map((collection: CollectionType) => (
          <Link key={collection._id} href={`/collections/${collection._id}`}>
            <Image
              className="rounded-lg cursor-pointer"
              src={collection.image}
              alt={collection.title}
              width={350}
              height={200}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collections;
