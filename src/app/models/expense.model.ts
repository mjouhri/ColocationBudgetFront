import { Type } from "./type.model";
import { User } from "./user.model";

export interface Expense {
    id: number;
    dateCreation: string;
    derniereModification: string;
    dernierModificateur: string;
    type: Type;
    value: number;
    description: string;
    date: string;
    payementMethod: string;
    recurrent: string;
    userPaye: User;
    image: string;
}