import { Pipe } from '@angular/core';

@Pipe({
  name: 'runtime'
})
export class RuntimePipe {
    constructor() {}
    transform(value: number): string {
      const hours = Math.floor(value/60)
      const minutes = value%60

      if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`
      if (hours > 0) return `${hours}h`
      return `${minutes}m`
    }
}
