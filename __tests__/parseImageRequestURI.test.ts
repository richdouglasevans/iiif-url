import { describe, expect, test } from "@jest/globals";

import { parseURI } from "../lib/index.js";

describe("parse Image Request URI", () => {
  describe("sunny day", () => {
    test("vanilla URI", () => {
      const result = parseURI(
        "https://example.org/image-service/abcd1234/full/max/0/default.jpg"
      );

      expect(result).toMatchObject({
        tag: "imageRequest",
        uri: "https://example.org/image-service/abcd1234/full/max/0/default.jpg",
        scheme: "https",
        server: {
          host: "example.org",
          port: undefined,
        },
        prefix: "/image-service",
        identifier: "abcd1234",
        region: {
          tag: "full",
        },
        size: {
          tag: "max",
        },
        rotation: {
          tag: "clockwise",
          degrees: 0,
        },
        quality: "default",
        format: "jpg",
      });
    });

    test("with explicit port", () => {
      const result = parseURI(
        "https://example.org:8080/image-service/abcd1234/full/max/0/default.jpg"
      );

      expect(result).toMatchObject({
        tag: "imageRequest",
        uri: "https://example.org:8080/image-service/abcd1234/full/max/0/default.jpg",
        scheme: "https",
        server: {
          host: "example.org",
          port: "8080",
        },
        prefix: "/image-service",
        identifier: "abcd1234",
        region: {
          tag: "full",
        },
        size: {
          tag: "max",
        },
        rotation: {
          tag: "clockwise",
          degrees: 0,
        },
        quality: "default",
        format: "jpg",
      });
    });

    test("with two-section prefix", () => {
      const result = parseURI(
        "https://example.org/image-service/iiif/abcd1234/full/max/0/default.jpg"
      );

      expect(result).toMatchObject({
        tag: "imageRequest",
        uri: "https://example.org/image-service/iiif/abcd1234/full/max/0/default.jpg",
        scheme: "https",
        server: {
          host: "example.org",
          port: undefined,
        },
        prefix: "/image-service/iiif",
        identifier: "abcd1234",
        region: {
          tag: "full",
        },
        size: {
          tag: "max",
        },
        rotation: {
          tag: "clockwise",
          degrees: 0,
        },
        quality: "default",
        format: "jpg",
      });
    });

    test("with no prefix; prefix is optional", () => {
      const result = parseURI(
        "https://example.org/abcd1234/full/max/0/default.jpg"
      );

      expect(result).toMatchObject({
        tag: "imageRequest",
        uri: "https://example.org/abcd1234/full/max/0/default.jpg",
        scheme: "https",
        server: {
          host: "example.org",
          port: undefined,
        },
        prefix: undefined,
        identifier: "abcd1234",
        region: {
          tag: "full",
        },
        size: {
          tag: "max",
        },
        rotation: {
          tag: "clockwise",
          degrees: 0,
        },
        quality: "default",
        format: "jpg",
      });
    });

    describe("region", () => {
      test("full", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/full/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "imageRequest",
          uri: "https://example.org/image-service/iiif/abcd1234/full/max/0/default.jpg",
          scheme: "https",
          server: {
            host: "example.org",
            port: undefined,
          },
          prefix: "/image-service/iiif",
          identifier: "abcd1234",
          region: {
            tag: "full",
          },
          size: {
            tag: "max",
          },
          rotation: {
            tag: "clockwise",
            degrees: 0,
          },
          quality: "default",
          format: "jpg",
        });
      });

      test("square", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/square/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "imageRequest",
          uri: "https://example.org/image-service/iiif/abcd1234/square/max/0/default.jpg",
          scheme: "https",
          server: {
            host: "example.org",
            port: undefined,
          },
          prefix: "/image-service/iiif",
          identifier: "abcd1234",
          region: {
            tag: "square",
          },
          size: {
            tag: "max",
          },
          rotation: {
            tag: "clockwise",
            degrees: 0,
          },
          quality: "default",
          format: "jpg",
        });
      });

      test("pixels", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/1,3,22,44/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "imageRequest",
          scheme: "https",
          server: {
            host: "example.org",
            port: undefined,
          },
          prefix: "/image-service/iiif",
          identifier: "abcd1234",
          region: {
            tag: "pixels",
            x: 1,
            y: 3,
            w: 22,
            h: 44,
          },
          size: {
            tag: "max",
          },
          rotation: {
            tag: "clockwise",
            degrees: 0,
          },
          quality: "default",
          format: "jpg",
        });
      });

      test("percentages", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/pct:0.1,12,33.3,45/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "imageRequest",
          scheme: "https",
          server: {
            host: "example.org",
            port: undefined,
          },
          prefix: "/image-service/iiif",
          identifier: "abcd1234",
          region: {
            tag: "percentages",
            x: 0.1,
            y: 12,
            w: 33.3,
            h: 45,
          },
          size: {
            tag: "max",
          },
          rotation: {
            tag: "clockwise",
            degrees: 0,
          },
          quality: "default",
          format: "jpg",
        });
      });
    });

    describe("size", () => {
      test("full", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/full/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "imageRequest",
          scheme: "https",
          server: {
            host: "example.org",
            port: undefined,
          },
          prefix: "/image-service/iiif",
          identifier: "abcd1234",
          region: {
            tag: "pixels",
            x: 0,
            y: 1,
            w: 2,
            h: 3,
          },
          size: {
            tag: "full",
          },
          rotation: {
            tag: "clockwise",
            degrees: 0,
          },
          quality: "default",
          format: "jpg",
        });
      });

      test("max", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "imageRequest",
          scheme: "https",
          server: {
            host: "example.org",
            port: undefined,
          },
          prefix: "/image-service/iiif",
          identifier: "abcd1234",
          region: {
            tag: "pixels",
            x: 0,
            y: 1,
            w: 2,
            h: 3,
          },
          size: {
            tag: "max",
          },
          rotation: {
            tag: "clockwise",
            degrees: 0,
          },
          quality: "default",
          format: "jpg",
        });
      });

      test("percentage", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/pct:44.5/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "imageRequest",
          scheme: "https",
          server: {
            host: "example.org",
            port: undefined,
          },
          prefix: "/image-service/iiif",
          identifier: "abcd1234",
          region: {
            tag: "pixels",
            x: 0,
            y: 1,
            w: 2,
            h: 3,
          },
          size: {
            tag: "percentage",
            percentage: 44.5,
          },
          rotation: {
            tag: "clockwise",
            degrees: 0,
          },
          quality: "default",
          format: "jpg",
        });
      });

      test("just width", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/72,/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "imageRequest",
          scheme: "https",
          server: {
            host: "example.org",
            port: undefined,
          },
          prefix: "/image-service/iiif",
          identifier: "abcd1234",
          region: {
            tag: "pixels",
            x: 0,
            y: 1,
            w: 2,
            h: 3,
          },
          size: {
            tag: "width",
            w: 72,
          },
          rotation: {
            tag: "clockwise",
            degrees: 0,
          },
          quality: "default",
          format: "jpg",
        });
      });

      test("just height", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/,283/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "imageRequest",
          scheme: "https",
          server: {
            host: "example.org",
            port: undefined,
          },
          prefix: "/image-service/iiif",
          identifier: "abcd1234",
          region: {
            tag: "pixels",
            x: 0,
            y: 1,
            w: 2,
            h: 3,
          },
          size: {
            tag: "height",
            h: 283,
          },
          rotation: {
            tag: "clockwise",
            degrees: 0,
          },
          quality: "default",
          format: "jpg",
        });
      });

      test("width and height", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/145,283/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "imageRequest",
          scheme: "https",
          server: {
            host: "example.org",
            port: undefined,
          },
          prefix: "/image-service/iiif",
          identifier: "abcd1234",
          region: {
            tag: "pixels",
            x: 0,
            y: 1,
            w: 2,
            h: 3,
          },
          size: {
            tag: "widthAndHeight",
            w: 145,
            h: 283,
          },
          rotation: {
            tag: "clockwise",
            degrees: 0,
          },
          quality: "default",
          format: "jpg",
        });
      });

      test("constrained", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/!12,34/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "imageRequest",
          scheme: "https",
          server: {
            host: "example.org",
            port: undefined,
          },
          prefix: "/image-service/iiif",
          identifier: "abcd1234",
          region: {
            tag: "pixels",
            x: 0,
            y: 1,
            w: 2,
            h: 3,
          },
          size: {
            tag: "constrained",
            w: 12,
            h: 34,
          },
          rotation: {
            tag: "clockwise",
            degrees: 0,
          },
          quality: "default",
          format: "jpg",
        });
      });
    });

    describe("rotation", () => {
      describe("clockwise", () => {
        test.each([0, 1, 90, 180, 360, 0.1, 1.1, 90.123, 180.4546, 360])(
          "https://example.org/image-service/abcd1234/full/max/%s/default.jpg",
          (degrees) => {
            const result = parseURI(
              `https://example.org/image-service/abcd1234/full/max/${degrees}/default.jpg`
            );

            expect(result).toMatchObject({
              tag: "imageRequest",
              scheme: "https",
              server: {
                host: "example.org",
                port: undefined,
              },
              prefix: "/image-service",
              identifier: "abcd1234",
              region: {
                tag: "full",
              },
              size: {
                tag: "max",
              },
              rotation: {
                tag: "clockwise",
                degrees,
              },
              quality: "default",
              format: "jpg",
            });
          }
        );
      });

      describe("mirrored", () => {
        test.each([0, 1, 90, 180, 360, 0.1, 1.1, 90.123, 180.4546, 360])(
          "https://example.org/image-service/abcd1234/full/max/%s/default.jpg",
          (degrees) => {
            const result = parseURI(
              `https://example.org/image-service/abcd1234/full/max/!${degrees}/default.jpg`
            );

            expect(result).toMatchObject({
              tag: "imageRequest",
              scheme: "https",
              server: {
                host: "example.org",
                port: undefined,
              },
              prefix: "/image-service",
              identifier: "abcd1234",
              region: {
                tag: "full",
              },
              size: {
                tag: "max",
              },
              rotation: {
                tag: "mirrored",
                degrees,
              },
              quality: "default",
              format: "jpg",
            });
          }
        );
      });
    });

    describe("quality", () => {
      test.each(["color", "gray", "bitonal", "default"])(
        "https://example.org/image-service/abcd1234/full/max/0/%s.jpg",
        (quality) => {
          const result = parseURI(
            `https://example.org/image-service/abcd1234/full/max/0/${quality}.jpg`
          );

          expect(result).toMatchObject({
            tag: "imageRequest",
            scheme: "https",
            server: {
              host: "example.org",
              port: undefined,
            },
            prefix: "/image-service",
            identifier: "abcd1234",
            region: {
              tag: "full",
            },
            size: {
              tag: "max",
            },
            rotation: {
              tag: "clockwise",
              degrees: 0,
            },
            quality,
            format: "jpg",
          });
        }
      );
    });

    describe("format", () => {
      test.each(["jpg", "png", "tif", "JPG", "JPEG"])(
        "https://example.org/image-service/abcd1234/full/max/0/default.%s",
        (format) => {
          const result = parseURI(
            `https://example.org/image-service/abcd1234/full/max/0/default.${format}`
          );

          expect(result).toMatchObject({
            tag: "imageRequest",
            scheme: "https",
            server: {
              host: "example.org",
              port: undefined,
            },
            prefix: "/image-service",
            identifier: "abcd1234",
            region: {
              tag: "full",
            },
            size: {
              tag: "max",
            },
            rotation: {
              tag: "clockwise",
              degrees: 0,
            },
            quality: "default",
            format,
          });
        }
      );
    });
  });

  describe("rainy day", () => {
    test("missing identifier", () => {
      const result = parseURI("https://example.org/full/max/0/default.jpg");

      expect(result).toMatchObject({
        tag: "error",
        uri: "https://example.org/full/max/0/default.jpg",
        errors: [
          {
            tag: "malformedPath",
            value: "/full/max/0/default.jpg",
          },
        ],
      });
    });

    test("unsupported scheme", () => {
      const result = parseURI(
        "ftp://example.org/image-service/123abc/full/max/0/default.jpg"
      );

      expect(result).toMatchObject({
        tag: "error",
        uri: "ftp://example.org/image-service/123abc/full/max/0/default.jpg",
        errors: [
          {
            tag: "unsupportedScheme",
            value: "ftp",
            message: "The only supported schemes are http and https",
          },
        ],
      });
    });

    describe("malformed URI", () => {
      test("missing scheme", () => {
        const result = parseURI(
          "://example.org/image-service/123abc/full/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "malformedURI",
              value:
                "://example.org/image-service/123abc/full/max/0/default.jpg",
            },
          ],
        });
      });

      test("bad port 'FOO'", () => {
        const result = parseURI(
          "https://example.org:FOO/image-service/123abc/full/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "malformedURI",
              value:
                "https://example.org:FOO/image-service/123abc/full/max/0/default.jpg",
            },
          ],
        });
      });

      test("bad port '-1'", () => {
        const result = parseURI(
          "https://example.org:-1/image-service/123abc/full/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "malformedURI",
              value:
                "https://example.org:-1/image-service/123abc/full/max/0/default.jpg",
            },
          ],
        });
      });

      test("bad port '65536'", () => {
        const result = parseURI(
          "https://example.org:65536/image-service/123abc/full/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "malformedURI",
              value:
                "https://example.org:65536/image-service/123abc/full/max/0/default.jpg",
            },
          ],
        });
      });

      test("bad port '33.5'", () => {
        const result = parseURI(
          "https://example.org:33.5/image-service/123abc/full/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "malformedURI",
              value:
                "https://example.org:33.5/image-service/123abc/full/max/0/default.jpg",
            },
          ],
        });
      });
    });

    test("missing region", () => {
      const result = parseURI(
        "https://example.org/image-service/abcd1234/max/0/default.jpg"
      );

      expect(result).toMatchObject({
        tag: "error",
        errors: [
          {
            tag: "badRegion",
            value: "abcd1234",
          },
        ],
      });
    });

    test("missing size", () => {
      const result = parseURI(
        "https://example.org/image-service/abcd1234/full/0/default.jpg"
      );

      expect(result).toMatchObject({
        tag: "error",
        errors: [
          {
            tag: "badRegion",
            value: "abcd1234",
          },
        ],
      });
    });

    test("missing rotation", () => {
      const result = parseURI(
        "https://example.org/image-service/abcd1234/full/max/default.jpg"
      );

      expect(result).toMatchObject({
        tag: "error",
        errors: [
          {
            tag: "badRotation",
            value: "max",
            message: "Error parsing 'max' into degree of rotation",
          },
        ],
      });
    });

    test("missing quality", () => {
      const result = parseURI(
        "https://example.org/image-service/abcd1234/full/max/0/.jpg"
      );

      expect(result).toMatchObject({
        tag: "error",
        errors: [
          {
            tag: "missingQuality",
            value: ".jpg",
          },
        ],
      });
    });

    test("missing format: no extension, just the period", () => {
      const result = parseURI(
        "https://example.org/image-service/abcd1234/full/max/0/default."
      );

      expect(result).toMatchObject({
        tag: "error",
        errors: [
          {
            tag: "missingFormat",
            value: "default.",
          },
        ],
      });
    });

    test("malformed format: multiple extensions", () => {
      const result = parseURI(
        "https://example.org/image-service/abcd1234/full/max/0/default.jpg.png"
      );

      expect(result).toMatchObject({
        tag: "error",
        errors: [
          {
            tag: "malformedPath",
            value: "default.jpg.png",
          },
        ],
      });
    });

    test("missing format/quality: no extension or period", () => {
      const result = parseURI(
        "https://example.org/image-service/abcd1234/full/max/0/default"
      );

      expect(result).toMatchObject({
        tag: "error",
        errors: [
          {
            tag: "malformedPath",
            value: "default",
          },
        ],
      });
    });

    describe("region", () => {
      test("negative x-value for pixels", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/-1,3,22,44/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: "-1,3,22,44",
            },
          ],
        });
      });

      test("negative y-value for pixels", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/1,-3,22,44/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: "1,-3,22,44",
            },
          ],
        });
      });

      test("negative w-value for pixels", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/1,3,-22,44/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: "1,3,-22,44",
            },
          ],
        });
      });

      test("negative h-value for pixels", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/1,3,22,-44/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: "1,3,22,-44",
            },
          ],
        });
      });

      test("no values out of the required 4", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234//max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: "",
            },
          ],
        });
      });

      test("no values (just commas) out of the required 4", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/,,,/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: ",,,",
            },
          ],
        });
      });

      test("only 1 value out of the required 4", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/1/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: "1",
            },
          ],
        });
      });

      test("only 2 values out of the required 4", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/1,2/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: "1,2",
            },
          ],
        });
      });

      test("only 3 values out of the required 4", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/1,2,3/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: "1,2,3",
            },
          ],
        });
      });

      test("all values present but with extra leading comma", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/,1,2,3,4/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: ",1,2,3,4",
            },
          ],
        });
      });

      test("all values present but with extra trailing comma", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/1,2,3,4,/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: "1,2,3,4,",
            },
          ],
        });
      });

      test("all values present but with extra commas", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/,1,2,3,4,/max/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRegion",
              value: ",1,2,3,4,",
            },
          ],
        });
      });
    });

    describe("size", () => {
      test("missing", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3//0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "",
            },
          ],
        });
      });

      test("missing, just commas", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/,,,/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: ",,,",
            },
          ],
        });
      });

      test("percentage: <missing>", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/pct:/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "pct:",
            },
          ],
        });
      });

      test("percentage <missing> (no colon)", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/pct/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "pct",
            },
          ],
        });
      });

      test("percentage negative", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/pct:-1/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "pct:-1",
            },
          ],
        });
      });

      test("percentage NaN", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/pct:hello/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "pct:hello",
              message: "Error parsing 'hello'",
            },
          ],
        });
      });

      test("bad size, too many values", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/1,1,1/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "1,1,1",
              message: "Error parsing size: expecting 2 values, got 3",
            },
          ],
        });
      });

      test("just width 0", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/0,/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "0,",
            },
          ],
        });
      });

      test("just width -1", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/-1,/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "-1,",
            },
          ],
        });
      });

      test("just width NaN", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/bingo,/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          uri: "https://example.org/image-service/iiif/abcd1234/0,1,2,3/bingo,/0/default.jpg",
          errors: [
            {
              tag: "badSize",
              value: "bingo,",
              message: "Error parsing 'bingo'",
            },
          ],
        });
      });

      test("just height 0", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/,0/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: ",0",
            },
          ],
        });
      });

      test("just height -1", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/,-1/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: ",-1",
            },
          ],
        });
      });

      test("just height NaN", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/,bingo/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: ",bingo",
              message: "Error parsing 'bingo'",
            },
          ],
        });
      });

      test("width and height, negative width", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/-145,283/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "-145,283",
            },
          ],
        });
      });

      test("width and height, negative height", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/145,-283/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "145,-283",
            },
          ],
        });
      });

      test("width and height, negative width and height", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/-145,-283/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "-145,-283",
            },
          ],
        });
      });

      test("width and height, 0 width", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/0,283/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "0,283",
            },
          ],
        });
      });

      test("width and height, 0 height", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/12,0/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "12,0",
            },
          ],
        });
      });

      test("width and height, both 0", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/0,0/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "0,0",
            },
          ],
        });
      });

      test("width and height, width NaN", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/bingo,283/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          uri: "https://example.org/image-service/iiif/abcd1234/0,1,2,3/bingo,283/0/default.jpg",
          errors: [
            {
              tag: "badSize",
              value: "bingo,283",
              message: "Error parsing 'bingo'",
            },
          ],
        });
      });

      test("width and height, height NaN", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/12,bingo/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "12,bingo",
              message: "Error parsing 'bingo'",
            },
          ],
        });
      });

      test("width and height, both NaN", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/bin,go/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "bin,go",
              message: "Error parsing 'bin'",
            },
          ],
        });
      });

      test("unsupported size", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/unsupported/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "unsupported",
              message: "Unable to parse value into a size",
            },
          ],
        });
      });

      test("constrained, missing completely", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/!/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "!",
              message: "Unable to parse value into a size",
            },
          ],
        });
      });

      test("constrained, missing any values", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/!,/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "!,",
              message: "Error parsing '!'",
            },
          ],
        });
      });

      test("constrained, too many values", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/!1,1,1,1/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "1,1,1,1",
              message: "Error parsing size: expecting 2 values, got 4",
            },
          ],
        });
      });

      test("constrained, negative", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/!-1/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "!-1",
              message: "Unable to parse value into a size",
            },
          ],
        });
      });

      test("constrained, 0", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/!0/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "!0",
              message: "Unable to parse value into a size",
            },
          ],
        });
      });

      test("constrained, NaN", () => {
        const result = parseURI(
          "https://example.org/image-service/iiif/abcd1234/0,1,2,3/!bingo/0/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badSize",
              value: "!bingo",
              message: "Unable to parse value into a size",
            },
          ],
        });
      });
    });

    describe("rotation", () => {
      test("clockwise, missing", () => {
        const result = parseURI(
          "https://example.org/image-service/abcd1234/full/max//default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRotation",
              value: "",
            },
          ],
        });
      });

      test("clockwise, negative", () => {
        const result = parseURI(
          "https://example.org/image-service/abcd1234/full/max/-1/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRotation",
              value: "-1",
              message: "The degree of rotation must be >= 0",
            },
          ],
        });
      });

      test("clockwise, 361 (too large)", () => {
        const result = parseURI(
          "https://example.org/image-service/abcd1234/full/max/361/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRotation",
              value: "361",
              message: "The degree of rotation must be <= 360",
            },
          ],
        });
      });

      test("clockwise, 360.00001 (too large)", () => {
        const result = parseURI(
          "https://example.org/image-service/abcd1234/full/max/360.00001/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          uri: "https://example.org/image-service/abcd1234/full/max/360.00001/default.jpg",
          errors: [
            {
              tag: "badRotation",
              value: "360.00001",
            },
          ],
        });
      });

      test("clockwise, NaN", () => {
        const result = parseURI(
          "https://example.org/image-service/abcd1234/full/max/bingo/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRotation",
              value: "bingo",
            },
          ],
        });
      });

      test("mirrored, missing", () => {
        const result = parseURI(
          "https://example.org/image-service/abcd1234/full/max/!/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRotation",
              value: "!",
            },
          ],
        });
      });

      test("mirrored, negative", () => {
        const result = parseURI(
          "https://example.org/image-service/abcd1234/full/max/!-1/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRotation",
              value: "!-1",
            },
          ],
        });
      });

      test("mirrored, 361 (too large)", () => {
        const result = parseURI(
          "https://example.org/image-service/abcd1234/full/max/!361/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRotation",
              value: "!361",
            },
          ],
        });
      });

      test("mirrored, 360.00001 (too large)", () => {
        const result = parseURI(
          "https://example.org/image-service/abcd1234/full/max/!360.00001/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRotation",
              value: "!360.00001",
            },
          ],
        });
      });

      test("mirrored, NaN", () => {
        const result = parseURI(
          "https://example.org/image-service/abcd1234/full/max/!bingo/default.jpg"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "badRotation",
              value: "!bingo",
            },
          ],
        });
      });
    });
  });
});
