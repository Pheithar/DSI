import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'APP 03 - Custom Components...';

  contactos=[['Juan','juan@nose.esx','91-111.11.11'],
			['Maria','maria@nose.Xes','91-222.22.22'],
			['Pepe','','91-333.33.33']];

}
