import db from "@/config/db";
import { coursesTable, usersTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { COURSE_GENERATION_PROMPT } from "@/data/Prompt";
import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {

    const { topic, type, courseId } = await req.json();

    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const prompt = `${COURSE_GENERATION_PROMPT}

Topic: ${topic}
Type: ${type}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    const cleanedText = text.replace(/```json|```/g, "").trim();

    let JSONResult;

    try {
      JSONResult = JSON.parse(cleanedText);
    } catch (err) {
      console.error("Invalid JSON from Gemini:", cleanedText);
      throw new Error("AI returned invalid JSON");
    }

    // get user email
    const email = user.primaryEmailAddress?.emailAddress;

    // find user in DB
    const dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email!));

    const userId = dbUser[0].id;

    // insert course
    await db.insert(coursesTable).values({
      courseId,
      userId,
      courseName: JSONResult.title,
      userInput: topic,
      type,
      courseLayout: JSONResult,
      title: JSONResult.title,
      description: JSONResult.description
    });

    return NextResponse.json({
      success: true,
      data: JSONResult
    });

  } catch (error) {

    console.error("Course generation error:", error);

    return NextResponse.json(
      { error: "Failed to generate course layout" },
      { status: 500 }
    );

  }
}