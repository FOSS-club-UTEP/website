import '../global.css'
import './BlogPostTemplate.css'

import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ArticleCard from '../components/ArticleCard/ArticleCard'

const ArticleBody = (props: { data: any, children?: any }) => {
  const { frontmatter } = props.data.markdownRemark
  let img = getImage(frontmatter.featuredImage?.childImageSharp?.gatsbyImageData)
  return (
    <div className="article-layout">
      <div className="article-layout__matter">
        <div className="article-layout__matter__meta">
          <h3 className="date">{frontmatter.date}</h3>
          <h2>{frontmatter.title}</h2>
          <h3 className="subtitle">{frontmatter.subtitle}</h3>
          <h3 className="author">
            {
              frontmatter.author.map((author: string, i: number) => {
                if (i == frontmatter.author.length - 1) {
                  return author
                }
                return author + ", "
              })
            }
          </h3>
        </div>
        <GatsbyImage image={img} />
        <div id="inner-html" dangerouslySetInnerHTML={{
          __html: props.data.markdownRemark.html
        }} />
      </div>
      { props.children }
      <div className="article-layout__recc">
        {
          (props.data.previous !== null || props.data.next !== null) ?
            (<h3> Read More </h3>) : null
        }
        <div className="article-layout__recc__articles">
          {
            (props.data.previous !== null) ? (
              <ArticleCard data={props.data.previous.frontmatter} />
            ) : null
          }
          {
            (props.data.next !== null) ? (
              <ArticleCard data={props.data.next.frontmatter} />
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

export default function BlogPostTemplate(props: { data: any }) {
  return (
    <Layout>
      <ArticleBody data={props.data}>
      </ArticleBody>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        author
        subtitle
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 1200)
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      id
      html
      frontmatter {
        title
        subtitle
        author
        date(formatString: "MMMM DD, YYYY")
        slug
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 300)
          }
        }
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      id
      html
      frontmatter {
        title
        subtitle
        author
        date(formatString: "MMMM DD, YYYY")
        slug
        featuredImage {
          childImageSharp {
            gatsbyImageData(width: 300)
          }
        }
      }
    }
  }
`
