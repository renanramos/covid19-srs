import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
	declarations: [FormComponent],
	imports: [CommonModule, BsDatepickerModule.forRoot(), ReactiveFormsModule],
	exports: [FormComponent]
})
export class FormModuleModule {}
