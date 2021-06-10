import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserColocations } from '../models/user-colocations.model';
import { UserColocationsService } from '../services/user-colocations.service';

@Component({
  selector: 'app-colocation-list',
  templateUrl: './colocation-list.component.html',
  styleUrls: ['./colocation-list.component.scss']
})
export class ColocationListComponent implements OnInit {

  userColocations: UserColocations;

  constructor(private userColocationsService: UserColocationsService, private route: ActivatedRoute, private router: Router) {

    this.userColocationsService.getUserColocationsById(this.route.snapshot.params['id']).subscribe(
      (userColocations: UserColocations) => {
        if(!!userColocations && userColocations !=null){
          this.userColocations = userColocations;
        }
        else {
          this.router.navigate(['/']);
        }

      },
      (error) => {
        this.router.navigate(['/']);
      }
    );
   }

  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key])
  }

  ngOnInit(): void {
  }

  openColocation(idColocation: number) {
    this.router.navigate(['/colocation/', this.userColocations.user.id, idColocation]);
  }

  newColocation() {
    this.router.navigate(['/colocation/new/1']);
  }
  

}
