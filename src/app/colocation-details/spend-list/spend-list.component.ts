import { DatePipe, KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Colocation } from 'src/app/models/colocation.model';
import { Spend } from 'src/app/models/spend.model';

@Component({
  selector: 'app-spend-list',
  templateUrl: './spend-list.component.html',
  styleUrls: ['./spend-list.component.scss']
})
export class SpendListComponent implements OnInit {

  @Input() colocation : Colocation;
  @Input() mapDateSpend : Map<string, Spend[]>;

  constructor(private router: Router, private datePipe: DatePipe) {
    
  }

  ngOnInit(): void {
    
  }

  newSpend(){
    this.router.navigate(['/spend/',this.colocation.id]);
  }

  keyDescOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  }

  getLocalDate(date: string): string{
    let yestrday = new Date();
    yestrday.setDate(yestrday.getDate() - 1);
    return this.dateFormatStandard(new Date(date)) == this.dateFormatStandard(new Date()) ? "Aujourd'hui" : this.dateFormatStandard(new Date(date)) == this.dateFormatStandard(yestrday) ? 'Hier' : new Date(date).toLocaleDateString();
  }

  dateFormatStandard(date: Date): string{
    return this.datePipe.transform(date, 'yyyy-MM-dd');
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

  updateSpend(id: number){

  }

}
