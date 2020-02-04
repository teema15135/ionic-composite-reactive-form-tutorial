import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  myFG: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.myFG = this.formBuilder.group({
      foodName: [''],
      foodPrice: [''],
      description: [''],
      options: this.formBuilder.array([
        this.formBuilder.group({
          optionTitle: [''],
          choices: this.formBuilder.array([
            this.formBuilder.group({
              choiceTitle: [''],
              choicePrice: ['']
            })
          ])
        })
      ])
    });
  }

  getOptions() {
    return this.myFG.get('options') as FormArray;
  }

  getChoices(optionIndex: number) {
    return this.getOptions().at(optionIndex).get('choices') as FormArray;
  }

  addOption() {
    this.getOptions().push(
      this.formBuilder.group({
        optionTitle: [''],
        choices: this.formBuilder.array([
          this.formBuilder.group({
            choiceTitle: [''],
            choicePrice: ['']
          })
        ])
      })
    );
  }

  addChoice(optionIndex: number) {
    this.getChoices(optionIndex).push(
      this.formBuilder.group({
        choiceTitle: [''],
        choicePrice: ['']
      })
    );
  }

  logNgoNgo() {
    console.log(this.myFG.value);
  }

}
