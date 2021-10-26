import { DatePipe, KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Colocation } from '../models/colocation.model';
import { Spend } from '../models/spend.model';
import { User } from '../models/user.model';
import { ColocationService } from '../services/colocation.service';

@Component({
  selector: 'app-colocation-details',
  templateUrl: './colocation-details.component.html',
  styleUrls: ['./colocation-details.component.scss']
})
export class ColocationDetailsComponent implements OnInit {

  idUser: number;
  colocation: Colocation;
  mapDateSpend = new Map<string, Spend[]>();
  mapTotalSpendByUser = new Map<number, number>();
  totalDepenseAllUsers = 0;
  avgDepenseAllUsers: number;
  clDate: string;
  
  constructor(private colocationService: ColocationService, private route: ActivatedRoute, private datePipe: DatePipe, private router: Router) { 
    
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
          this.spendCalcul();
        }
      }
    );
  }

  private spendCalcul(){

    this.mapDateSpend.clear();
    this.mapTotalSpendByUser.clear();
    this.avgDepenseAllUsers = 0;
    this.totalDepenseAllUsers = 0;

    if(!!this.colocation.spends && this.colocation.spends.length > 0) {

      this.colocation.spends.map(
        (spend: Spend) => {

          if(spend.date.split('-')[0] === this.clDate.split('-')[0] && spend.date.split('-')[1] === this.clDate.split('-')[1]){

            /* calcule spend by date */
            let spends = !!this.mapDateSpend.get(spend.date) ? this.mapDateSpend.get(spend.date) : new Array<Spend>();
            spends.push(spend);
    
            this.mapDateSpend.set(spend.date, spends);
    
            /* calcule total by User */
    
            let totalAmount = !!this.mapTotalSpendByUser.get(spend.userPaye?.id) ? this.mapTotalSpendByUser.get(spend.userPaye?.id) : 0;
            this.mapTotalSpendByUser.set(spend.userPaye?.id, (totalAmount + spend.amount));
            this.totalDepenseAllUsers += spend.amount;
  
          }
        }
        
      );
    }
    else if(!this.colocation.spends || this.colocation.spends.length === 0){

      if(!!this.colocation.owner) {
        this.mapTotalSpendByUser.set(this.colocation.owner.id, 0);
      }

      if(!!this.colocation.users && this.colocation.users.length > 0) {
        this.colocation.users.map(
          (user: User) => {
            this.mapTotalSpendByUser.set(user.id, 0);
          }
        ) 
      }

    }
  
    if(!this.colocation.users || this.colocation.users.length === 0) {
      this.avgDepenseAllUsers = this.totalDepenseAllUsers;
    }
    else{
      this.avgDepenseAllUsers = this.totalDepenseAllUsers / (this.colocation.users.length + 1);
    }
    
  }

  onChangeEvent(event: any) {
    this.clDate = event.target.value;
    this.spendCalcul();
  }

  detailsSpend(id: number){

  }

  editSpend(id: number) {

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

  getTotalSpend(spends: Spend[]): number{
    let totalSpend = 0;
    spends.map(
      (spend: Spend) => {
        totalSpend += spend.amount;
      }
    );
    return totalSpend;
  }

  keyDescOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  updateSpend(id: number){

  }

  newSpend(){
    this.router.navigate(['/spend/',this.colocation.id]);
  }

}
