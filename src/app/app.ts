import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DeviceDetectorService} from 'ngx-device-detector';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  public constructor(
    protected readonly deviceService: DeviceDetectorService
  ) {
  }

}
