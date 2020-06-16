import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Renderer2 } from '@angular/core';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TitleComponent } from './home-page/title/title.component';
import { DescriptionComponent } from './home-page/description/description.component';
import { FormsComponent } from './home-page/forms/forms.component';
import { LoginFormComponent } from './home-page/forms/login-form/login-form.component';
import { RegistrationFormComponent } from './home-page/forms/registration-form/registration-form.component';
import { FormsModule } from '@angular/forms';
import { ClickSoundService } from './services/shared/click-sound.service';
import { TypeSoundService } from './services/shared/type-sound.service';
import { PageChangerService } from './services/shared/page-changer.service';
import { MenuComponent } from './menu/menu.component';
import { RegistrationMessengerDirective } from './directives/registration-messenger.directive';
import { RegistrationService } from './services/registration.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivationMessengerDirective } from './directives/activation-messenger.directive';
import { LoginService } from './services/login.service';
import { CodeHandlerService } from './services/shared/code-handler.service';
import { LoginMessengerDirective } from './directives/login-messenger.directive';
import { HistoryComponent } from './menu/history/history.component';
import { SettingsComponent } from './menu/settings/settings.component';
import { PlayGameComponent } from './menu/play-game/play-game.component';
import { AccountComponent } from './menu/account/account.component';
import { HowToPlayComponent } from './menu/how-to-play/how-to-play.component';
import { HttpAddresserService } from './services/shared/http-addresser.service';
import { ServerCoordinationService } from './services/shared/server-coordination.service';
import { DefaultSettingsComponent } from './menu/settings/default-settings/default-settings.component';
import { SavedSettingsComponent } from './menu/settings/saved-settings/saved-settings.component';
import { CustomSettingsComponent } from './menu/settings/custom-settings/custom-settings.component';
import { KeyEventHandlerService } from './services/shared/key-event-handler.service';
import { SettingsMessengerDirective } from './directives/settings-messenger.directive';
import { ChartComponent } from './menu/account/chart/chart.component';
import { ChangeLoginComponent } from './menu/account/change-login/change-login.component';
import { ChangePasswordComponent } from './menu/account/change-password/change-password.component';
import { ChangeLoginMessengerDirective } from './directives/change-login-messenger.directive';
import { ActivateLoginMessengerDirective } from './directives/activate-login-messenger.directive';
import { ChangePasswordMessengerDirective } from './directives/change-password-messenger.directive';
import { ActivatePasswordDirective } from './directives/activate-password.directive';
import { FirstPageComponent } from './menu/how-to-play/basics/first-page/first-page.component';
import { SecondPageComponent } from './menu/how-to-play/basics/second-page/second-page.component';
import { PresenceNotifierService } from './services/shared/presence-notifier.service';
import { FriendlistComponent } from './menu/friendlist/friendlist.component';
import { FriendsService } from './services/menu/friends.service';
import { ProfileComponent } from './menu/profile/profile.component';
import { ProfileDescriptionComponent } from './menu/profile/profile-description/profile-description.component';
import { ProfileHistoryComponent } from './menu/profile/profile-history/profile-history.component';
import { FriendSuggestionsService } from './services/menu/friend-suggestions.service';
import { LogOutService } from './services/shared/log-out.service';
import { InviteFriendDirective } from './directives/invite-friend.directive';
import { EnlighterDirective } from './directives/enlighter.directive';
import { MainMessengerComponent } from './menu/main-messenger/main-messenger.component';
import { GameViewComponent } from './game-view/game-view.component';
import { AreasComponent } from './game-view/areas/areas.component';
import { AreaResizerDirective } from './directives/game/area-resizer.directive';
import { LittleAreaResizerDirective } from './directives/game/little-area-resizer.directive';
import { GameInfoService } from './services/game/board/game-info.service';
import { UnitContentDirective } from './directives/game/unit-content.directive';
import { UnitConverterService } from './services/game/unit-converter.service';
import { AreaZoomedComponent } from './game-view/area-zoomed/area-zoomed.component';
import { SquareMakerDirective } from './directives/game/square-maker.directive';
import { NorthPositionDirective } from './directives/game/position/north-position.directive';
import { SizeNotifierDirective } from './directives/game/size-notifier.directive';
import { FieldSizerService } from './services/game/rightWindow/field-sizer.service';
import { SouthPositionDirective } from './directives/game/position/south-position.directive';
import { WestPositionDirective } from './directives/game/position/west-position.directive';
import { EastPositionDirective } from './directives/game/position/east-position.directive';
import { ResourceSetService } from './services/game/topScreen/resource-set.service';
import { GameHeaderComponent } from './game-view/game-header/game-header.component';
import { ScoreCounterService } from './services/game/topScreen/score-counter.service';
import { GameChangesService } from './services/game/game-changes.service';
import { CenterPositionDirective } from './directives/game/position/center-position.directive';
import { ArrowPositionDirective } from './directives/game/position/arrow-position.directive';
import { ArrowCrossDirective } from './directives/game/position/arrow-cross.directive';
import { BuildingSelectionService } from './services/game/rightWindow/building-selection.service';
import { AreaDescriptionComponent } from './game-view/area-description/area-description.component';
import { GameConfigurationService } from './services/game/game-configuration.service';
import { BuildingImageMapperService } from './services/game/rightWindow/building-image-mapper.service';
import { BuildingSelectionComponent } from './game-view/building-selection/building-selection.component';
import { BuildingChoiceService } from './services/game/rightWindow/building-choice.service';
import { BuildMarkerDirective } from './directives/game/build-marker.directive';
import { PlaceSelectionService } from './services/game/rightWindow/place-selection.service';
import { SelectedFieldService } from './services/game/board/selected-field.service';
import { GameTimeService } from './services/game/topScreen/game-time.service';
import { NotificationsUnboxerService } from './services/game/notifications-unboxer.service';
import { BuildingGueueComponent } from './game-view/building-gueue/building-gueue.component';
import { PairSelectorDirective } from './directives/game/complex-selections/pair-selector.directive';
import { PopupsComponent } from './game-view/popups/popups.component';
import { BuildBuildingPopupComponent } from './game-view/popups/build-building-popup/build-building-popup.component';
import { QuickbuildComponent } from './game-view/quickbuild/quickbuild.component';
import { UpgradeSetService } from './services/game/lab/upgrade-set.service';
import { ArmyTrainingComponent } from './game-view/army-training/army-training.component';
import { UpgradePopupsComponent } from './game-view/popups/upgrade-popups/upgrade-popups.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpgradeFactoryDescriptionComponent } from './game-view/popups/upgrade-popups/upgrade-factory-description/upgrade-factory-description.component';
import { ButtonActivatorDirective } from './directives/game/complex-selections/button-activator.directive';
import { TrainingQueueComponent } from './game-view/training-queue/training-queue.component';
import { UpgradingBaseService } from './services/game/rightWindow/upgrading-base.service';
import { VeritcalLinkResizerDirective } from './directives/game/veritcal-link-resizer.directive';
import { HorizontalLinkResizerDirective } from './directives/game/horizontal-link-resizer.directive';
import { TransferArmyPopupComponent } from './game-view/popups/transfer-army-popup/transfer-army-popup.component';
import { AttackSpyPopupComponent } from './game-view/popups/attack-spy-popup/attack-spy-popup.component';
import { AttackFormComponent } from './game-view/popups/attack-spy-popup/attack-form/attack-form.component';
import { SpyFormComponent } from './game-view/popups/attack-spy-popup/spy-form/spy-form.component';
import { UnchartedBotsComponent } from './game-view/popups/attack-spy-popup/attack-form/uncharted-bots/uncharted-bots.component';
import { EnemyBotsComponent } from './game-view/popups/attack-spy-popup/attack-form/enemy-bots/enemy-bots.component';
import { AttackService } from './services/game/requests/attack.service';
import { ArmyActionsQueueComponent } from './game-view/army-actions-queue/army-actions-queue.component';
import { TrainArmyPopupComponent } from './game-view/popups/train-army-popup/train-army-popup.component';
import { ProductionDescriptionComponent } from './game-view/popups/train-army-popup/production-description/production-description.component';
import { BuildingConfigurationMapperService } from './services/game/rightWindow/building-configuration-mapper.service';
import { ConfigInfoService } from './services/game/rightWindow/config-info.service';
import { UpgradeWallsDescriptionComponent } from './game-view/popups/upgrade-popups/upgrade-walls-description/upgrade-walls-description.component';
import { UpgradeTowerDescriptionComponent } from './game-view/popups/upgrade-popups/upgrade-tower-description/upgrade-tower-description.component';
import { UpgradeObservatoryDescriptionComponent } from './game-view/popups/upgrade-popups/upgrade-observatory-description/upgrade-observatory-description.component';
import { UpgradeMechFactoryDescriptionComponent } from './game-view/popups/upgrade-popups/upgrade-mech-factory-description/upgrade-mech-factory-description.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TitleComponent,
    DescriptionComponent,
    FormsComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    MenuComponent,
    RegistrationMessengerDirective,
    ActivationMessengerDirective,
    LoginMessengerDirective,
    HistoryComponent,
    SettingsComponent,
    PlayGameComponent,
    AccountComponent,
    HowToPlayComponent,
    DefaultSettingsComponent,
    SavedSettingsComponent,
    CustomSettingsComponent,
    SettingsMessengerDirective,
    ChartComponent,
    ChangeLoginComponent,
    ChangePasswordComponent,
    ChangeLoginMessengerDirective,
    ActivateLoginMessengerDirective,
    ChangePasswordMessengerDirective,
    ActivatePasswordDirective,
    FirstPageComponent,
    SecondPageComponent,
    FriendlistComponent,
    ProfileComponent,
    ProfileDescriptionComponent,
    ProfileHistoryComponent,
    InviteFriendDirective,
    EnlighterDirective,
    MainMessengerComponent,
    GameViewComponent,
    AreasComponent,
    AreaResizerDirective,
    LittleAreaResizerDirective,
    UnitContentDirective,
    AreaZoomedComponent,
    SquareMakerDirective,
    NorthPositionDirective,
    SizeNotifierDirective,
    SouthPositionDirective,
    WestPositionDirective,
    EastPositionDirective,
    GameHeaderComponent,
    CenterPositionDirective,
    ArrowPositionDirective,
    ArrowCrossDirective,
    AreaDescriptionComponent,
    BuildingSelectionComponent,
    BuildMarkerDirective,
    BuildingGueueComponent,
    PairSelectorDirective,
    PopupsComponent,
    BuildBuildingPopupComponent,
    QuickbuildComponent,
    ArmyTrainingComponent,
    UpgradePopupsComponent,
    UpgradeFactoryDescriptionComponent,
    ButtonActivatorDirective,
    TrainingQueueComponent,
    VeritcalLinkResizerDirective,
    HorizontalLinkResizerDirective,
    TransferArmyPopupComponent,
    AttackSpyPopupComponent,
    AttackFormComponent,
    SpyFormComponent,
    UnchartedBotsComponent,
    EnemyBotsComponent,
    ArmyActionsQueueComponent,
    TrainArmyPopupComponent,
    ProductionDescriptionComponent,
    UpgradeWallsDescriptionComponent,
    UpgradeTowerDescriptionComponent,
    UpgradeObservatoryDescriptionComponent,
    UpgradeMechFactoryDescriptionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    ClickSoundService,
    TypeSoundService,
    PageChangerService,
    RegistrationService,
    LoginService,
    CodeHandlerService,
    HttpAddresserService,
    ServerCoordinationService,
    KeyEventHandlerService,
    PresenceNotifierService,
    FriendsService,
    FriendSuggestionsService,
    LogOutService,
    GameInfoService,
    UnitConverterService,
    SelectedFieldService,
    FieldSizerService,
    ResourceSetService,
    ScoreCounterService,
    GameChangesService,
    GameTimeService,
    BuildingSelectionService,
    GameConfigurationService,
    BuildingImageMapperService,
    BuildingChoiceService,
    PlaceSelectionService,
    NotificationsUnboxerService,  
    UpgradeSetService,
    BuildingConfigurationMapperService,
    UpgradingBaseService,
    ConfigInfoService,
    AttackService],
  bootstrap: [AppComponent]
})
export class AppModule {
  pageState = 0;
 }
