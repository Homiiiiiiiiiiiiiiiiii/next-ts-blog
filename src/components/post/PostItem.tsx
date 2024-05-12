import { Post } from '@/types/types'
import Link from 'next/link'
import styles from '@/styles/Post.module.css'
import { useState } from 'react'

interface PostProps {
    post: Post
}

const PostItem = ({post}: PostProps) => {
  return (
    <div className={styles.post}>
        <h2 className={styles.postTitle}>
            <Link href={`/post/${post.id}`}>{post.title} </Link>
        </h2>
        <p className={styles.postContent}>{post.content}</p>
        <div>
        <ul  className={styles.postTags}>
            {/* 태그가 있을 경우에만 map() 돌림 */}
            {post.tags?.map((tag, index)=>(
                <li key={index}>{tag}</li>
            ))}
        </ul>
        </div>
        <div className={styles.postDate}>{post.date}</div>
    </div>
  )
}

export default PostItem
