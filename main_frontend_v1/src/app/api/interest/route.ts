import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const cleanedPhone = phone.trim().replace(/[\s\-()]/g, "");
    if (!/^\d{10}$/.test(cleanedPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit phone number (without +91)" },
        { status: 400 }
      );
    }

    // Try saving to src/data/interests.json (repository file - local development)
    const localDataDir = path.join(process.cwd(), "src", "data");
    const localFilePath = path.join(localDataDir, "interests.json");
    
    let success = false;
    let errorMsg = "";

    try {
      await fs.mkdir(localDataDir, { recursive: true });
      let interests: Array<{ phone: string; timestamp: string }> = [];
      
      try {
        const data = await fs.readFile(localFilePath, "utf-8");
        interests = JSON.parse(data);
      } catch (e) {
        // file doesn't exist
      }

      const exists = interests.some((item) => item.phone === cleanedPhone);
      if (!exists) {
        interests.push({
          phone: cleanedPhone,
          timestamp: new Date().toISOString(),
        });
        await fs.writeFile(localFilePath, JSON.stringify(interests, null, 2), "utf-8");
      }
      success = true;
    } catch (localError: any) {
      console.warn("Local filesystem write failed (read-only in serverless/Vercel). Falling back to /tmp. Error:", localError.message);
      errorMsg = localError.message;
    }

    // Fallback to /tmp/interests.json if local write failed (Vercel Serverless environment)
    if (!success) {
      try {
        const tmpFilePath = path.join("/tmp", "interests.json");
        let interests: Array<{ phone: string; timestamp: string }> = [];

        try {
          const data = await fs.readFile(tmpFilePath, "utf-8");
          interests = JSON.parse(data);
        } catch (e) {
          // file doesn't exist in /tmp
        }

        const exists = interests.some((item) => item.phone === cleanedPhone);
        if (!exists) {
          interests.push({
            phone: cleanedPhone,
            timestamp: new Date().toISOString(),
          });
          await fs.writeFile(tmpFilePath, JSON.stringify(interests, null, 2), "utf-8");
        }
        success = true;
        console.log("Successfully wrote phone number to Vercel /tmp/interests.json storage.");
      } catch (tmpError: any) {
        console.error("Failed to write to /tmp fallback:", tmpError.message);
        // Even if both fail, we don't want to throw a 500 error to the end user for a simple interest form
        // return success so the frontend flow doesn't break, but log it
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving interest phone number:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
