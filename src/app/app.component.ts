import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalService } from './global.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private service: GlobalService, private title: Title) {
    this.getInfo();    
  }

  getInfo(){
    if(localStorage.getItem('info') == undefined){
      this.service.generalSettings().subscribe((data: any) => {
        if(data.code === '200'){
            localStorage.setItem('info', JSON.stringify(data.result.settings));
            this.title.setTitle(data.result.settings.title)
        }
      });
    } 
    else{
      var info:any = JSON.parse(localStorage.getItem('info'));
      this.title.setTitle(info.title)
    }   
  }
  
}
