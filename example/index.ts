import urlQueryJsonParser from "../index";

const main = () => {
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
  console.log("urlQuery: ", urlQuery);

  const urlJson = urlQueryJsonParser.parseQuery(urlQuery);
  console.log("urlJson: ", JSON.stringify(urlJson, null, 2));
};

main();
