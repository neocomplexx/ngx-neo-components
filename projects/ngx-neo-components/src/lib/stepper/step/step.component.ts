import { Component, Inject, forwardRef, SkipSelf, Optional } from '@angular/core';
import { CdkStep, STEPPER_GLOBAL_OPTIONS, StepperOptions } from '@angular/cdk/stepper';
import { StepperComponent } from '../stepper.component';

@Component({
    selector: 'neo-step',
    templateUrl: './step.component.html',
   providers: [{ provide: CdkStep, useExisting: StepComponent }]
})
export class StepComponent extends CdkStep {

      /** @breaking-change 8.0.0 remove the `?` after `stepperOptions` */
  constructor(@Inject(forwardRef(() => StepperComponent)) stepper: StepperComponent,
  @Optional() @Inject(STEPPER_GLOBAL_OPTIONS) stepperOptions?: StepperOptions) {
        super(stepper, stepperOptions);
    }

}

// export class StepComponent {
//     constructor() {}
// }
