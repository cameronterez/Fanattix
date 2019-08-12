import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { NgxStripeModule } from 'ngx-stripe';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';

// the scanner!
import { ZXingScannerModule } from '@zxing/ngx-scanner';


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
import { EventListComponent } from './event-list/event-list.component';
import { EventAlertsComponent } from './event-creator/event-alerts/event-alerts.component';
import { AnalyticsComponent } from './event-creator/analytics/analytics.component';
import { StripeSaveCardComponent } from './stripe/stripe-save-card/stripe-save-card.component';
import { EventDeleteModalComponent } from './event-creator/modals/event-delete-modal/event-delete-modal.component';
import { ErrorDisplayComponent } from './shared/error-display/error-display.component';
import { EventsPopularComponent } from './events-popular/events-popular.component';
import { EventsInCategoryComponent } from './events-in-category/events-in-category.component';
import { HorizontalScrollComponent } from './shared/horizontal-scroll/horizontal-scroll.component';
import { CategoryScrollComponent } from './shared/category-scroll/category-scroll.component';
import { TypeScrollComponent } from './shared/type-scroll/type-scroll.component';
import { SplashPageComponent } from './splash-page/splash-page.component';
import { CategoryEventsComponent } from './shared/category-events/category-events.component';
import { UnderwayEventComponent } from './event-util/underway-event/underway-event.component';
import { TicketScannerComponent } from './event-util/ticket-scanner/ticket-scanner.component';
import { EventUtilitiesComponent } from './event-util/event-utilities/event-utilities.component';
import { SavedPaymentMethodsComponent } from './user/saved-payment-methods/saved-payment-methods.component';
import { CreateEventComponent } from './event-creator/create-event/create-event.component';
import { EditTicketOptionComponent } from './event-creator/edit-ticket-option/edit-ticket-option.component';
import { CamSplashComponent } from './cam-splash/cam-splash.component';
import { UserMessagingComponent } from './shared/user-messaging/user-messaging.component';
import { PostCreateComponent } from './event-creator/post-create/post-create.component';
import { SaveButtonComponent } from './event-creator/save-button/save-button.component';
import { NearEventsComponent } from './near-events/near-events.component';
import { EventHorizontalScrollComponent } from './event-horizontal-scroll/event-horizontal-scroll.component';
import { StripeSignUpComponent } from './stripe/stripe-sign-up/stripe-sign-up.component';
import { StripeGuardService } from './stripe-guard.service';
import { FaqComponent } from './faq/faq.component';
import { OverviewComponent } from './overview/overview.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { EventListNestedComponent } from './event-list-nested/event-list-nested.component';
import { FxEventCreateComponent } from './event-creator/fx-event-create/fx-event-create.component';
import { EventTicketsComponent } from './event-creator/event-tickets/event-tickets.component';
import { ConfirmDeleteTicketOptionComponent } from './event-creator/confirm-delete-ticket-option/confirm-delete-ticket-option.component';



const routes: Routes = [
  {path: 'splash', component: CamSplashComponent},
  {path: '', component: HomeComponent},
  {path: 'event/:id', component: EventDetailComponent},
  {path: 'purchase-ticket/:id', component: TicketPurchaseComponent},
  {path: 'my-tickets', component: PurchasedTicketsComponent},
  {path: 'purchase-complete', component: PostPurchaseComponent},
  {path: 'account', component: AccountComponent},
  {path: 'account-settings', component: AccountSettingsComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'search', component: SearchComponent},
  {path: 'category-events/:id', component: CategoryEventsComponent},
  {path: 'activate-stripe-account', component: StripeSignUpComponent},
  {path: 'creator', component: CreatorMenuComponent, canActivate: [StripeGuardService],
    children: [
      {path: '', component: EventCreatorHomeComponent},
      {path: 'single', component: FxEventCreateComponent},
      {path: 'my-events', component: MyEventsComponent},
      {path: 'edit-event/:id', component: EditEventComponent},
      {path: 'event-tickets/:id', component: EventTicketsComponent},
      {path: 'double', component: FxEventCreateComponent},
      {path: 'post-create/:id', component: PostCreateComponent},
      {path: 'actions/:id', component: AnalyticsComponent},
      {path: 'event-created', component: PostCreateComponent},
      {path: 'my-tickets', component: PurchasedTicketsComponent},
    ]
  },
  {path: 'stripe-connect', component: PostConnectComponent},
  {path: 'event-utilities', component: EventUtilitiesComponent},
  {path: 'ticket-scanner', component: TicketScannerComponent},
  {path: 'overview', component: OverviewComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'contact', component: ContactComponent}
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
    EventListComponent,
    EventAlertsComponent,
    AnalyticsComponent,
    StripeSaveCardComponent,
    EventDeleteModalComponent,
    ErrorDisplayComponent,
    EventsPopularComponent,
    EventsInCategoryComponent,
    HorizontalScrollComponent,
    CategoryScrollComponent,
    TypeScrollComponent,
    SplashPageComponent,
    CategoryEventsComponent,
    UnderwayEventComponent,
    TicketScannerComponent,
    EventUtilitiesComponent,
    SavedPaymentMethodsComponent,
    CreateEventComponent,
    EditTicketOptionComponent,
    CamSplashComponent,
    UserMessagingComponent,
    PostCreateComponent,
    SaveButtonComponent,
    NearEventsComponent,
    EventHorizontalScrollComponent,
    StripeSignUpComponent,
    FaqComponent,
    OverviewComponent,
    ContactComponent,
    PricingComponent,
    EventListNestedComponent,
    FxEventCreateComponent,
    EventTicketsComponent,
    ConfirmDeleteTicketOptionComponent,
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
    NgxStripeModule.forRoot('pk_test_71wHm2ZqOU05JBFNmGVNXXBd'),
    NgbModule.forRoot(),
    ZXingScannerModule,
  ],
  entryComponents: [
    EventDeleteModalComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
