import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../interfaces/employee.interface';
@Pipe({
  name: 'image'
})
export class ImagePipe {

  transform(value: Employee): string {
    if (!value.img || value.img === '') {
      return `assets/img/no-image.png`;
    }
    return `${value.img}`;

  }

}
