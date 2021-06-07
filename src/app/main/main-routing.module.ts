import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';

const routes: Routes = [
	{
		path: 'main',
		component: MainComponent,
		children: [
			{
				path: '',
				redirectTo: '/home',
				pathMatch: 'full'
			},
			{
				path: 'home',
				component: HomeComponent
			},
			{
				path: 'cases',
				loadChildren: () => import('./cases/cases.module').then(m => m.CasesModule)
			},
			{
				path: 'deaths',
				loadChildren: () => import('./deaths/deaths.module').then(m => m.DeathsModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'main/home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule {}
