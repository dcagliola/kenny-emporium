/**
 * Kenny Photo API
 */
import { readFileSync } from 'fs';
import { join } from 'path';

export default function handler(req, res) {
  const filePath = join(process.cwd(), 'kenny-images.json');
  const images = JSON.parse(readFileSync(filePath, 'utf8'));

  res.status(200).json(images);
}
