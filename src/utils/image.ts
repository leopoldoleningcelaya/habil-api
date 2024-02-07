import * as fs from 'fs/promises';
import * as path from 'path';

export async function saveImageFromBase64(base64: string, filePath: string): Promise<void> {
  const base64Data = base64.replace(/^data:image\/png;base64,/, '');
  const directory = path.dirname(filePath);

  try {
    // Check if the directory exists, create it if not
    await fs.access(directory);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // Directory doesn't exist, create it
      await fs.mkdir(directory, { recursive: true });
    } else {
      throw err;
    }
  }

  try {
    // Write the file
    await fs.writeFile(filePath, base64Data, 'base64');
    console.log(`File at ${path} successfully saved`);
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Failed to save image');
  }
}

export async function removeImage(path: string): Promise<void> {
  try {
    // Attempt to unlink (delete) the file
    await fs.unlink(path);
    console.log(`File at ${path} successfully removed`);
  } catch (error) {
    console.error(`Error removing file at ${path}:`, error);
    throw new Error('Failed to remove file');
  }
}

export async function encodeImageToBase64(filePath: string): Promise<string> {
  try {
    // Read the image file
    const imageData = await fs.readFile(filePath);
    const base64Image = imageData.toString('base64');
    return base64Image;
  } catch (error) {
    console.error(`Error encoding image to base64 at ${filePath}:`, error);
    throw new Error('Failed to encode image to base64');
  }
}
