import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  currentLang = this.translate.currentLang || this.translate.getDefaultLang();


  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
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

  changeLang(lang: 'pt' | 'en') {
    this.translate.use(lang);
    this.currentLang = lang;
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
