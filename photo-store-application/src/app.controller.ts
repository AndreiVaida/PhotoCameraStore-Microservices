import { Body, Controller, Delete, Get, Inject, Param, Post, } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { PHOTO_CAMERA_SERVICE } from './configuration/Constraints';
import PhotoCamera from './model/PhotoCamera';

@Controller()
export class AppController {
    constructor(
        @Inject(PHOTO_CAMERA_SERVICE) private readonly client: ClientProxy,
    ) {
    }

    @Get()
    mainPage(): string {
        return (
            '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">\n' +
            "<div class='container display-1 text-center mt-5'>Photo camera store</div>"
        );
    }

    @Get('cameras')
    getPhotoCameras(): Observable<PhotoCamera[]> {
        console.log('> GET /cameras');
        this.client.emit('read-event', {type: 'sync'});

        const pattern = {cmd: 'get-all'};
        return this.client.send<PhotoCamera[]>(pattern, {});
    }

    @Post('cameras')
    addPhotoCamera(@Body() photoCamera: PhotoCamera): Observable<PhotoCamera> {
        console.log(`> POST /cameras {${photoCamera.name}}`);
        this.client.emit('write-event', {type: 'sync'});

        const pattern = {cmd: 'add'};
        return this.client.send<PhotoCamera>(pattern, photoCamera);
    }

    @Delete('cameras/:id')
    deletePhotoCamera(
        @Param('id') photoCameraId: number,
    ): Observable<PhotoCamera> {
        console.log(`> DELETE /cameras/${photoCameraId}`);
        this.client.emit('write-event', {type: 'sync'});

        const pattern = {cmd: 'delete'};
        return this.client.send<PhotoCamera>(pattern, photoCameraId);
    }
}
