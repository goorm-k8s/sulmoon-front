import { useState } from "react";

import constate from 'constate';

function useQuestions() {
  const [questions, setQuestions] = useState();

  return { questions, setQuestions };
}

export const [QuestionsProvider, useQuestionsContext] = constate(useQuestions);
