import React, { useEffect, useState } from 'react'
import { posts } from '@/data/posts'
import PostItem from './PostItem'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { deleteDocument } from '@/firebase/firestore'
import PostEdit from './PostEdit'

interface Post{
  id: string
  title: string
  content: string
}

const PostList = () => {
  const [posts, setposts] = useState<Post[]>([])
  const [editingPostId, setEditingPostId] = useState<string | null>(null)

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(query(collection(db,'posts'), orderBy('title')))
    const postsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title:doc.data().title,
      content:doc.data().content
    }))
    setposts(postsData)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

    // 글 삭제
    const handleDelete = async (id: string) => {
      await deleteDocument('posts', id)
      fetchPosts() // 목록을 다시 불러옵니다.
  }

  // 글 편집 완료
  const handleUpdate = () => {
      setEditingPostId(null)
      fetchPosts() // 업데이트된 목록을 불러옵니다.
  }
  
  return (
    <div>
    <h2>Posts List</h2>
    {editingPostId ? (
        <PostEdit
            id={editingPostId}
            initialTitle={posts.find((post) => post.id === editingPostId)?.title ?? ''}
            initialContent={posts.find((post) => post.id === editingPostId)?.content ?? ''}
            onCancel={() => setEditingPostId(null)}
            onUpdate={handleUpdate}
        />
    ) : (
        <>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <button onClick={() => setEditingPostId(post.id)}>Edit</button>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No posts found.</p>
            )}
        </>
    )}
</div>
  )
}

export default PostList