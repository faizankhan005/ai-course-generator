import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import db from "@/config/db";
import { usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
 // IMPORTANT

export async function POST(req: NextRequest) {

  try {

    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "Email not found" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    // Insert new user if not exists
    if (users.length === 0) {

      await db.insert(usersTable).values({
        email: email,
        name: user.fullName || "User",
        credits: 10   // make sure schema has credits
      });

    }

    return NextResponse.json({ success: true });

  } catch (error) {

    console.log("API ERROR:", error);

    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );

  }
}