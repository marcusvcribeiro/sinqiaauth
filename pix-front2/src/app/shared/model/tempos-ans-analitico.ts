import { deserializeAs, deserialize} from 'cerialize';
import { DateSerializer } from '../serialize/date-serializer';

export class TemposAnsAnalitico {

    @deserialize num_seq: number;
    @deserialize ano_ref: number;
    @deserialize mes_ref: number;
    @deserialize dsc_ref: string;
    @deserializeAs(DateSerializer, 'dat_inc')
    dat_inc: Date;

    @deserialize tem_max_blo: number;
    @deserialize per_99_epc_usu_liq: number;
    @deserialize per_50_epc_usu_liq: number;
    @deserialize per_99_epc_usu_liq_spi: number;
    @deserialize per_50_epc_usu_liq_spi: number;
    @deserialize per_epc_usu_exc: number;
    @deserialize per_99_tem_usu_csu: number;
    @deserialize per_tem_env_ptb: number;
    @deserialize per_tem_ntf_ptb: number;
    @deserialize num_csu_dict: number;
    @deserialize per_tem_epc_usu_reg: number;
    @deserialize per_tem_env_reg: number;
    @deserialize ind_dip: number;  

}
