export const REQUEST_ARTICLES = 'REQUEST_ARTICLES';

let newData = [
  {
    "id": 0,
    "content": "## This is a title new 1"
  },
  {
    "id": 1,
    "content": "## This is a title new  2"
  },
  {
    "id": 2,
    "content": "## This is a title new  3"
  }
]

export function command_updateSection() {
  return {
      type : REQUEST_ARTICLES,
      sections: newData
  }
}
