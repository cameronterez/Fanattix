import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { NgxStripeModule } from 'ngx-stripe';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { EventCreatorHomeComponent } from './event-creator/event-creator-home/event-creator-home.component';
import { EventCreatorSingleComponent } from './event-creator/event-creator-single/event-creator-single.component';
import { FooterComponent } from './footer/footer.component';
import { CreatorMenuComponent } from './event-creator/creator-menu/creator-menu.component';
import { CreatorComponent } from './event-creator/creator/creator.component';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { LoginComponent } from './user/login/login.component';
import { TicketOptionsComponent } from './event-creator/ticket-options/ticket-options.component';
import { BasicAlertComponent } from './shared/basic-alert/basic-alert.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EditEventComponent } from './event-creator/edit-event/edit-event.component';
import { MyEventsComponent } from './event-creator/my-events/my-events.component';
import { PurchasedTicketsComponent } from './tickets/purchased-tickets/purchased-tickets.component';
import { OccurrenceCreateComponent } from './event-creator/occurrence-create/occurrence-create.component';
import { EditOccurrenceComponent } from './event-creator/edit-occurrence/edit-occurrence.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchComponent } from './search/search.component';
import { TicketPurchaseComponent } from './tickets/ticket-purchase/ticket-purchase.component';
import { PostPurchaseComponent } from './tickets/post-purchase/post-purchase.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AccountComponent } from './account/account.component';
import { OccurrenceEditComponent } from './event-creator/occurrence-edit/occurrence-edit.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { SearchTitleComponent } from './search-title/search-title.component';
import { StripeOAuthComponent } from './stripe/stripe-oauth/stripe-oauth.component';
import { AccountSettingsComponent } from './user/account-settings/account-settings.component';
import { PostConnectComponent } from './stripe/post-connect/post-connect.component';
import { StripeTicketPurchaseComponent } from './stripe/stripe-ticket-purchase/stripe-ticket-purchase.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'event/:id', component: EventDetailComponent},
  {path: 'purchase-ticket/:id', component: TicketPurchaseComponent},
  {path: 'my-tickets', component: PurchasedTicketsComponent},
  {path: 'purchase-complete', component: PostPurchaseComponent},
  {path: 'account', component: AccountComponent},
  {path: 'account-settings', component: AccountSettingsComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'search', component: SearchComponent},
  {path: 'creator', component: CreatorComponent,
    children: [
      {path: '', component: EventCreatorHomeComponent},
      {path: 'single', component: EventCreatorSingleComponent},
      {path: 'my-events', component: MyEventsComponent},
      {path: 'edit-event/:id', component: EditEventComponent},
      {path: 'double', component: EventCreatorSingleComponent},
    ]
  },
  {path: 'stripe-connect', component: PostConnectComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    EventCreatorHomeComponent,
    EventCreatorSingleComponent,
    FooterComponent,
    CreatorMenuComponent,
    CreatorComponent,
    UserMenuComponent,
    LoginComponent,
    TicketOptionsComponent,
    BasicAlertComponent,
    EventDetailComponent,
    EditEventComponent,
    MyEventsComponent,
    PurchasedTicketsComponent,
    OccurrenceCreateComponent,
    EditOccurrenceComponent,
    SearchBarComponent,
    SearchComponent,
    TicketPurchaseComponent,
    PostPurchaseComponent,
    SignUpComponent,
    AccountComponent,
    OccurrenceEditComponent,
    SearchFilterComponent,
    SearchTitleComponent,
    StripeOAuthComponent,
    AccountSettingsComponent,
    PostConnectComponent,
    StripeTicketPurchaseComponent,
  ],
  // Google Places API Key 

  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbAlertModule,
    GooglePlaceModule,
    NgxStripeModule.forRoot('pk_test_71wHm2ZqOU05JBFNmGVNXXBd')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
