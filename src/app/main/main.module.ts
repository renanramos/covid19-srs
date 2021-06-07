import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [MainComponent, HomeComponent],
	imports: [CommonModule, ReactiveFormsModule, MainRoutingModule],
	exports: [MainComponent]
})
export class MainModule {}
