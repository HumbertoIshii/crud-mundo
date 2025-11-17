crud-mundo/
├── database/
│   ├── database.ts
│   ├── database.sql
│   └── create-database.ts
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── index.js
│       └── geo.js
├── types/
│   ├── entities.d.ts
│   └── express-session.d.ts
├── views/
│   ├── partials/
│   │   ├── sidebar.ejs
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   ├── admin/
│   │   │   ├── cities.ejs
│   │   │   ├── continents.ejs
│   │   │   └── countries.ejs
│   │   └── dashboard/
│   │       ├── general.ejs
│   │       ├── cities.ejs
│   │       ├── continents.ejs
│   │       └── countries.ejs
│   ├── index.ejs
│   ├── layout.ejs
│   ├── login.ejs
│   └── geo.ejs
├── routes/
│   ├── geo.ts
│   ├── auth.ts
│   ├── index.ts
│   ├── dashbord/
│   │   ├── cities.ts
│   │   ├── continents.ts
│   │   ├── countries.ts
│   │   └── general.ts
│   └── admin/
│       ├── cities.ts
│       ├── continents.ts
│       └── countries.ts
├── services/
│   ├── dashbord/
│   │   ├── cities.service.ts
│   │   ├── continents.service.ts
│   │   ├── countries.service.ts
│   │   └── general.service.ts
│   └── admin/
│       ├── cities.service.ts
│       ├── continents.service.ts
│       └── countries.service.ts
├── app.ts
├── .env.template
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── structure.md