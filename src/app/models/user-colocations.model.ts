import { Colocation } from "./colocation.model";
import { User } from "./user.model";

export interface UserColocations {
    id: number;
    dateCreation: string;
    derniereModification: string;
    dernierModificateur: string;
    user: User;
    colocations: Colocation[];
 
}