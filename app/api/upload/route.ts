import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

// Validate environment variables
const requiredEnvVars = {
  CLOUDFLARE_R2_ACCESS_KEY_ID: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
  CLOUDFLARE_R2_SECRET_ACCESS_KEY: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  CLOUDFLARE_R2_BUCKET_NAME: process.env.CLOUDFLARE_R2_BUCKET_NAME,
  CLOUDFLARE_R2_ENDPOINT: process.env.CLOUDFLARE_R2_ENDPOINT,
  CLOUDFLARE_R2_PUBLIC_URL: process.env.CLOUDFLARE_R2_PUBLIC_URL,
};

const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

// Initialize S3 client with Cloudflare R2 credentials
const S3 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    console.log('Fetching images from R2, bucket:', process.env.CLOUDFLARE_R2_BUCKET_NAME);
    console.log('Public URL base:', process.env.CLOUDFLARE_R2_PUBLIC_URL);
    
    const command = new ListObjectsV2Command({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    });

    const response = await S3.send(command);
    console.log('R2 List response:', JSON.stringify(response, null, 2));
    
    if (!response.Contents) {
      console.log('No images found in bucket');
      return NextResponse.json({ images: [] });
    }

    const images = response.Contents
      .filter(item => item.Key && item.Key.match(/\.(jpg|jpeg|png|gif|webp)$/i)) // Only include image files
      .map(item => {
        const key = item.Key!;
        // Ensure the URL is properly formatted
        const url = new URL(key, process.env.CLOUDFLARE_R2_PUBLIC_URL).toString();
        
        const imageData = {
          id: key,
          url,
          filename: key.split('-').slice(1).join('-') || key,
          uploadedAt: item.LastModified?.toISOString(),
        };
        console.log('Processed image:', imageData);
        return imageData;
      });

    console.log('Returning images:', images.length);
    return NextResponse.json({ images });
  } catch (error) {
    console.error('List images error:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return NextResponse.json(
      { error: 'Failed to list images', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    
    console.log('Uploading file:', {
      filename,
      type: file.type,
      size: buffer.length,
      bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME
    });

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
      ACL: 'public-read',
    });

    await S3.send(command);

    // Construct the URL using URL API
    const url = new URL(filename, process.env.CLOUDFLARE_R2_PUBLIC_URL).toString();
    console.log('Upload successful:', { url });
    
    return NextResponse.json({
      success: true,
      url,
      filename,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: 'No filename provided' },
        { status: 400 }
      );
    }

    console.log('Deleting file:', filename);

    const command = new DeleteObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: filename,
    });

    await S3.send(command);
    console.log('Delete successful:', filename);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 