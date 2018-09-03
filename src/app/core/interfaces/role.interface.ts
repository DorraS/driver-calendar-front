import { IUser } from '@core/interfaces/user.interface';

export interface IDriverModelCommon {
    id?: number;
    createDate?: Date;
    modificationDate?: Date;
    createBy?: IUser;
    modifiedBy?: IUser;
}

export interface IRole  extends IDriverModelCommon {
   lable: string;
   code:  string;
   rights?: IRight[];
}

export interface IRight  extends IDriverModelCommon {
    code:  string;
    label: string;
}
