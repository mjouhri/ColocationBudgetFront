import { DatePipe, KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Colocation } from '../models/colocation.model';
import { Expense } from '../models/expense.model';
import { User } from '../models/user.model';
import { ColocationService } from '../services/colocation.service';
import { UserColocationsService } from '../services/user-colocations.service';

@Component({
  selector: 'app-colocation-details',
  templateUrl: './colocation-details.component.html',
  styleUrls: ['./colocation-details.component.scss']
})
export class ColocationDetailsComponent implements OnInit {

  idUser: number;
  colocation: Colocation;
  mapDateExpense = new Map<string, Expense[]>();
  mapTotalExpenseByUser = new Map<number, number>();
  totalDepenseAllUsers = 0;
  avgDepenseAllUsers: number;
  clDate: string;
  
  constructor(private userColocationsService: UserColocationsService, private colocationService: ColocationService, private route: ActivatedRoute, private datePipe: DatePipe) { 
    
    this.idUser = +this.route.snapshot.params['id'];
    
    const date = new Date();
    this.clDate = this.datePipe.transform(date,"yyyy-MM");

    this.initColocation();
    
  }

  ngOnInit(): void {
    
  }

  private initColocation(){
    this.colocationService.getColocationsById(this.route.snapshot.params['idColocation']).subscribe(
      (colocation: Colocation) => {
        if(!!colocation){
          this.colocation = colocation;
          console.log(this.colocation);
          this.expenseCalcul();
        }
      }
    );
  }

  private expenseCalcul(){

    this.mapDateExpense.clear();
    this.mapTotalExpenseByUser.clear();
    this.avgDepenseAllUsers = 0;
    this.totalDepenseAllUsers = 0;

    if(!!this.colocation.expenses && this.colocation.expenses.length > 0) {

      this.colocation.expenses.map(
        (expense: Expense) => {

          if(expense.date.split('-')[0] === this.clDate.split('-')[0] && expense.date.split('-')[1] === this.clDate.split('-')[1]){

            /* calcule expense by date */
            let expenses = !!this.mapDateExpense.get(expense.date) ? this.mapDateExpense.get(expense.date) : new Array<Expense>();
            expenses.push(expense);
    
            this.mapDateExpense.set(expense.date, expenses);
    
            /* calcule total by User */
    
            let totalAmount = !!this.mapTotalExpenseByUser.get(expense.userPaye.id) ? this.mapTotalExpenseByUser.get(expense.userPaye.id) : 0;
            this.mapTotalExpenseByUser.set(expense.userPaye.id, (totalAmount + expense.value));
            this.totalDepenseAllUsers += expense.value;
  
          }
        }
        
      );
    }
    else if(!this.colocation.expenses || this.colocation.expenses.length === 0){

      if(!!this.colocation.owner) {
        this.mapTotalExpenseByUser.set(this.colocation.owner.id, 0);
      }

      if(!!this.colocation.users && this.colocation.users.length > 0) {
        this.colocation.users.map(
          (user: User) => {
            this.mapTotalExpenseByUser.set(user.id, 0);
          }
        ) 
      }

    }
  
    if(!this.colocation.users || this.colocation.users.length === 0) {
      this.avgDepenseAllUsers = this.totalDepenseAllUsers;
    }
    else{
      this.avgDepenseAllUsers = this.totalDepenseAllUsers / this.colocation.users.length;
    }
    
  }

  onChangeEvent(event: any) {
    this.clDate = event.target.value;
    this.expenseCalcul();
  }

  detailsExpense(id: number){

  }

  editExpense(id: number) {

  }

  getUniqueModalId(id: number): string {
    return "id";
  }

  dateFormatStandard(date: Date): string{
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  getLocalDate(date: string): string{
    let yestrday = new Date();
    yestrday.setDate(yestrday.getDate() - 1);
    return this.dateFormatStandard(new Date(date)) == this.dateFormatStandard(new Date()) ? "Aujourd'hui" : this.dateFormatStandard(new Date(date)) == this.dateFormatStandard(yestrday) ? 'Hier' : new Date(date).toLocaleDateString();
  }

  getTotalExpense(expenses: Expense[]): number{
    let totalExpense = 0;
    expenses.map(
      (expense: Expense) => {
        totalExpense += expense.value;
      }
    );
    return totalExpense;
  }

  keyDescOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  updateExpense(id: number){

  }

}
