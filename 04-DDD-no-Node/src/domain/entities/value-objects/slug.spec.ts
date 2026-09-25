import { describe, expect, it } from 'vitest'
import { Slug } from './slug.ts'

describe('Slug Class', () => {
  it('should be able to create a new slug from text', () => {
    const slug = Slug.createFromText('Example question # TITLE @-')

    expect(slug.value).toBe('example-question-title')
  })
})
