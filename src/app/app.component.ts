import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public msjStatus: boolean | any = null;
  constructor(private http: HttpClient) {}
  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    event.target.innerWidth;
    console.log(event.target.innerWidth);
  }

  public async getImage(data: any) {
    try {
      let base64result = data.split(',')[1];
      const response: any = await this.compairData(base64result);
      this.msjStatus = response.status;
    } catch (error) {}
  }

  public async compairData(data: any) {
    const payload = {
      photo: data,
    };
    const url = 'http://localhost:3000/api/verify';
    const response = await this.http.post(url, payload).toPromise();
    return response;
  }
}
