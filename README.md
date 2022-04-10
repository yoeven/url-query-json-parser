# url-query-json-parser

This module allows you to convert complex JSON object with deeply nested objects and arrays into a query string. On the other hand it converts the query string back into a JSON object with the same conditions while parsing numbers, arrays and booleans.

## Install

```bash
$ npm install url-query-json-parser
```

```bash
$ yarn add url-query-json-parser
```

## Usage

```typescript
import urlQueryJsonParser from "url-query-json-parser";

const complexJson = {
  order: [
    {
      crop: {
        width: 300,
        height: 300,
      },
    },
  ],
  resize: {
    width: 100,
  },
  format: {
    ext: "jpeg",
    quality: "auto",
    progressive: true,
  },
};

const urlQuery = urlQueryJsonParser.parseJSON(complexJson);
console.log(urlQuery);
//=> "order[0][crop][width]=300&order[0][crop][height]=300&resize[width]=100&format[ext]=jpeg&format[quality]=auto&format[progressive]=TRUE"

const urlJson = urlQueryJsonParser.parseQuery(urlQuery);
console.log(JSON.stringify(urlJson));
//=> {"order":[{"crop":{"width":300,"height":300}}],"resize":{"width":100},"format":{"ext":"jpeg","quality":"auto","progressive":true}}
```

## APIs

### `.parseQuery(query:string)`

Parse a query string into a deeply nested JSON object with array, boolean and number parsing

```typescript
const parsed = urlQueryJsonParser.parseQuery(location.search);
```

### `.parseJSON(jsonObject:object)`

Convert a complex JSON object with nested objects and arrays into a query string

```typescript
const parsed = urlQueryJsonParser.parseJSON({
  foo: [
    {
      item: "one",
      id: 1,
      active: false,
    },
  ],
});
```

## Credits

Built based on this [gist](https://gist.github.com/christoph-jeanluc-schneider/dd0718b002976d0cac3b56d252c67b7a)

## Contribution

Open to contribution and updates to make this library more versatile.
