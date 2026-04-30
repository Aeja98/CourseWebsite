# Kurswebbsida

https://course-website-wox8.onrender.com/

En serverbaserad webbplats där användaren kan lagra och visa kurser. Kurser sparas i en MySQL-databas och hämtas via en Express-server.

## Funktioner

- Visa en lista med kurser från databasen
- Lägga till en ny kurs via formulär
- Radera en kurs
- Validera att alla fält är ifyllda (serverside)
- Validera att progression är A, B eller C

## Tekniker

Projektet är byggt med:

- Node.js
- Express
- EJS
- MySQL
- SCSS
- HTML

## Kursinformation

Varje kurs innehåller följande information:

- `coursecode` – kurskod
- `coursename` – kursnamn
- `progression` – progression (`A`, `B` eller `C`)
- `syllabus` – länk till kursplan

## Att köra appen lokalt

1. Installera dependencies:
   `npm install`
   
2. Skapa en .env-fil med följande:
- `DB_HOST= `
- `DB_PORT= `
- `DB_USER= `
- `DB_PASSWORD= `
- `DB_NAME= `
  
3. Starta servern:
  `npm run dev`
 
4. Öppna
   http://localhost:3000

## Filstruktur
```
TypeScript1/
├── public/
│   ├── font/
│   └── styles/
│       └── main.css
├── src/
│   └── styles/
│       ├── abstracts/
│       ├── base/
│       ├── layout/
│       ├── pages/
│       └── main.scss
├── views/
│   ├── about.ejs
│   ├── addcourse.ejs
│   └── index.ejs
├── server.js
├── package.json
├── package-lock.json
├── .env.example
└── README.md
