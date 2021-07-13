import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateForm } from 'src/app/model/date-form';
import { DatePickerConfig } from 'src/app/model/date-picker-config.model';
import { DataUtil } from '../util/data-util';

@Component({
	selector: 'srs-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
	
  @Output() dateValuesChanged: EventEmitter<any> = new EventEmitter();
  
  form!: FormGroup;
  datePickerConfig: DatePickerConfig = new DatePickerConfig();
  constructor(private dataUtil: DataUtil, private formBuilder: FormBuilder) {}

	ngOnInit() {
    this.createForm();
  }

	createForm() {
		this.form = this.formBuilder.group({
			initial: [null, [Validators.required]],
			final: [null, [Validators.required]]
		});

		this.dataUtil.setDateFormValues(this.form);
	}

  isValidDateValues() {
		if (this.initial?.value > this.final?.value)
		{
			this.form?.setErrors({
					invalid: true
			});
		}
	}
 
  async submitFilter()
	{
		this.isValidDateValues();
		if (this.form.valid) {
      const dateForm: DateForm = this.form.getRawValue();
      this.dateValuesChanged.emit(dateForm);
		}
	}
  
  get initial() {
		return this.form?.get('initial');
	}

	get final() {
	  return this.form?.get('final');
	}

}
