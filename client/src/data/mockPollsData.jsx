export const mockPolls = [
  {
    id: 1,
    question: 'What is your favorite programming language?',
    options: ['JavaScript', 'Python', 'Java', 'C++'],
    createdBy: 'alice_j',
    answeredBy: [
      { user: 'alice_j', option: 0 },
      { user: 'bob_smith', option: 1 },
      { user: 'carol_white', option: 0 },
      { user: 'david_b', option: 2 },
      { user: 'eva_green', option: 3 },
      { user: 'frank_w', option: 1 },
      { user: 'grace_lee', option: 0 },
      { user: 'henry_kim', option: 3 },
      { user: 'ivy_m', option: 2 },
      { user: 'jack_lee', option: 0 },
    ],
    likedBy: ['alice_j', 'carol_white', 'grace_lee']
  },
  {
    id: 2,
    question: 'Which framework do you prefer?',
    options: ['React', 'Vue', 'Angular', 'Svelte'],
    createdBy: 'alice_j',
    answeredBy: [
      { user: 'alice_j', option: 0 },
      { user: 'carol_white', option: 1 },
      { user: 'eva_green', option: 2 },
      { user: 'grace_lee', option: 0 },
      { user: 'ivy_m', option: 1 },
    ],
    likedBy: ['eva_green', 'grace_lee']
  },
  {
    id: 3,
    question: 'What is the best time to code?',
    options: ['Morning', 'Afternoon', 'Night', 'Midnight'],
    createdBy: 'bob_smith',
    answeredBy: [
      { user: 'bob_smith', option: 0 },
      { user: 'david_b', option: 2 },
      { user: 'frank_w', option: 3 },
      { user: 'henry_kim', option: 1 },
      { user: 'jack_lee', option: 2 },
    ],
    likedBy: ['bob_smith', 'frank_w']
  },
  {
    id: 4,
    question: 'Which operating system do you use?',
    options: ['Windows', 'macOS', 'Linux', 'Other'],
    createdBy: 'carol_white',
    answeredBy: [
      { user: 'alice_j', option: 0 },
      { user: 'bob_smith', option: 1 },
      { user: 'david_b', option: 2 },
      { user: 'eva_green', option: 0 },
      { user: 'frank_w', option: 3 },
      { user: 'henry_kim', option: 2 },
      { user: 'ivy_m', option: 0 },
    ],
    likedBy: ['alice_j', 'eva_green', 'ivy_m']
  },
  {
    id: 5,
    question: 'What is your favorite cloud service provider?',
    options: ['AWS', 'Azure', 'Google Cloud', 'Other'],
    createdBy: 'carol_white',
    answeredBy: [
      { user: 'carol_white', option: 0 },
      { user: 'eva_green', option: 1 },
      { user: 'grace_lee', option: 2 },
      { user: 'ivy_m', option: 3 },
      { user: 'jack_lee', option: 0 },
    ],
    likedBy: ['carol_white', 'grace_lee']
  },
  {
    id: 6,
    question: 'Which version control system do you prefer?',
    options: ['Git', 'SVN', 'Mercurial', 'Other'],
    createdBy: 'david_b',
    answeredBy: [
      { user: 'alice_j', option: 0 },
      { user: 'david_b', option: 1 },
      { user: 'frank_w', option: 2 },
      { user: 'henry_kim', option: 0 },
      { user: 'jack_lee', option: 1 },
    ],
    likedBy: ['alice_j', 'henry_kim']
  },
  {
    id: 7,
    question: 'What is your favorite database?',
    options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
    createdBy: 'eva_green',
    answeredBy: [
      { user: 'alice_j', option: 0 },
      { user: 'bob_smith', option: 1 },
      { user: 'carol_white', option: 2 },
      { user: 'david_b', option: 3 },
      { user: 'eva_green', option: 0 },
      { user: 'grace_lee', option: 1 },
      { user: 'ivy_m', option: 2 },
      { user: 'jack_lee', option: 3 },
    ],
    likedBy: ['bob_smith', 'carol_white']
  },
  {
    id: 8,
    question: 'Which IDE do you use the most?',
    options: ['Visual Studio Code', 'IntelliJ IDEA', 'Sublime Text', 'Atom'],
    createdBy: 'eva_green',
    answeredBy: [
      { user: 'alice_j', option: 0 },
      { user: 'eva_green', option: 1 },
      { user: 'grace_lee', option: 2 },
      { user: 'ivy_m', option: 3 },
    ],
    likedBy: ['eva_green', 'grace_lee']
  },
  {
    id: 9,
    question: 'How do you prefer to deploy your applications?',
    options: ['Docker', 'Kubernetes', 'Heroku', 'Other'],
    createdBy: 'henry_kim',
    answeredBy: [
      { user: 'bob_smith', option: 0 },
      { user: 'david_b', option: 1 },
      { user: 'frank_w', option: 2 },
      { user: 'henry_kim', option: 3 },
      { user: 'jack_lee', option: 0 },
    ],
    likedBy: ['bob_smith', 'jack_lee']
  },
  {
    id: 10,
    question: 'Which mobile operating system do you prefer?',
    options: ['iOS', 'Android', 'Windows', 'Other'],
    createdBy: 'ivy_m',
    answeredBy: [
      { user: 'alice_j', option: 0 },
      { user: 'david_b', option: 1 },
      { user: 'frank_w', option: 2 },
      { user: 'henry_kim', option: 3 },
      { user: 'jack_lee', option: 0 },
    ],
    likedBy: ['david_b', 'jack_lee']
  },
];

export default mockPolls;
