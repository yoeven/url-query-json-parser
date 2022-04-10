# url-query-json-parser

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
