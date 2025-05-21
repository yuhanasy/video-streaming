import { Injectable } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

@Injectable()
export class VideoService {
  getVideo(range: string) {
    const filePath = join(process.cwd(), 'contents', 'sample.mp4');
    const file = statSync(filePath);
    const fileSize = file.size;

    const parts = range.replace('bytes=', '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;

    const stream = createReadStream(filePath, { start, end });

    return {
      stream,
      contentType: 'video/mp4',
      fileSize,
      chunkSize,
      start,
      end,
    };
  }
}
