import { AnswerQuestionUseCase } from './answer-question.js'
import { describe, expect, it } from 'vitest'

describe('create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase()
  it('should create a question', async () => {
    const answer = await answerQuestionUseCase.execute({
      intructorId: '1',
      questionId: '1',
      content: 'Test Answer',
    })

    expect(answer.content).toBe('Test Answer')
  })
})
