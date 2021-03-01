import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    totalVotes: 100,
    title: 'Choice A'
  },
  {
    id: uuid(),
    totalVotes: 200,
    title: 'Choice B'
  },
  {
    id: uuid(),
    totalVotes: 300,
    title: 'Choice C'
  }
];
