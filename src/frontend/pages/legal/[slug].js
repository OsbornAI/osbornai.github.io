import Head from "next/head";
import fs from "fs";
import path from "path";
import style from "../../styles/Markdown.module.css";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

export default function Legal({ markdown, data }) {
    return (
        <div className="Legal">
            <Head>
                <title key="title">{data.title} - OsbornAI</title>
                <meta
                    name="description"
                    content={data.description}
                    key="description"
                />
                <meta name="keywords" content={data.keywords} key="keywords" />
                <meta name="author" content="OsbornAI" key="author" />

                <meta property="og:type" content="article" key="ogType" />
                <meta
                    property="og:title"
                    content={`${data.title} - OsbornAI`}
                    key="ogTitle"
                />
                <meta
                    property="og:description"
                    content={data.description}
                    key="ogDescription"
                />

                <meta
                    name="twitter:title"
                    content={`${data.title} - OsbornAI`}
                    key="twitterTitle"
                />
                <meta
                    name="twitter:description"
                    content={data.description}
                    key="twitterDescription"
                />
            </Head>
            <div className="container">
                <div className="container">
                    <div className="center">
                        <h1 style={{ fontWeight: 500 }}>{data.title}</h1>
                    </div>
                    <br />
                    <br />
                    <article className={style.markdown}>
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        >
                            {markdown}
                        </ReactMarkdown>
                    </article>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
}

export async function getStaticPaths() {
    const files = fs.readdirSync("legal");
    const paths = files.map((filename) => ({
        params: {
            slug: filename.replace(".md", ""),
        },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const markdown = fs
        .readFileSync(path.join("legal", slug + ".md"))
        .toString();
    const parsed_markdown = matter(markdown);

    return {
        props: {
            markdown: parsed_markdown.content,
            data: parsed_markdown.data,
        },
    };
}
