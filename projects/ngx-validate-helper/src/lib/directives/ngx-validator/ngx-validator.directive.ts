import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  OnChanges,
  SimpleChanges,
  EmbeddedViewRef, Output,
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Directive({
  selector: '[ngxValidator]',
})
export class NgxValidatorDirective {
  @Input('ngxValidator') public validator: string;
  public visibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private view: EmbeddedViewRef<any> = null;
  private errorParameters: any = null;

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {
    this.visibleSubject
      .subscribe(visibleStatus => {
        if (visibleStatus) {
          this.destroyView();
          this.view = this.viewContainer.createEmbeddedView(this.template, {
            params: this.errorParameters
          });
        } else {
          this.destroyView();
        }
      });
  }

  /**
   * Sets error parameters for the current validator and gives a command to show an error
   * @param error - The parameters given by the validator of reactive forms. Example: Validator.minLength
   *                with parameter 8 will return: "{ requiredLength: 8, actualLength: 2 }"
   */
  public showError(error) {
    this.errorParameters = error;
    this.visibleSubject.next(true);
  }

  /**
   * Clear error parameters for the current validator and gives a command to hide an error
   */
  public hideErrors() {
    this.errorParameters = null;
    this.visibleSubject.next(false);
  }

  public destroyView() {
    if (this.view) {
      this.view.destroy();
    }
  }
}
