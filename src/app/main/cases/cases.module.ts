import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CasesComponent } from './cases.component';
import { CasesRoutingModule } from './cases-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphicsModule } from 'src/app/shared/graphics/graphics.module';
import { FormModuleModule } from 'src/app/shared/form/form-module.module';

@NgModule({
	declarations: [CasesComponent],
	imports: [
		CommonModule,
		CasesRoutingModule,
		ChartsModule,
		BsDatepickerModule.forRoot(),
		ReactiveFormsModule,
		FormModuleModule,
		GraphicsModule
	],
	exports: [CasesComponent]
})
export class CasesModule {}
