import { Spend } from "./spend.model";
import { User } from "./user.model";

export interface Colocation {
    id: number;
    dateCreation: string;
    derniereModification: string;
    dernierModificateur: string;
    name: String;
    owner: User;
    users: User[];
    spends: Spend[];
}