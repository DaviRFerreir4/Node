import { Entity } from '@/core/entities/entity.ts'
import type { Slug } from './value-objects/slug.ts'

interface QuestionProps {
  title: string
  slug: Slug
  content: string
  authorId: string
}

export class Question extends Entity<QuestionProps> {}
