import { Type } from "./type.model";
import { User } from "./user.model";

export interface Spend {
    id: number;
    dateCreation: string;
    derniereModification: string;
    dernierModificateur: string;
    type: Type;
    amount: number;
    description: string;
    date: string;
    paymentMethod: string;
    recurrent: string;
    userPaye: User;
    image: string;
}