import { describe, expect, test } from "@jest/globals";

import { parseURI } from "../lib/index.js";

describe("parse Image Information Request URI", () => {
  describe("sunny day", () => {
    test.each([
      "https://example.org/image-service/abcd1234/info.json",
      "    https://example.org/image-service/abcd1234/info.json",
      "https://example.org/image-service/abcd1234/info.json    ",
      "   https://example.org/image-service/abcd1234/info.json          ",
    ])("vanilla URI", (uri) => {
      const result = parseURI(uri);

      expect(result).toMatchObject({
        tag: "imageInformationRequest",
        uri: uri.trim(),
        scheme: "https",
        server: {
          host: "example.org",
          port: undefined,
        },
        prefix: "/image-service",
        identifier: "abcd1234",
      });
    });

    test("with explicit port", () => {
      const result = parseURI(
        "https://example.org:80/image-service/abcd1234/info.json"
      );

      expect(result).toMatchObject({
        tag: "imageInformationRequest",
        uri: "https://example.org:80/image-service/abcd1234/info.json",
        scheme: "https",
        server: {
          host: "example.org",
          port: "80",
        },
        prefix: "/image-service",
        identifier: "abcd1234",
      });
    });

    test("with no prefix; prefix is optional", () => {
      const result = parseURI("https://example.org/abcd1234/info.json");

      expect(result).toMatchObject({
        tag: "imageInformationRequest",
        uri: "https://example.org/abcd1234/info.json",
        scheme: "https",
        server: {
          host: "example.org",
          port: undefined,
        },
        prefix: undefined,
        identifier: "abcd1234",
      });
    });

    test("with two-section prefix", () => {
      const result = parseURI(
        "https://example.org/image-service/iiif/abcd1234/info.json"
      );

      expect(result).toMatchObject({
        tag: "imageInformationRequest",
        uri: "https://example.org/image-service/iiif/abcd1234/info.json",
        scheme: "https",
        server: {
          host: "example.org",
          port: undefined,
        },
        prefix: "/image-service/iiif",
        identifier: "abcd1234",
      });
    });

    test("with encoded identifier", () => {
      const result = parseURI(
        "https://example.org/image-service/ark%3A%2F53355%2Fcl010066723/info.json"
      );

      expect(result).toMatchObject({
        tag: "imageInformationRequest",
        uri: "https://example.org/image-service/ark%3A%2F53355%2Fcl010066723/info.json",
        scheme: "https",
        server: {
          host: "example.org",
          port: undefined,
        },
        prefix: "/image-service",
        identifier: "ark:/53355/cl010066723",
      });
    });

    test("superfluous query parameters are (silently) discarded", () => {
      const result = parseURI(
        "https://example.org/image-service/abcd1234/info.json?name=foo&age=24"
      );

      expect(result).toMatchObject({
        tag: "imageInformationRequest",
        uri: "https://example.org/image-service/abcd1234/info.json",
        scheme: "https",
        server: {
          host: "example.org",
          port: undefined,
        },
        prefix: "/image-service",
        identifier: "abcd1234",
      });
    });
  });

  describe("rainy day", () => {
    test("missing identifier", () => {
      const result = parseURI("https://example.org/info.json");

      expect(result).toMatchObject({
        tag: "error",
        uri: "https://example.org/info.json",
        errors: [
          {
            tag: "malformedPath",
            value: "/info.json",
          },
        ],
      });
    });

    test("unsupported scheme", () => {
      const result = parseURI("ftp://example.org/abcd1234/info.json");

      expect(result).toMatchObject({
        tag: "error",
        uri: "ftp://example.org/abcd1234/info.json",
        errors: [
          {
            tag: "unsupportedScheme",
            value: "ftp",
            message: "The only supported schemes are http and https",
          },
        ],
      });
    });

    test("unsupported scheme and missing identifier", () => {
      const result = parseURI("ftp://example.org/info.json");

      expect(result).toMatchObject({
        tag: "error",
        uri: "ftp://example.org/info.json",
        errors: [
          {
            tag: "unsupportedScheme",
            value: "ftp",
            message: "The only supported schemes are http and https",
          },
          {
            tag: "malformedPath",
            value: "/info.json",
            message: "Missing <prefix>/identifier",
          },
        ],
      });
    });

    describe("malformed URI", () => {
      test("missing scheme", () => {
        const result = parseURI("://example.org/image-service/info.json");

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "malformedURI",
              value: "://example.org/image-service/info.json",
            },
          ],
        });
      });

      test("bad port 'FOO'", () => {
        const result = parseURI(
          "https://example.org:FOO/image-service/info.json"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "malformedURI",
              value: "https://example.org:FOO/image-service/info.json",
            },
          ],
        });
      });

      test("bad port '-1'", () => {
        const result = parseURI(
          "https://example.org:-1/image-service/info.json"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "malformedURI",
              value: "https://example.org:-1/image-service/info.json",
            },
          ],
        });
      });

      test("bad port '65536'", () => {
        const result = parseURI(
          "https://example.org:65536/image-service/info.json"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "malformedURI",
              value: "https://example.org:65536/image-service/info.json",
            },
          ],
        });
      });

      test("bad port '33.5'", () => {
        const result = parseURI(
          "https://example.org:33.5/image-service/info.json"
        );

        expect(result).toMatchObject({
          tag: "error",
          errors: [
            {
              tag: "malformedURI",
              value: "https://example.org:33.5/image-service/info.json",
            },
          ],
        });
      });
    });
  });
});
