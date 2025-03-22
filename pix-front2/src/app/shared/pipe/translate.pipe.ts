import { Pipe } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 't' })
export class TranslatAliasPipe extends TranslatePipe {
}
