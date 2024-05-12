import PostDetail from "@/components/post/PostDetail";
import { posts } from "@/data/posts";
import { type Post } from "@/types/types";
import { GetStaticPaths, GetStaticProps } from "next";

interface PostProps {
    post: Post
}

//동적 경로 생성 함수
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = posts.map((post)=> ({
        params: {id: post.id.toString()}
    }))
    return{paths, fallback: false}
}

//동적 데이터 생성 함수
export const getStaticProps: GetStaticProps<PostProps, {id:string}> = async ({params}) => {
    const post = posts.find((post) => post.id === Number(params?.id))

    if (!post) {
        return {notFound: true}
    }

    return{
        props: {post}
    }
}

const Post: React.FC<PostProps> = ({post}) => {
    return(
        <div>
            <h1>Post</h1>
            <PostDetail post={post}/>
        </div>
    )
}

export default Post

