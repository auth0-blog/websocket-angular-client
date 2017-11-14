import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

import {HomeComponent} from './home/home.component';
import {CallbackComponent} from './callback/callback.component';
import {ChatComponent} from './chat/chat.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'callback', component: CallbackComponent},
      {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ])
  ],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
