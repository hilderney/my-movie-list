import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title "My Movie List"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('My Movie List');
  });

  it('should toggle menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.menuOpen).toBeFalse();
    app.toggleMenu();
    expect(app.menuOpen).toBeTrue();
    app.toggleMenu();
    expect(app.menuOpen).toBeFalse();
  });

  it('should change language', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.changeLang('en');
    expect(app.currentLang).toBe('en');
    app.changeLang('pt');
    expect(app.currentLang).toBe('pt');
  });

  it('should close menu on handleMenuClick', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.menuOpen = true;
    app.handleMenuClick();
    expect(app.menuOpen).toBeFalse();
  });
});
