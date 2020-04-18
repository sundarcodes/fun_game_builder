export interface IQuestion {
  id: string;
  word_urls: Array<string>;
  answer_url: string;
  actual_word: string;
  category: string;
}

export interface ICategory {
  category: string;
  questions: Array<IQuestion>;
}

// export type ICategoryList = Array<ICategory>;
