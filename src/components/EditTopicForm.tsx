'use client'

import { updateTopic } from '@/actions/topicActions'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface EditTopicFormProps {
  id: string
  initialTitle: string
  initialDescription: string
}

export default function EditTopicForm({
  id,
  initialTitle,
  initialDescription,
}: EditTopicFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await updateTopic(id, title, description)
      router.push('/') // 수정 후 메인 페이지로 이동
    } catch (error) {
      console.error('토픽 수정 중 오류:', error)
      alert('토픽 수정 중 오류가 발생했습니다.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Title"
        className="border border-slate-300 px-4 py-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="border border-slate-300 px-4 py-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-blue-500 text-white font-bold px-4 py-2 rounded"
      >
        수정하기
      </button>
    </form>
  )
}
