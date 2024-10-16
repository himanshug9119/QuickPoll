const mockComments = [
    {
      id: 'c1',
      text: 'This is an insightful poll. Thanks for sharing!',
      isReply: false,
      timestamp: '2024-07-25T12:34:56',
      likes: 5,
      username: 'alice_j',
      replies: [
        {
          id: 'r1-1',
          text: 'I agree! The topic is very relevant.',
          isReply: true,
          timestamp: '2024-07-25T13:00:00',
          likes: 2,
          username: 'bob_smith',
          replies: [
            {
              id: 'r1-1-1',
              text: 'Yes, especially in current times.',
              isReply: true,
              timestamp: '2024-07-25T13:15:00',
              likes: 1,
              username: 'carol_white',
            },
          ],
        },
      ],
    },
    {
      id: 'c2',
      text: 'I think the options could be more diverse.',
      isReply: false,
      timestamp: '2024-07-26T09:15:30',
      likes: 3,
      username: 'david_b',
      replies: [
        {
          id: 'r2-1',
          text: 'True, but it still covers the main perspectives.',
          isReply: true,
          timestamp: '2024-07-26T09:45:12',
          likes: 1,
          username: 'frank_w',
          replies: [],
        },
        {
          id: 'r2-2',
          text: 'Maybe a follow-up poll could include more options.',
          isReply: true,
          timestamp: '2024-07-26T10:15:00',
          likes: 0,
          username: 'grace_lee',
          replies: [],
        },
      ],
    },
    {
      id: 'c3',
      text: 'Can you add more options to the poll?',
      isReply: false,
      timestamp: '2024-07-26T10:30:00',
      likes: 0,
      username: 'eva_green',
      replies: [],
    },
    {
      id: 'c4',
      text: 'The poll results are interesting, looking forward to more data.',
      isReply: false,
      timestamp: '2024-07-27T11:00:45',
      likes: 8,
      username: 'henry_kim',
      replies: [
        {
          id: 'r4-1',
          text: 'Yes, the results might change as more people vote.',
          isReply: true,
          timestamp: '2024-07-27T11:20:30',
          likes: 4,
          username: 'ivy_m',
          replies: [
            {
              id: 'r4-1-1',
              text: 'Exactly, it’s fascinating to see the trends.',
              isReply: true,
              timestamp: '2024-07-27T11:40:00',
              likes: 1,
              username: 'jack_lee',
            },
          ],
        },
      ],
    },
    {
      id: 'c5',
      text: 'I voted! Looking forward to seeing the results.',
      isReply: false,
      timestamp: '2024-07-27T12:15:20',
      likes: 6,
      username: 'alice_j',
      replies: [],
    },
    {
      id: 'c6',
      text: 'This comment section is great for discussion!',
      isReply: false,
      timestamp: '2024-07-28T08:30:00',
      likes: 10,
      username: 'bob_smith',
      replies: [
        {
          id: 'r6-1',
          text: 'Agreed, it’s nice to see everyone’s opinions.',
          isReply: true,
          timestamp: '2024-07-28T08:45:00',
          likes: 3,
          username: 'carol_white',
          replies: [],
        },
      ],
    },
    {
      id: 'c7',
      text: 'Could you provide more context on the poll topic?',
      isReply: false,
      timestamp: '2024-07-28T09:00:00',
      likes: 2,
      username: 'david_b',
      replies: [
        {
          id: 'r7-1',
          text: 'There’s a link in the description with more details.',
          isReply: true,
          timestamp: '2024-07-28T09:15:00',
          likes: 1,
          username: 'eva_green',
          replies: [],
        },
      ],
    },
    {
      id: 'c8',
      text: 'I think we should have more polls like this.',
      isReply: false,
      timestamp: '2024-07-28T10:00:00',
      likes: 7,
      username: 'frank_w',
      replies: [],
    },
    {
      id: 'c9',
      text: 'Great poll! It’s sparking some good conversations.',
      isReply: false,
      timestamp: '2024-07-28T11:00:00',
      likes: 4,
      username: 'grace_lee',
      replies: [
        {
          id: 'r9-1',
          text: 'Definitely, it’s nice to see so many engaged participants.',
          isReply: true,
          timestamp: '2024-07-28T11:30:00',
          likes: 2,
          username: 'jack_lee',
          replies: [],
        },
      ],
    },
    {
      id: 'c10',
      text: 'I’m curious to see how the results evolve.',
      isReply: false,
      timestamp: '2024-07-28T12:00:00',
      likes: 3,
      username: 'henry_kim',
      replies: [],
    },
  ];
  
  export default mockComments;
  