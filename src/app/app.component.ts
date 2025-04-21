import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'My Movie List';
  currentRoute: string = '';
  isDetailRoute: boolean = false;
  menuOpen = false;
  isWideScreen = window.innerWidth > 768;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
        this.isDetailRoute = /^\/movie\/\d+/.test(this.currentRoute);
      });
  }

  isRoute(path: string): boolean {
    return this.currentRoute.startsWith(path);
  }

  handleMenuClick() {
    this.menuOpen = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const w = (event.target as Window).innerWidth;
    this.isWideScreen = w > 768;
    if (this.isWideScreen) {
      this.menuOpen = false;
    }
  }
}
