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

    const dataDir = path.join(process.cwd(), "src", "data");
    const filePath = path.join(dataDir, "interests.json");

    // Ensure the src/data directory exists
    await fs.mkdir(dataDir, { recursive: true });

    let interests: Array<{ phone: string; timestamp: string }> = [];

    // Read the existing file if it exists
    try {
      const data = await fs.readFile(filePath, "utf-8");
      interests = JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, start with empty list
    }

    // Check if phone number already exists to avoid duplicates
    const exists = interests.some((item) => item.phone === cleanedPhone);
    if (!exists) {
      // Append the new interest record
      interests.push({
        phone: cleanedPhone,
        timestamp: new Date().toISOString(),
      });

      // Write the updated list back to the file
      await fs.writeFile(filePath, JSON.stringify(interests, null, 2), "utf-8");
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
