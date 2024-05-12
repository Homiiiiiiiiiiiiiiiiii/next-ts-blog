import { Post } from '@/types/types'
import React from 'react'

interface PostProps {
    post:Post
}

const PostDetail = ({post}: PostProps) => {
  return (
    <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>{post.author}</p>
        <p>{post.date}</p>
        <ul>
            {post.tags && post.tags.map((tag, index)=>(
                <li key={index}>{tag}</li>
            ))}
        </ul>
    </div>
  )
}

export default PostDetail