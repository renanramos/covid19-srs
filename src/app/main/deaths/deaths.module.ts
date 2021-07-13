import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeathsComponent } from './deaths.component';
import { DeathsRoutingModule } from './deaths-routing.module';
import { ChartsModule } from 'ng2-charts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphicsModule } from 'src/app/shared/graphics/graphics.module';
import { FormModuleModule } from 'src/app/shared/form/form-module.module';

@NgModule({
	declarations: [DeathsComponent],
	imports: [
		CommonModule,
		DeathsRoutingModule,
		ChartsModule,
		BsDatepickerModule.forRoot(),
		ReactiveFormsModule,
		FormModuleModule,
		GraphicsModule
	],
	exports: [DeathsComponent]
})
export class DeathsModule {}
