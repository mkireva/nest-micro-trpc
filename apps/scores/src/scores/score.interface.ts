import { CreateScoreRequest } from './dto/create-score-reuqest';

export interface Score extends CreateScoreRequest {
  id: string;
}
