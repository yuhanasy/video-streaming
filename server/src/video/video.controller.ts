import { Controller, Get, Headers, HttpStatus, Res } from '@nestjs/common';
import { VideoService } from './video.service';
import { Response } from 'express';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getVideo(@Headers('Range') range: string, @Res() res: Response) {
    if (!range) {
      res.status(HttpStatus.BAD_REQUEST).send('Requires Range Headers');
    }

    const { stream, contentType, fileSize, chunkSize, start, end } =
      this.videoService.getVideo(range);

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': contentType,
    };

    res.writeHead(HttpStatus.PARTIAL_CONTENT, headers);
    stream.pipe(res);
  }
}
