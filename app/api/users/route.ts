import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const user = await currentUser();

    if (!user) return new NextResponse("Unauthorized", { status: 403 });

    await connectToDB();

    let userData = await User.findOne({ clerkId: user.id });

    // when the use sign-in for the first time, create a new account for the user
    if (!userData) {
      userData = await User.create({ clerkId: user.id });
      await userData.save();
    }

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.log("[user_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};


export const dynamic = "force-dynamic";