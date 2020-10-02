import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menus: { icon: string; name: string }[] = [
    { icon: 'calendar_today', name: 'スケジュール' },
    { icon: 'business', name: '顧客情報' },
    { icon: 'contacts', name: '名刺情報' },
    { icon: 'folder_open', name: '案件情報' },
    { icon: 'library_books', name: '日報' },
    { icon: 'build', name: '設定' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
