import { SegService } from 'src/app/seg/services/seg.service';
import { Directive, HostListener, Input } from "@angular/core"


@Directive({
    selector: '[track]'
})
export class TrackDirective{

  constructor(public tracking:SegService){}

    @Input() track

    @HostListener('click')
    onClick(){
       return this.tracking.salvarHistoricoFuncaoUsuario({descricaoFuncionalidade: this.track}).subscribe();

    }


}

