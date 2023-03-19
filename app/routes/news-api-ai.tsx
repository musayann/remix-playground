import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function headers({
    loaderHeaders,
    parentHeaders,
}: {
    loaderHeaders: Headers;
    parentHeaders: Headers;
}) {
    console.log(
        "This is an example of how to set caching headers for a route, feel free to change the value of 60 seconds or remove the header"
    );
    return {
        // This is an example of how to set caching headers for a route
        // For more info on headers in Remix, see: https://remix.run/docs/en/v1/route/headers
        "Cache-Control": "public, max-age=60, s-maxage=60",
    };
}

export async function loader() {
    const res = await fetch(" https://newsapi.org/v2/top-headlines?country=us&apiKey="+process.env.NEWS_API_KEY);
    return json(await res.json());
}


export default function NewsAPIAI() {
    const { articles } = useLoaderData<typeof loader>();
    return (
        <main style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
            <div>
                {articles.map((article: any) => (
                    <div key={article.title}>

                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}
