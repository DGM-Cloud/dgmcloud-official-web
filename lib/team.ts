export type TeamMemberId =
  | 'diego'
  | 'mario'
  | 'george'
  | 'gabriel'
  | 'sebastian';

export type TeamMember = {
  id: TeamMemberId;
  name: string;
  /** Portrait path under /public — optional until photos are added */
  photo: string | null;
  github: string;
  linkedin: string;
  portfolio: string | null;
};

export const teamMembers: TeamMember[] = [
  {
    id: 'diego',
    name: 'Diego Huincho',
    photo: '/team/diego.png',
    github: 'https://github.com/DiegoHLZ',
    linkedin: 'https://www.linkedin.com/in/diego-huincho-b4619028b/',
    portfolio: 'https://diegohlz.github.io/Portafolio/',
  },
  {
    id: 'mario',
    name: 'Mario Prado',
    photo: '/team/mario.png',
    github: 'https://github.com/mariopvdev',
    linkedin: 'https://www.linkedin.com/in/mariopradovargas',
    portfolio: null,
  },
  {
    id: 'george',
    name: 'George Galván',
    photo: '/team/george.png',
    github: 'https://github.com/GeorgeGC23',
    linkedin: 'https://www.linkedin.com/in/george-galv%C3%A1n-cerr%C3%B3n/',
    portfolio: null,
  },
  {
    id: 'gabriel',
    name: 'Gabriel Bernal',
    photo: '/team/gabriel.png',
    github: 'https://github.com/GabbrM',
    linkedin: 'https://linkedin.com/in/gabbrm/',
    portfolio: null,
  },
  {
    id: 'sebastian',
    name: 'Sebastián Ramírez',
    photo: '/team/sebastian.png',
    github: 'https://github.com/yorusaurio',
    linkedin: 'https://www.linkedin.com/in/saramirezdev/',
    portfolio: 'https://sebrm.dev',
  },
];
