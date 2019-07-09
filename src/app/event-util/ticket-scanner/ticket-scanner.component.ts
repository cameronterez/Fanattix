import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';
import { ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { EventService } from '../../event.service';

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
  resultString: string
  responseData: any
  errors = []

  displaySuccess = false
  displayFailure = false

  constructor(private messageService: MessageService, private eventService: EventService) { }

  ngOnInit() {
    //this.playSuccessSound()
    console.log('hello')
    this.prepareCamera()
    this.errors = []  
    this.responseData = []  
  }

  prepareCamera(){
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;
      
      if(devices){
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
      }else{
        this.selectedDevice = null
        this.errors.push('No Cameras Found')
      }
      
    });
    
    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
        console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
        this.errors.push('An error occured while trying to find your camera, Ensure your camera is Connected')
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });
  }

  camerasFoundHandler($event){
    console.log($event)
    this.messageService.displayMessage('cameras found')
  }

  scanSuccessHandler(result: string){
    //this.selectedDevice = $event[0]
    this.resultString = result
    this.messageService.displayMessage('$event')
    this.messageService.displayMessage('Success!')
    //this.playSuccessSound()
    this.checkTicket(result)
  }  

  checkTicket(ticketId){
    this.eventService.checkTicket(ticketId).subscribe(
      res => {
        this.responseData = res
        console.log(res)
        
      },
      err => console.log(err)
    )
  }

  scanErrorHandler($event){
    this.messageService.displayMessage('$event')
    this.messageService.displayMessage('Error!')
    this.errors.push('Improperly Scanned or an Error Occurred During Scanning')
  }

  ticketAccepted(){
      this.displaySuccess = true
      this.displayFailure = false
  }

  ticketRejected(){
    this.displayFailure = true
    this.displayFailure = false
  }

  /*
  playSuccessSound(){
    let sound = new Audio()
    sound.src = '../assets/audio/beep-07.mp3'
    sound.load()
    sound.play()
  }*/

  /*scanFailureHandler($event){
    this.messageService.displayMessage('$event')
    this.messageService.displayMessage('Failure!')
  }*/

}
