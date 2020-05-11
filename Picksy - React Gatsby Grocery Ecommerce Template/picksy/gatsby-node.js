require('ts-node').register({ files: true });
const path = require(`path`);
var fs = require('fs');
var dir = './.cache/caches/gatsby-source-prismic-graphql';

exports.onPreBootstrap = () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

/** @type { import("gatsby").GatsbyNode["createPages"] } */
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            handle
          }
        }
      }
    }
  `).then((result) => {
    result.data.allShopifyCollection.edges.forEach(({ node }) => {
      createPage({
        path: `/collection/${node.handle}/`,
        component: path.resolve(`./src/templates/category-page.tsx`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
        },
      });
    });
  });
};
