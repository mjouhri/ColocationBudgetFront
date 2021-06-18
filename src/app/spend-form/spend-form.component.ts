import { Location } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Spend } from '../models/spend.model';
import { Type } from '../models/type.model';
import { User } from '../models/user.model';
import { ColocationService } from '../services/colocation.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-spend-form',
  templateUrl: './spend-form.component.html',
  styleUrls: ['./spend-form.component.scss']
})
export class SpendFormComponent implements OnInit {
  spend: Spend;
  spendForm: FormGroup;
  idColocation: number;
  listTypeSpend: Type[];
  listUser: User[];


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private location: Location, private colocationService: ColocationService, private userService: UserService) { }

  ngOnInit(): void {
    this.idColocation = this.route.snapshot.params['idColocation'];
    this.initForm();
  }

  initForm() {
    this.spendForm = this.formBuilder.group({
      type: ['', Validators.required],
      amount: ['', Validators.required],
      description: '',
      date: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      userPaye: ['', Validators.required],
    });

    this.colocationService.getListSpendType().subscribe(
      (listTypeSpend: Type[]) => {
        this.listTypeSpend = listTypeSpend;
      }
    );

    this.colocationService.getUsersOfColocation(this.idColocation).subscribe(
      (users: User[]) => { 
        this.listUser = users;
      }
    );

  }

  submit() {

    this.spend = {
      type: this.listTypeSpend[this.spendForm.get('type').value as number],
      amount: this.spendForm.get('amount').value,
      description: this.spendForm.get('description').value,
      date: this.spendForm.get('date').value,
      paymentMethod: this.spendForm.get('paymentMethod').value,
      userPaye: this.getUserByID(+this.spendForm.get('userPaye').value)
    } as Spend;

    this.colocationService.addSpendToColocation(this.idColocation, this.spend).subscribe(
      () => {
        this.location.back();
      }
    );

  }

  previous_page(){
    this.location.back();
  }

  getUserByID(id: number): User{
    let useer: User = null;
    this.listUser.map(
      (user: User)=> {
        if(user.id === id) {
          useer = user;
        }
      }
    );
    return useer; 
  }

}
