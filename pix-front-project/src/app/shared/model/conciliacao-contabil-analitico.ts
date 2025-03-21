import { deserializeAs, deserialize} from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export class ConciliacaoContabilAnalitico {

    @deserialize cod_cct: string;
    @deserialize cod_emp: number;
    @deserialize cod_nat: number;

    @deserializeAs(DateSerializer, 'dat_lan')
    dat_lan: Date;

    @deserializeAs(DateSerializer, 'dat_vct')
    dat_vct: Date;

    @deserialize dsc_cpt: string;
    @deserialize dsc_fma_pag: string;
    @deserialize dsc_obs: string;
    @deserialize nom_cli: string;
    @deserialize num_cta: number;
    @deserialize num_his: number;
    @deserialize vr_fin_tra: number;
        
  

}
