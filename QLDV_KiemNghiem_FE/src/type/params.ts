interface BaseParam {
PageSize ?: number;
PageNumber?: number;
GetAll?: boolean
}

export interface IParamDangKyMau extends BaseParam{
    MaLoaiMau?: string;

}