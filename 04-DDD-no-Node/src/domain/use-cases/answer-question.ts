import { Answer } from '../entities/answer.js'

interface AnswerQuestionUseCaseRequest {
  intructorId: string
  questionId: string
  content: string
}
export class AnswerQuestionUseCase {
  execute({ intructorId, questionId, content }: AnswerQuestionUseCaseRequest) {
    const answer = new Answer(content)

    return answer
  }
}
