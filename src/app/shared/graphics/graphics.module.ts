import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicsComponent } from './graphics.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
	declarations: [GraphicsComponent],
	imports: [CommonModule, ChartsModule],
	exports: [GraphicsComponent]
})
export class GraphicsModule {}
