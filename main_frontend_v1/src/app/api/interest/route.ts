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

    const timestamp = new Date().toISOString();
    const source = process.env.VERCEL ? "Production (Vercel)" : "Local Development";

    // 1. Send data to Google Sheets Webhook if configured
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const sheetResponse = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: cleanedPhone,
            timestamp,
            source,
          }),
        });
        if (sheetResponse.ok) {
          console.log("Successfully sent phone number to Google Sheets.");
        } else {
          console.warn("Google Sheets webhook returned a non-ok status:", sheetResponse.status);
        }
      } catch (err: any) {
        console.error("Failed to send data to Google Sheets Webhook:", err.message);
      }
    } else {
      console.log("Google Sheets Webhook URL is not configured. Skipping Sheets sync.");
    }

    // 2. Local fallback storage (always logs locally for testing)
    const localDataDir = path.join(process.cwd(), "src", "data");
    const localFilePath = path.join(localDataDir, "interests.json");
    
    let localSaved = false;

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
          timestamp,
        });
        await fs.writeFile(localFilePath, JSON.stringify(interests, null, 2), "utf-8");
      }
      localSaved = true;
    } catch (localError: any) {
      // Log local fs failure (expected on read-only Vercel)
      console.warn("Local filesystem save bypassed (expected on Vercel):", localError.message);
    }

    // 3. Temporary /tmp storage fallback on Vercel as secondary backup
    if (!localSaved && !webhookUrl) {
      try {
        const tmpFilePath = path.join("/tmp", "interests.json");
        let interests: Array<{ phone: string; timestamp: string }> = [];

        try {
          const data = await fs.readFile(tmpFilePath, "utf-8");
          interests = JSON.parse(data);
        } catch (e) {
          // file doesn't exist
        }

        const exists = interests.some((item) => item.phone === cleanedPhone);
        if (!exists) {
          interests.push({
            phone: cleanedPhone,
            timestamp,
          });
          await fs.writeFile(tmpFilePath, JSON.stringify(interests, null, 2), "utf-8");
        }
      } catch (tmpError: any) {
        console.error("Failed writing to temporary /tmp storage:", tmpError.message);
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
