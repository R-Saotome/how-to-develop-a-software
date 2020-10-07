import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menus: { icon: string; name: string; href: string }[] = [
    { icon: 'calendar_today', name: 'スケジュール', href: '/schedules' },
    { icon: 'business', name: '顧客情報', href: '/companies' },
    { icon: 'contacts', name: '名刺情報', href: '/persons' },
    { icon: 'folder_open', name: '案件情報', href: '/opportunities' },
    { icon: 'library_books', name: '日報', href: '/reports' },
    { icon: 'build', name: '設定', href: '/settings' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onNavigateTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
