import { Answer } from '../entities/answer.js'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}
export class AnswerQuestionUseCase {
  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer({ content, authorId: instructorId, questionId })

    return answer
  }
}
