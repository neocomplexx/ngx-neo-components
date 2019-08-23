import { Component, ChangeDetectorRef } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';

@Component({
    selector: 'neo-stepper',
    templateUrl: './stepper.component.html',
    providers: [{ provide: CdkStepper, useExisting: StepperComponent }]
})
export class StepperComponent extends CdkStepper {

    constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef) {
      super(dir, changeDetectorRef);
    }

    onClick(index: number): void {
      this.selectedIndex = index;
    }

}
