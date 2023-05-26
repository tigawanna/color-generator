# Vite + React + Tailwind + shadcon/ui + tanstack router , tanstack query template

using 

- tailwindcss
- [shadcn components](https://ui.shadcn.com/) configured . to add a compoenet run 
to add new  run 
```sh 
npx shadcn-ui add 
```
followed by the shadan component
- [lucide-react icons](https://lucide.dev/)

- tailwind-prettier-plugin
- run 
```sh
npm page Pagename
```
to add new pages on the same name </br>
⚠⚠ make sure to pass in a uppercase first page name
and restart your dev server </br>

```sh 
❌ npm run page contact
```

```sh 
✔ npm run page Contact
```

this generates a new page called contact under src/pages
and adds the route into src/routes.ts , leeting you use it immediately with no extra config

run 
```npm
upgrade-deps
```
to get the latest version of your package.json dependancies , might introduce breaking changes so amke sureto check the changed verions 
