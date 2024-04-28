import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

window.onload = function () {
  const sidebar: HTMLElement | null = document.querySelector('.sidebar');
  const closeBtn: HTMLElement | null = document.querySelector('#btn');
  const searchBtn: HTMLElement | null = document.querySelector('.bx-search');

  closeBtn?.addEventListener('click', function () {
    sidebar?.classList.toggle('open');
    menuBtnChange();
  });

  searchBtn?.addEventListener('click', function () {
    sidebar?.classList.toggle('open');
    menuBtnChange();
  });

  function menuBtnChange(): void {
    if (sidebar?.classList.contains('open')) {
      closeBtn?.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
      closeBtn?.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
  }
};
