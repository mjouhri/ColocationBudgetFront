import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserColocationsService } from '../services/user-colocations.service';

@Component({
  selector: 'app-colocation-form',
  templateUrl: './colocation-form.component.html',
  styleUrls: ['./colocation-form.component.scss']
})
export class ColocationFormComponent implements OnInit {

  colocationForm: FormGroup;

  idUser: number;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private location: Location, private userColocationService: UserColocationsService) { 
    this.idUser = this.route.snapshot.params['id'];

    if(!this.idUser && this.idUser === null){
      this.previous_page();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.colocationForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submit() {

    let name = this.colocationForm.get('name').value;

    this.userColocationService.createNewColocation(name ,this.idUser).subscribe(
      () => {
        this.previous_page();
      }
    );

  }

  previous_page(){
    this.location.back();
  }

}
