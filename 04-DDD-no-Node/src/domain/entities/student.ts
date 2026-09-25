import { Entity } from '@/core/entities/entity.ts'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {}
