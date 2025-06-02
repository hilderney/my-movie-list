# MyMovieList

MyMovieList is a modern Angular application for searching, listing, and rating movies, with support for PWA installation, internationalization, and mobile deployment via Capacitor.

---

## ⚙️ Main Technologies & Resources

- **Angular 17**: Main framework for SPA development.
- **RxJS**: Reactive programming for handling asynchronous data streams.
- TODO - **NgRx**: State management for Angular applications.
- **Angular Router**: For SPA navigation and lazy loading.
- **Angular Service Worker**: PWA support (offline, caching, install prompt).
- **@ngx-translate/core**: Internationalization (i18n) for multi-language support.
- **Capacitor**: For building and deploying as a mobile app.
- **TMDb API**: For fetching movie data.
- **SCSS**: For modular and responsive styling.

---

## 🏗️ Project Structure

```
src/
  app/
    pages/
      movies/
        movie-list/
        movie-detail/
        top-rated/
    shared/
      components/
        movie-card/
        star-rating/
      services/
        movie.service.ts
        rating.service.ts
    core/
    app-routing.module.ts
    app.module.ts
  assets/
    i18n/
    img/
  environments/
```

---

## 🚦 Routing & Navigation

- **Lazy Loading**: The `movies` module is lazy-loaded for performance.
- **Child Routes**: `/movies/list`, `/movies/details/:id`, `/movies/top-rated`.
- **Navigation**: Uses `[routerLink]` for SPA navigation. Example:
  ```html
  <div class="card-link" [routerLink]="['/movies/details', movie.id]">
  ```
- **Back Button**: Uses Angular’s `Location` service for navigation history.

---

## 🌐 Internationalization (i18n)

- **@ngx-translate/core** is used for dynamic language switching.
- Language files are stored in `assets/i18n/`.
- Language switcher in the UI allows toggling between `pt` and `en`.

---

## 🌍 Locale & Formatting

- **Brazilian Locale**: Configured globally in `app.module.ts`:
  ```typescript
  import localePt from '@angular/common/locales/pt';
  registerLocaleData(localePt, 'pt-BR');
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }]
  ```
- **Number & Date Pipes**: Automatically use Brazilian formats.

---

## 🔥 State Management & Observables

- **Reactive Forms**: Used for search input (`FormControl`).
- **Observables**: Movie lists and details are handled as observables for async data.
- **RxJS Operators**: `debounceTime`, `distinctUntilChanged`, `switchMap`, `catchError`, etc.

---

## ⭐ Movie Rating System

- **Star Rating Component**: Custom component for user ratings.
- **Local Storage**: Ratings are persisted per movie using `rating.service.ts`.
- **Top Rated Page**: Aggregates and displays user’s top-rated movies and favorite genres.

---

## 🖼️ Components

- **MovieCardComponent**: Displays movie info and rating.
- **StarRatingComponent**: Interactive star-based rating.
- **MovieDetailComponent**: Shows detailed info and allows rating.
- **TopRatedComponent**: Shows stats and top-rated movies.

---

## 📱 PWA & Mobile

- **Service Worker**: Configured via `ngsw-config.json` for offline support and caching.
- **PWA Install Prompt**: Custom UI for install, using `beforeinstallprompt` event.
- **Capacitor**: Configured for Android deployment (`capacitor.config.ts`).

---

## 🎨 Styling

- **SCSS**: Modular, responsive, and concise styles.
- **Responsive Navigation**: Hamburger menu for mobile, grid layout for desktop.
- **Custom Button Styles**: For actions like "Voltar" (Back).

---

## 🧪 Testing

- TODO - **Unit Tests**: Configured with Karma and Jasmine (`ng test`).
- TODO - **E2E Tests**: Configured with Cypress (`ng e2e`).

---

## 📝 Useful Scripts

- `npm start` — Run dev server.
- `npm run build` — Production build.
- `npm run pwa` — Build and serve as PWA.
- `npm run android-sync` — Sync with Android via Capacitor.

---

## 📚 Further Reading

- [Angular CLI Docs](https://angular.io/cli)
- [Angular Service Worker](https://angular.io/guide/service-worker-intro)
- [ngx-translate](https://github.com/ngx-translate/core)
- [Capacitor](https://capacitorjs.com/)
- [TMDb API](https://developers.themoviedb.org/3)

---

## 💡 Highlights

- **Modern Angular best practices**: Lazy loading, OnPush change detection, modular architecture.
- **User-centric features**: Offline support, installable as PWA, mobile-ready, persistent ratings.
- **Clean, maintainable code**: Use of services, observables, and modular SCSS.
