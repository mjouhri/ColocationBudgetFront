import { Component, Input, OnInit } from '@angular/core';
import { Colocation } from 'src/app/models/colocation.model';

@Component({
  selector: 'app-colocation-total-spend-per-roommate',
  templateUrl: './colocation-total-spend-per-roommate.component.html',
  styleUrls: ['./colocation-total-spend-per-roommate.component.scss']
})
export class ColocationTotalSpendPerRoommateComponent implements OnInit {

  @Input() colocation : Colocation;
  @Input() mapTotalSpendByUser = new Map<number, number>();
  @Input() avgDepenseAllUsers: number;
  @Input() totalDepenseAllUsers: number;

  constructor() { }

  ngOnInit(): void {
  }

}
