import {Component} from '@angular/core';
import {AsyncPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {GlobalGameService} from './services/global-game.service';
import {BounceOnClickDirective} from '../../common/directives/bounce-click.directive';
import {RotateOnHoverDirective} from '../../common/directives/rotate-on-hover.directive';
import {SettingsComponent} from '../../settings/pages/settings/settings.component';
import {letterToHex} from '../../common/utils/letterToHex';
import {RankingComponent} from './pages/ranking/ranking.component';
import {AuthService} from '../../auth/services/auth.service';
import {GlobalComponent} from './components/global/global.component';

@Component({
  selector: 'app-global-game',
  styleUrl: 'global-game.component.scss',
  imports: [
    AsyncPipe,
    RotateOnHoverDirective,
    SettingsComponent,
    BounceOnClickDirective,
    RankingComponent,
    NgOptimizedImage,
    NgClass,
    GlobalComponent
  ],
  template: `
    @let initial = (gameService.globalGame$ | async)?.initial;
    @let user = (authService.user$ | async);
    @if (initial && user) {<div class="h-100 overflow-hidden">
      <div
          class="position-fixed w-25 overflow-hidden z-2 start-0 top-0 m-3 cursor-default d-flex gap-2 align-items-center">
          @for (life of Array.from(Array.from({length: user.attemptsLeft}, Number)); track life) {
            <img class="life" ngSrc="assets/life.png" width="20" height="20" alt="life icon">
          } @empty {
            <div [ngClass]="{
            'life-wrapper-d-none': settingsEnabled || rankingsEnabled,
            'noAttemptsLeft': noAttemptsLeftNotified
            }" class="life-wrapper d-flex flex-column justify-content-center gap-1">
              <img class="no-more-life" ngSrc="assets/life.png" width="20" height="20" alt="life icon">
              <div class="d-flex flex-column life-text-group">
                <span class="fw-bold">Even the best players need a break.</span>
                <span class="text-secondary">Your lives are recharging! Try again tomorrow.</span>
              </div>
            </div>
          }
      </div>
      <div class="position-fixed z-2 end-0 top-0 m-3 cursor-pointer d-flex gap-2 align-items-center">
          <svg [style.color]="letterToHex(initial)" (click)="toggleRankings()" appBounceOnClick width="32" height="32"
               viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M18.4834 16.7674C17.8471 16.9195 17.1829 17 16.5 17C11.8056 17 8 13.1944 8 8.50001C8 8.01653 8.04036 7.54249 8.11791 7.08105C8.08172 7.11586 8.04432 7.14792 8.00494 7.17781C7.72433 7.39083 7.37485 7.46991 6.67589 7.62806L6.03954 7.77204C3.57986 8.32856 2.35002 8.60682 2.05742 9.54774C1.76482 10.4887 2.60325 11.4691 4.2801 13.4299L4.71392 13.9372C5.19042 14.4944 5.42868 14.773 5.53586 15.1177C5.64305 15.4624 5.60703 15.8341 5.53498 16.5776L5.4694 17.2544C5.21588 19.8706 5.08912 21.1787 5.85515 21.7602C6.62117 22.3417 7.77267 21.8116 10.0757 20.7512L10.6715 20.4768C11.3259 20.1755 11.6531 20.0249 12 20.0249C12.3469 20.0249 12.6741 20.1755 13.3285 20.4768L13.9243 20.7512C16.2273 21.8116 17.3788 22.3417 18.1449 21.7602C18.9109 21.1787 18.7841 19.8706 18.5306 17.2544L18.4834 16.7674Z"
              fill="currentColor"/>
            <path opacity="0.5"
                  d="M9.15302 5.40838L8.82532 5.99623C8.46538 6.64194 8.28541 6.96479 8.0048 7.17781C8.04418 7.14791 8.08158 7.11586 8.11777 7.08105C8.04022 7.54249 7.99986 8.01653 7.99986 8.50001C7.99986 13.1944 11.8054 17 16.4999 17C17.1828 17 17.8469 16.9195 18.4833 16.7674L18.4649 16.5776C18.3928 15.8341 18.3568 15.4624 18.464 15.1177C18.5712 14.773 18.8094 14.4944 19.2859 13.9372L19.7198 13.4299C21.3966 11.4691 22.235 10.4886 21.9424 9.54773C21.6498 8.60682 20.42 8.32856 17.9603 7.77203L17.324 7.62805C16.625 7.4699 16.2755 7.39083 15.9949 7.17781C15.7143 6.96479 15.5343 6.64194 15.1744 5.99624L14.8467 5.40837C13.58 3.13612 12.9467 2 11.9999 2C11.053 2 10.4197 3.13613 9.15302 5.40838Z"
                  fill="currentColor"/>
          </svg>
          <svg appBounceOnClick [style.color]="letterToHex(initial)" (click)="toggleSettings()" appRotateOnHover
               width="30" height="30"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608C20.4261 13.0639 20.1197 12.558 20.1197 11.9999C20.1197 11.4418 20.4261 10.9361 20.9022 10.6392C21.2263 10.4371 21.435 10.2757 21.5836 10.0835C21.9089 9.66273 22.0525 9.13087 21.9828 8.60497C21.9304 8.21055 21.6957 7.80703 21.2262 7C20.7567 6.19297 20.522 5.78945 20.2039 5.54727C19.7799 5.22436 19.244 5.08185 18.7141 5.15109C18.4722 5.18269 18.2269 5.28136 17.8887 5.4588C17.3915 5.71959 16.7969 5.73002 16.3099 5.45096C15.8229 5.17191 15.5347 4.65566 15.5136 4.09794C15.4993 3.71848 15.4628 3.45833 15.3694 3.23463C15.1649 2.74458 14.7726 2.35523 14.2788 2.15224ZM12.5 15C14.1695 15 15.5228 13.6569 15.5228 12C15.5228 10.3431 14.1695 9 12.5 9C10.8305 9 9.47716 10.3431 9.47716 12C9.47716 13.6569 10.8305 15 12.5 15Z"
                  fill="currentColor"/>
          </svg>
      </div>
      <app-settings [showSettings]="settingsEnabled"/>
      <app-global (noAttemptsLeft)="notifyNoAttemptsLeft()"/>
    </div>
    <app-ranking [showRankings]="rankingsEnabled"/>

    <div  [style.background-color]="letterToHex(initial, 100, 20)" style.width="{{currentProgress}}%" class="letter-expiration"></div>
    }
  `
})
export class GlobalGameComponent {
  protected settingsEnabled: boolean = false;
  protected rankingsEnabled: boolean = false;
  protected noAttemptsLeftNotified: boolean = false;
  protected currentProgress: number = 0;

  public constructor(
    protected readonly gameService: GlobalGameService,
    protected readonly authService: AuthService,
  ) {
    setInterval((): void => {
      this.currentProgress = this.cronProgressPercentRome();
    }, 10000)
    this.currentProgress = this.cronProgressPercentRome();
  }

  protected notifyNoAttemptsLeft(): void {
    this.noAttemptsLeftNotified = true;
     setTimeout((): void => {
        this.noAttemptsLeftNotified = false
      }, 5000);
  }

  protected cronProgressPercentRome(): number {
    const tz = 'Europe/Rome';
    const now = new Date();

    const nowTz = new Date(now.toLocaleString('en-US', { timeZone: tz }));

    const start = new Date(
      nowTz.getFullYear(),
      nowTz.getMonth(),
      nowTz.getDate(),
      0, 0, 0
    );

    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

    const offsetNow: number = nowTz.getTime() - start.getTime();
    const duration: number = end.getTime() - start.getTime();

    return (offsetNow / duration) * 100;
  }

  protected toggleSettings(): void {
    this.settingsEnabled = !this.settingsEnabled;
    if (this.rankingsEnabled) {
      this.rankingsEnabled = false;
    }
  }
  protected toggleRankings(): void {
    this.rankingsEnabled = !this.rankingsEnabled;
    if (this.settingsEnabled) {
      this.settingsEnabled = false;
    }
  }

  protected readonly letterToHex: (letter: string, saturation?: number, lightness?: number) => string = letterToHex;
  protected readonly Array: ArrayConstructor = Array;
  protected readonly String: StringConstructor = String;
  protected readonly Number: NumberConstructor = Number;
}
