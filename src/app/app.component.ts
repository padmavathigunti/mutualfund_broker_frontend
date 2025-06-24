import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'app-root',
    templateUrl: './app.html'
})
export class AppComponent {
  title = 'Mutual Fund Broker';
}
