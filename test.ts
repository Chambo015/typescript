const enum Status {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  DELETED = 'deleted',
}

async function getFaqs(req: { topicId: number; status?: Status }): Promise<
  {
    question: string;
    answer: string;
    tags: string[];
    likes: number;
    status: Status;
  }[]
> {
  const res = await fetch('/faqs', {
    method: 'POST',
    body: JSON.stringify(req),
  });
  const data = await res.json();
  return data;
}


function foo(obj: { status: Status }): {
  status: Status;
}[] {
  let arr = [obj];
  return arr;
}

console.log(foo({ status: Status.DELETED }));