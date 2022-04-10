const parseValue = (value: string): any => {
  if (value.toUpperCase() === "TRUE") return true;
  if (value.toUpperCase() === "FALSE") return false;
  return isNaN(Number(value)) ? value : Number(value);
};

const dec = (list: any[], isArray = false): object => {
  let obj: any = isArray ? [] : {};

  let recs: any[] = list.filter((item) => {
    if (item.keys.length > 1) return true;
    obj[item.keys[0]] = parseValue(item.value);
  });

  let attrs: any = {};
  recs
    .map((item) => {
      item.key = item.keys.shift();
      attrs[item.key] = [];
      return item;
    })
    .forEach((item) => attrs[item.key].push(item));

  Object.keys(attrs).forEach((attr) => {
    let nextKey = attrs[attr][0].keys[0];
    obj[attr] = dec(attrs[attr], typeof nextKey === "number");
  });

  return obj;
};

const reducer = (obj: any, parentPrefix: null | string = null) => {
  return function (prev: any[], key: string) {
    const val = obj[key];
    key = encodeURIComponent(key);
    const prefix = parentPrefix ? `${parentPrefix}[${key}]` : key;

    if (val == null || typeof val === "function") {
      prev.push(`${prefix}=`);
      return prev;
    }

    if (typeof val === "boolean") {
      prev.push(`${prefix}=${val.toString().toUpperCase()}`);
      return prev;
    }

    if (["number", "string"].includes(typeof val)) {
      prev.push(`${prefix}=${encodeURIComponent(val)}`);
      return prev;
    }

    prev.push(Object.keys(val).reduce(reducer(val, prefix), []).join("&"));
    return prev;
  };
};

function decode(querystring: string): object {
  if (querystring.length > 0 && querystring[0] === "?") {
    querystring = querystring.slice(1);
  }

  return dec(
    querystring
      .split("&")
      .map((item) => item.split("=").map((x) => decodeURIComponent(x)))
      .map((item) => {
        return {
          keys: item[0]
            .split(/[\[\]]/g)
            .filter((n) => n)
            .map((key) => (isNaN(Number(key)) ? key : Number(key))),
          value: item[1],
        };
      })
  );
}

function encode(object: object): string {
  return Object.keys(object).reduce(reducer(object), []).join("&");
}

export default {
  parseQuery: decode,
  parseJSON: encode,
};
