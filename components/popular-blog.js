import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Link from 'next/link';

export default function PopularPost({
    posts
}) {
    let popularPosts = posts && posts.slice(0, 3)
    console.log("popular page", popularPosts)
    return (
        <section>
            <div className="px-10">
                <div className="popular-header pt-20 pb-8">
                    <h1 className="text-4xl font-bold">Popular</h1>
                </div>
                <div className="popular-body">
                    {popularPosts && popularPosts.map((item, index) =>
                        <Link href={`/posts/${item.node.slug}`}>
                            <div className="flex pt-8 pb-8" style={{
                                borderBottom: '1px solid #ebebeb'
                            }}>
                                <div className="grid">
                                    <span className="text-[24px] text-[#3c3c3c] mb-3">{item.node.title}</span>
                                    <span className="text-[14px] text-[#8d8888]">{item.node.categories.edges[0].node.name}</span>
                                </div>
                                <div>
                                    <span><ArrowForwardIcon style={{
                                        fontSize: '25px !important',
                                        marginTop: '10px',
                                        fontWeight: '500'
                                    }} /></span>
                                </div>
                            </div>
                        </Link>
                    )}

                </div>
            </div>
        </section>
    )
}
