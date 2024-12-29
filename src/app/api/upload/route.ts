import { NextResponse, NextRequest } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});
async function uploadFileToS3(
  buffer: Buffer,
  filename: string,
  folder: string
) {
  const fileBuffer = buffer;
  const key = `${folder}/${Date.now()}-${filename}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    Body: fileBuffer,
    ContentType: "image/jpeg",
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  return url;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;
    if (!file) {
      return NextResponse.json(
        { message: "La imagen es requerida" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const imageUrl = await uploadFileToS3(buffer, file.name, folder);
    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: "Error al subir la imagen",
    });
  }
}
