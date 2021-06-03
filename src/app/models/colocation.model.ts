import { Expense } from "./expense.model";
import { User } from "./user.model";

export interface Colocation {
    id: number;
    dateCreation: string;
    derniereModification: string;
    dernierModificateur: string;
    name: String;
    owner: User;
    users: User[];
    expenses: Expense[];
}