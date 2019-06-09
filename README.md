# NgLibraries
The library allows to get rid of the excess code at validation of reactive forms. 
For example default validation method looks as follow:

Angular component template:
```angular2html
<form [formGroup]="profileForm">
  <label>
    First Name:
    <input type="text" formControlName="firstName">
    <div *ngIf="form.get('firstName').invalid && form.get('firstName').errors.required">Field is required</div>
    <div *ngIf="form.get('firstName').invalid && form.get('firstName').errors.minLength">
      Min length of value 8. Actual: {{form.get('firstName').errors.minLength.actualLength}}
    </div>
  </label>
  <label>
    Last Name:
    <input type="text" formControlName="lastName">
    <div *ngIf="form.get('lastName').invalid && form.get('lastName').errors.required">Field is required</div>
    <div *ngIf="form.get('lastName').invalid && form.get('lastName').errors.minLength">
      Min length of value 8. Actual: {{form.get('lastName').errors.minLength.actualLength}}
    </div>
  </label>
</form>
```

Angular component code:
```typescript
@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(8)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
}
```
 Using this library you can simplify this code:
 ```angular2html
 <form [formGroup]="form" autocomplete="off">
  <div ngxValidatable>
    <input type="text" formControlName="firstName"/>
    <div *ngxValidator="'required'">Field is required</div>
    <div *ngxValidator="'minLength';let params = params">Min length of value 8. Actual: {{params.actualLength}}</div>
  </div>

  <div ngxValidatable>
    <input type="text" formControlName="lastName"/>
    <div *ngxValidator="'required'">Field is required</div>
    <div *ngxValidator="'minLength';let params = params">Min length of value 8. Actual: {{params.actualLength}}</div>  
  </div>
</form>
 ```
