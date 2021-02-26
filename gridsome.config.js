// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const marked = require("marked");
// const yaml = require('js-yaml')

module.exports = {
  siteUrl: "https://blog.jalenchuh.cn",
  siteName: "Jalen's Blog",
  siteDescription: "爱折腾的少年",

  templates: {
    Post: "/posts/:slug",
    Tag: "/tag/:id",
    Category: "/category/:id",
  },

  plugins: [
    {
      // Create posts from markdown files
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "Post",
        path: "content/posts/*.md",
        refs: {
          // Creates a GraphQL collection from 'tags' in front-matter and adds a reference.
          tags: {
            typeName: "Tag",
            create: true,
          },
          cate: {
            typeName: "Category",
            create: true,
          },
        },
      },
    },
    {
      use: "@microflash/gridsome-plugin-feed",
      options: {
        contentTypes: ["Post"],
        feedOptions: {
          title: "Jalen's Blog",
          description: "少年的我",
        },
        rss: {
          enabled: true,
          output: "/atom.xml",
        },
        htmlFields: ["description", "content"],
        enforceTrailingSlashes: false,
        filterNodes: (node) => node.published,
        nodeToFeedItem: (node) => ({
          title: node.title,
          date: node.date,
          content: marked(node.content),
        }),
      },
    },
    {
      use: "@gridsome/plugin-google-analytics",
      options: {
        id: "UA-172941976-1",
      },
    },
    {
      use: "@gridsome/plugin-sitemap",
    },
  ],

  transformers: {
    //Add markdown support to all file-system sources
    remark: {
      useBuiltIns: true,
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      slug: true,
      autolinkHeadings: true,
      autolinkClassName: "icon icon-link",
      plugins: [
        "gridsome-plugin-remark-container",
        "gridsome-remark-katex",
        ["@gridsome/remark-prismjs", { showLineNumbers: true }],
      ],
      config: {
        footnotes: true,
      },
    },
  },
};
