import type { NextPage } from "next";
import { MDXRemote } from "next-mdx-remote";
import getMdx from "../utils/getMdx";
import Meta from "../components/Meta";
import Hero from "../components/CTA/Hero";

const Home: NextPage | any = ({ source }: { source: any }) => {
    return (
        <>
            <Meta />
            <Hero />
            <article className='prose lg:prose-xl prose-headings:pt-0  max-w-3xl mx-auto px-4 my-9'>
                <MDXRemote {...source} />
            </article>
        </>
    );
};

export default Home;

export async function getStaticProps() {
    const mdxSource = await getMdx("content", "index");

    return { props: { source: mdxSource } };
}
