import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// third party
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDropdownModule, BsDatepickerModule, TabsModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';

// modules
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ListsComponent } from './components/lists/lists.component';
import { MembersComponent } from './components/members/members.component';
import { MemberCardComponent } from './components/members/member-card/member-card.component';
import { MemberDetailComponent } from './components/members/member-detail/member-detail.component';
import { MemberEditComponent } from './components/members/member-edit/member-edit.component';
import { MemberListComponent } from './components/members/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { PhotoEditorComponent } from './components/members/photo-editor/photo-editor.component';

// interceptors
import { ErrorInterceptorProvider } from './services/error.interceptor';

// guards
import { AuthGuard } from './guards/auth.guard';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';

// pipes
import { TimeAgoPipe } from 'time-ago-pipe';

// resolvers
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver.';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { ListsResolver } from './resolvers/lists.resolver';

// services
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      RegisterComponent,
      ListsComponent,
      MembersComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      MemberListComponent,
      MessagesComponent,
      PhotoEditorComponent,
      TimeAgoPipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgxGalleryModule,
      FileUploadModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      PaginationModule.forRoot(),
      ButtonsModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AlertifyService,
      AuthService,
      UserService,
      ErrorInterceptorProvider,
      AuthGuard,
      PreventUnsavedChangesGuard,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      ListsResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
