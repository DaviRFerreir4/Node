import type { AnswersRepository } from '../repositories/answers-repository.ts'
import { AnswerQuestionUseCase } from './answer-question.js'
import { describe, expect, it } from 'vitest'

describe('Answer Question', async () => {
  const fakeAnswersRepository: AnswersRepository = {
    create: async (answer) => {},
  }

  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository)
  it('should create a question', async () => {
    const answer = await answerQuestionUseCase.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Test Answer',
    })

    expect(answer.content).toBe('Test Answer')
  })
})
