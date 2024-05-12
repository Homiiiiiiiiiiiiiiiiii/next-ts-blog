import { addDocument } from '@/firebase/firestore'
import React, { useState } from 'react'

const NewPage = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (title.trim() === '' || content.trim() === '') {
      alert('제목과 내용을 입력하세요!')
      return
    }
    
    try {
      await addDocument('posts', {title,content})
      alert('새 게시물 추가되었습니다!')
      setTitle('')
      setContent('')
    } catch (error) {
      console.error('게시물 추가 중 오류발생:', error)
      alert('게시물  추가에 실패했습니다.')
    }
  }


  return (
    <div>
      <h1>게시물 추가하기</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목: </label>
          <input type="text" id='text' name='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="content">내용: </label>
          <textarea name="contnetn" id="content" value={content} onChange={(e) => setContent(e.target.value)}/>
        </div>
        <button type='submit'>추가하기</button>
      </form>
    </div>
  )
}

export default NewPage