'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddTopic() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const t = title.trim()
    const d = description.trim()
    if (!t || !d) {
      alert('Title and description are required.')
      return
    }
    if (submitting) return

    try {
      setSubmitting(true)
      const res = await fetch('/api/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: t, description: d }),
        cache: 'no-store',
      })

      if (!res.ok) {
        const msg = await res.text().catch(() => '')
        throw new Error(msg || 'Failed to create a topic')
      }

      router.push('/')
      router.refresh()
    } catch (err) {
      console.error(err)
      alert('Failed to create a topic')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        className="border border-slate-500 p-4"
        type="text"
        placeholder="Topic Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        disabled={submitting}
      />
      <textarea
        className="border border-slate-500 p-4 h-32"
        placeholder="Topic Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        disabled={submitting}
      />
      <button
        className="bg-green-800 text-white font-bold px-6 py-3 w-fit rounded-md disabled:opacity-60"
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
      >
        {submitting ? 'Adding...' : 'Add Topic'}
      </button>
    </form>
  )
}
