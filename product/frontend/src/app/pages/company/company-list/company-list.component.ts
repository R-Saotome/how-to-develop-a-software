import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  columns: string[] = [
    'name',
    'field',
    'postal_code',
    'address',
    'tel',
    'fax',
    'url',
  ];
  data = [
    {
      id: 1,
      name: '株式会社シノブ',
      field: '飲食業界',
      postal_code: '000-0000',
      address: '東京都渋谷区恵比寿1-1-1　恵比寿ビルディング2階',
      tel: '03-0000-0000',
      fax: '03-0000-0008',
      url: 'https://www.shinobi.example',
    },
    {
      id: 1,
      name: '株式会社シノブ',
      field: '飲食業界',
      postal_code: '000-0000',
      address: '東京都渋谷区恵比寿1-1-1　恵比寿ビルディング2階',
      tel: '03-0000-0000',
      fax: '03-0000-0008',
      url: 'https://www.shinobi.example',
    },
    {
      id: 1,
      name: '株式会社シノブ',
      field: '飲食業界',
      postal_code: '000-0000',
      address: '東京都渋谷区恵比寿1-1-1　恵比寿ビルディング2階',
      tel: '03-0000-0000',
      fax: '03-0000-0008',
      url: 'https://www.shinobi.example',
    },
    {
      id: 1,
      name: '株式会社シノブ',
      field: '飲食業界',
      postal_code: '000-0000',
      address: '東京都渋谷区恵比寿1-1-1　恵比寿ビルディング2階',
      tel: '03-0000-0000',
      fax: '03-0000-0008',
      url: 'https://www.shinobi.example',
    },
    {
      id: 1,
      name: '株式会社シノブ',
      field: '飲食業界',
      postal_code: '000-0000',
      address: '東京都渋谷区恵比寿1-1-1　恵比寿ビルディング2階',
      tel: '03-0000-0000',
      fax: '03-0000-0008',
      url: 'https://www.shinobi.example',
    },
    {
      id: 1,
      name: '株式会社シノブ',
      field: '飲食業界',
      postal_code: '000-0000',
      address: '東京都渋谷区恵比寿1-1-1　恵比寿ビルディング2階',
      tel: '03-0000-0000',
      fax: '03-0000-0008',
      url: 'https://www.shinobi.example',
    },
    {
      id: 1,
      name: '株式会社シノブ',
      field: '飲食業界',
      postal_code: '000-0000',
      address: '東京都渋谷区恵比寿1-1-1　恵比寿ビルディング2階',
      tel: '03-0000-0000',
      fax: '03-0000-0008',
      url: 'https://www.shinobi.example',
    },
    {
      id: 1,
      name: '株式会社シノブ',
      field: '飲食業界',
      postal_code: '000-0000',
      address: '東京都渋谷区恵比寿1-1-1　恵比寿ビルディング2階',
      tel: '03-0000-0000',
      fax: '03-0000-0008',
      url: 'https://www.shinobi.example',
    },
    {
      id: 1,
      name: '株式会社シノブ',
      field: '飲食業界',
      postal_code: '000-0000',
      address: '東京都渋谷区恵比寿1-1-1　恵比寿ビルディング2階',
      tel: '03-0000-0000',
      fax: '03-0000-0008',
      url: 'https://www.shinobi.example',
    },
    {
      id: 1,
      name: '株式会社シノブ',
      field: '飲食業界',
      postal_code: '000-0000',
      address: '東京都渋谷区恵比寿1-1-1　恵比寿ビルディング2階',
      tel: '03-0000-0000',
      fax: '03-0000-0008',
      url: 'https://www.shinobi.example',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
