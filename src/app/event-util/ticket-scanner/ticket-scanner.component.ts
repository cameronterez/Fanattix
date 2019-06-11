import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';
import { ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-ticket-scanner',
  templateUrl: './ticket-scanner.component.html',
  styleUrls: ['./ticket-scanner.component.css']
})
export class TicketScannerComponent implements OnInit {
  @ViewChild('scanner')
    scanner: ZXingScannerComponent;

  selectedDevice: MediaDeviceInfo
  availableDevices: MediaDeviceInfo[]
  hasCameras: boolean
  hasPermission: boolean

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    console.log('hello')
    this.prepareCamera()
  }

  prepareCamera(){
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;
  
      console.log('Devices: ', devices);
      console.log('what the hell?')
      this.availableDevices = devices;
      this.selectedDevice = devices[0]
  
      // selects the devices's back camera by default
      // for (const device of devices) {
      //     if (/back|rear|environment/gi.test(device.label)) {
      //         this.scanner.changeDevice(device);
      //         this.selectedDevice = device;
      //         break;
      //     }
      // }
    });
    
    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
        console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }

  camerasFoundHandler($event){
    console.log($event)
    this.messageService.displayMessage('cameras found')
  }

  scanSuccessHandler($event){
    this.selectedDevice = $event[0]
    this.messageService.displayMessage('$event')
    this.messageService.displayMessage('Success!')
  }

  scanErrorHandler($event){
    this.messageService.displayMessage('$event')
    this.messageService.displayMessage('Error!')
  }

  scanFailureHandler($event){
    this.messageService.displayMessage('$event')
    this.messageService.displayMessage('Failure!')
  }

}
