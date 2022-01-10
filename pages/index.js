import Head from 'next/head'
import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import PopularBlog from '../components/popular-blog'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import { CMS_NAME } from '../lib/constants'

export default function Index({ allPosts: { edges }, preview }) {
  const heroPost = edges[0]?.node
  const morePosts = edges.slice(1)

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          
          <div className='mt-[0px] grid grid-cols-12 gap-16'>

            <div className='col-span-8'>

              {heroPost && (
                <HeroPost
                  title={heroPost.title}
                  coverImage={heroPost.featuredImage?.node}
                  date={heroPost.date}
                  author={heroPost.author?.node}
                  slug={heroPost.slug}
                  excerpt={heroPost.excerpt}
                />
              )}
            </div>
            <div className='col-span-4 bg-[#f9f9f9] rounded-3xl'>
              {heroPost && (
                <PopularBlog
                  posts={morePosts}
                />
              )}

            </div>
          </div>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview)
  return {
    props: { allPosts, preview },
  }
}
