export const DEFAULT_HEADERS = [
    {
        title: 'What Went Well',
        catId: 1
    },
    {
        title: "What Didn't Go Well",
        catId: 2
    },
    {
        title: 'Learned',
        catId: 3
    },
    {
        title: 'Action Items',
        catId: 4
    },
];

export const DEFAULT_RETROS = {
    1: [
      {
        id: 101,
        catId: 1,
        title: 'Successful Cyber 5 without any bugs!',
        description: 'No description provided'
      },
      {
        id: 102,
        catId: 1,
        title: 'Quck turnaround on service options QA work',
        description: 'Tight feedback loop, e.g, finding divergent behavior on LSB'
      }
    ],
    2: [
        {
            id: 201,
            catId: 2,
            title: 'test title',
            description: 'd'
        }
    ],
    3: [
      {
        id: 301,
        catId: 3,
        title: 'Last minute decoupling requests',
        description: "The decoupling organizers invited PMs to an office hours and then told them there about some tasks that needed to be done. Many engineers didn't go and didn't find out until day of."
      },
      {
        id: 302,
        catId: 3,
        title: 'Joint offer did not get turned on before cyber 5',
        description: 'No description provided'
      }
    ],
    4: [
      {
        id: 401,
        catId: 4,
        title: 'Standalone ATC broke without us being alerted until after it happend',
        description: 'No description provided'
      }
    ],
  }

export const EMOJIS = ['🍻', '😻', '💡', '🤔', '🔥', '🏁', '🦖', '⭐', '🌈']
