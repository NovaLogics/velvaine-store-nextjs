import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user) return new NextResponse("Unauthorized", { status: 403 });

    await connectToDB();

    let userData = await User.findOne({ clerkId: user.id });

    if (!userData) return new NextResponse("User not found", { status: 404 });

    const { productId } = await request.json();

    if (!productId)
      return new NextResponse("Product ID required!", { status: 400 });

    let isLiked =
      userData.wishlist?.length === 0
        ? false
        : userData.wishlist.includes(productId);

    if (isLiked) {
      //Dislike
      userData.wishlist = userData.wishlist.filter(
        (id: string) => id !== productId
      );
    } else {
      //Like
      userData.wishlist.push(productId);
    }

    await userData.save();

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.log("[user_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
