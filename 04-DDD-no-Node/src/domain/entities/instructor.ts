import { Entity } from '@/core/entities/entity.ts'

interface InstructorProps {
  name: string
}

export class Instructor extends Entity<InstructorProps> {}
