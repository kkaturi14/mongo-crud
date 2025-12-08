'use client'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'
import RemoveBtn from './RemoveBtn'

interface Topic {
  _id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

interface TopicsListProps {
  topics: Topic[]
}

export default function TopicsList({ topics }: TopicsListProps) {
  if (!topics || topics.length === 0) {
    return <p>토픽이 없습니다.</p>
  }

  return (
    <>
      {topics.map((topic: Topic) => (
        <div
          key={topic._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="text-2xl font-bold">{topic.title}</h2>
            <div>{topic.description}</div>
            <div className="flex gap-4 text-sm text-slate-600 mt-2">
              <p>생성: {new Date(topic.createdAt).toLocaleDateString()}</p>
              <p>수정: {new Date(topic.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={topic._id} />
            <Link href={`/editTopic/${topic._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  )
}