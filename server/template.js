import manifest from "../public/manifest.json";

export default function template({
  helmet,
  content = "",
  bundles,
  state = {},
}) {

  const scripts = `
    <script src="/${manifest["vendor.js"]}"></script>
    <script src="/${manifest["client.js"]}"></script>
  `;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="/assets/logos/favicon.ico" type="image/x-icon">
  </head>
  <body>
    <div id="app">${content}</div>
    <script>window.__STATE__ = ${JSON.stringify(state)}</script>
    ${bundles
      .map(bundle => {
        if (/js\.map$/g.test(bundle.file)) {
          return null;
        } else {
          return `<script src='/${bundle.file}'></script>`;
        }
      })
      .join("\n")}
    ${scripts}
  </body>
`;
}
