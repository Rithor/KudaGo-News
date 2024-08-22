# KudaGo-News (React/TS)

KudaGo-News – лента тематических событий в Москве. Это приложение позволяет пользователям просматривать события по категориям, добавлять партнерский контент через админку, а также работать в оффлайн-режиме благодаря поддержке PWA.

Моя цель заключалась в разработке современного интерфейса с использованием React и TypeScript, а также в создании функционального приложения с поддержкой темной темы и адаптивного дизайна.

[Check the Live Demo](https://2923733-lt72291.twc1.net/)

<img src="https://github.com/Rithor/KudaGo-News/blob/main/src/images/icons/desktop1.png" width="720px" />
<img src="https://github.com/Rithor/KudaGo-News/blob/main/src/images/icons/mobile2.png" width="720px" />

## Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=white)
![Material UI](https://img.shields.io/badge/materialui-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

## Features

* Просмотр событий по категориям.
* Добавление партнерского материала через админку.
* Поддержка PWA (оффлайн-режим, Cache Storage, Service Worker).
* Поддержка светлой и темной тем.
* Мобильная и десктопная версии.
* Адаптивный дизайн.
* Работа с доступностью.

## How to run locally

* Установите зависимости:
```bash
npm install
```
* Запустите локальный сервер через Webpack:
```bash
npm run start
```

## Additional Information
Проект реализует функционал просмотра событий с API Kudago.com, поддержку темной и светлой тем, а также возможность добавления рекламного материала через админку. Авторизация и база данных управляются через Firebase. Оффлайн-режим обеспечивается Service Worker, а состояние приложения контролируется через Redux Toolkit. Приложение настроено для работы как PWA.