import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MapboxpageComponent } from './pages/mapboxpage/mapboxpage.component';
import { ZoomrangepageComponent } from './pages/zoomrangepage/zoomrangepage.component';
import { MarkerspageComponent } from './pages/markerspage/markerspage.component';
import { HousepageComponent } from './pages/housepage/housepage.component';


export const MAPBOX_ROUTES: Routes = [
  { path: '', component: LayoutComponent ,
    children: [
      { path: '', component: MapboxpageComponent },
      { path: 'zoomrange', component: ZoomrangepageComponent },
      { path: 'markers', component: MarkerspageComponent },
      { path: 'house', component: HousepageComponent },
      { path: '**', redirectTo: '' }
    ]},
];
