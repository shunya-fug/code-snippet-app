import { CodeSnippet } from "@prisma/client";

const snippets: CodeSnippet[] = [
  {
    id: 1,
    title: "Hello, World!",
    description: "The classic introductory program.",
    code: 'console.log("Hello, World!");',
    language: "JavaScript",
    tags: "beginner",
    createdAt: new Date("2022-04-01T00:00:00Z"),
    updatedAt: new Date("2022-04-01T00:00:00Z"),
  },
  {
    id: 2,
    title: "FizzBuzz",
    description: "A popular interview question.",
    code: `for (let i = 1; i <= 100; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        console.log('FizzBuzz');
      } else if (i % 3 === 0) {
        console.log('Fizz');
      } else if (i % 5 === 0) {
        console.log('Buzz');
      } else {
        console.log(i);
      }
    }`,
    language: "JavaScript",
    tags: "beginner, interview",
    createdAt: new Date("2022-04-02T00:00:00Z"),
    updatedAt: new Date("2022-04-02T00:00:00Z"),
  },
];
