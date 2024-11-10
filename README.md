# Notesy App - Angular Getting Started

Angular notes app (notsey) getting started.

![](https://raw.githubusercontent.com/ZakiMohammed/react-notsey-app/master/banner.png)

___

Check out the CodeOmelet blog posts for this project:

- [Angular Journey: Part 1 - Getting Started](https://codeomelet.com/posts/ng-journey-part-1-getting-started)
- [Angular Journey: Part 2 - Bindings, Directives, Components, Services](https://codeomelet.com/posts/ng-journey-part-2-bindings-directives-components-services)
- [Angular Journey: Part 3 - Angular Routes](https://codeomelet.com/posts/ng-journey-part-3-angular-routes)
- [Angular Journey: Part 4 - Working with Web API](https://codeomelet.com/posts/ng-journey-part-4-working-with-web-api)

## Folders:

```
notsey
|-- ng-1-init
|-- ng-2-crud
|-- ng-3-routes
|-- ng-4-api
|-- README.md
```

1. Ng Init: Initial project skeleton and init commands.
2. Ng CRUD: List, add and remove operations.
3. Ng Routes: Configuring routes and navigation.
4. Ng API: Getting data from API.

## Run Application
```
npm start
```

## Initial Setup

```
ng new ng-notesy-app --standalone=false

? Which stylesheet format would you like to use? Sass (SCSS)
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? no
```

## Add Dependencies

```
npm i bootstrap
npm i bootswatch
npm i bootstrap-icons
```

## JSON Server

Install `json-server` globally:

```
npm install -g json-server
```

Add npm script in package.json file:

```
"scripts": {
  "server": "json-server server/db.json --config server/json-server.json"
}
```

Read about json-server from here https://www.npmjs.com/package/json-server.