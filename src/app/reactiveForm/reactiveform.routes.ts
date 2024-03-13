import { Routes } from '@angular/router';

import { LayoutComponent } from './pages/layout/layout.component';
import { BasicComponent } from './pages/basicPage/basic.component';
import { DynamicComponent } from './pages/dynamicPage/dynamic.component';
import { SwitchespageComponent } from './pages/switchespage/switchespage.component';
import { FormproductComponent } from './pages/formproduct/formproduct.component';

export const REACTIVEFORM_ROUTES: Routes = [
   { path: '', component: LayoutComponent,
    children: [
      { path: 'basic', component: BasicComponent},
      { path: 'dynamic', component: DynamicComponent},
      { path: 'switches', component: SwitchespageComponent},
      { path: 'productform', component: FormproductComponent},
      { path: '**', redirectTo: 'basic',  }
    ]
   },
];
