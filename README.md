# iiif-url

> IIIF Image API URI Parser `2.1.1` for JS/TS

## Usage

```sh
npm install iiif-url
```

## Usage

### Image Request URIs

```js
import { parseURI } from "iiif-url";

const result = parseURI(
  "https://iiif.bodleian.ox.ac.uk/iiif/image/f27e28db-0b08-4f16-9bdf-3565f591fb71/full/256,/0/default.jpg"
);
```

```json
{
  "tag": "imageRequest",
  "uri": "https://iiif.bodleian.ox.ac.uk/iiif/image/f27e28db-0b08-4f16-9bdf-3565f591fb71/full/256,/0/default.jpg",
  "scheme": "https",
  "server": {
    "host": "iiif.bodleian.ox.ac.uk"
  },
  "prefix": "/iiif/image",
  "identifier": "f27e28db-0b08-4f16-9bdf-3565f591fb71",
  "region": {
    "tag": "full"
  },
  "size": {
    "tag": "width",
    "w": 256
  },
  "rotation": {
    "tag": "clockwise",
    "degrees": 0
  },
  "quality": "default",
  "format": "jpg"
}
```

### Image Information Request

```js
import { parseURI } from "iiif-url";

const result = parseURI(
  "https://iiif.bodleian.ox.ac.uk/iiif/image/f27e28db-0b08-4f16-9bdf-3565f591fb71/info.json"
);
```

```json
{
  "tag": "imageInformationRequest",
  "uri": "https://iiif.bodleian.ox.ac.uk/iiif/image/f27e28db-0b08-4f16-9bdf-3565f591fb71/info.json",
  "scheme": "https",
  "server": {
    "host": "iiif.bodleian.ox.ac.uk"
  },
  "prefix": "/iiif/image",
  "identifier": "f27e28db-0b08-4f16-9bdf-3565f591fb71"
}
```

### Parse Errors

```js
import { parseURI } from "iiif-url";

const result = parseURI(
  "https://iiif.bodleian.ox.ac.uk/iiif/image/f27e28db-0b08-4f16-9bdf-3565f591fb71/bingo/256,/0/default.jpg"
);
```

```json
{
  "tag": "error",
  "uri": "https://iiif.bodleian.ox.ac.uk/iiif/image/f27e28db-0b08-4f16-9bdf-3565f591fb71/bingo/256,/0/default.jpg",
  "errors": [
    {
      "tag": "badRegion",
      "value": "bingo"
    }
  ]
}
```

### Discriminated Unions

The parse result will return one of three possible structures.

| Structure | Tag |
| [Image Request](https://iiif.io/api/image/2.1/#image-request-parameters) | `imageRequest` |
| [Image Information Request](https://iiif.io/api/image/2.1/#image-information) | `imageInformationRequest` |
| Parse Error | `error` |

The `tag` can be used to discriminate between them.

```ts
import { parseURI } from "iiif-url";

const result = parseURI(
  "https://iiif.bodleian.ox.ac.uk/iiif/image/f27e28db-0b08-4f16-9bdf-3565f591fb71/full/256,/0/default.jpg"
);

switch (result.tag) {
  case "imageRequest": {
    // do something with an image request-shaped result
  }
  case "imageInformationRequest": {
    // do something with an image information request-shaped result
  }
  case "error": {
    // do something with an error
  }
}
```

The TypeScript type definitions supplied with this package describe all the possible structures and their attendant tags.

## Versioning

This package doesn't use semantic versioning.

The **major** version number tracks the version of the IIIF Image API spec targeted by this version of the package.

You're looking at the package targeting this version of the spec:

- [Image API 2.1.1](https://iiif.io/api/image/2.1/)
