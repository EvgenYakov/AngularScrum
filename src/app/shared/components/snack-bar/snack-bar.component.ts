import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-snack-bar',
  template: `
    <span [style]="{color:data.color}">
        {{ data.message }} 📁
    </span>
    
  `,
  styles: [`
    //.snack-bar {
    //  color: hotpink;
    //}
  `]
})
export class SnackBarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
