/* WashList demo data */

const PLAYLISTS = [
  { id: 'liked',  name: 'Liked Songs',         count: 1284, hours: '92h',  glyph: '♥',  color: ['#5EFFA8','#6FE8FF'], updated: '2 days ago' },
  { id: 'drive',  name: 'Night Drive',         count: 287,  hours: '19h',  glyph: 'ND', color: ['#B89CFF','#6FE8FF'], updated: '5 days ago' },
  { id: 'focus',  name: 'Deep Focus',          count: 156,  hours: '11h',  glyph: 'DF', color: ['#5EFFA8','#B89CFF'], updated: 'today' },
  { id: 'sun',    name: 'Sunday Mornings',     count: 94,   hours: '6h',   glyph: 'SM', color: ['#FFC369','#FF8B7A'], updated: 'last week' },
  { id: 'gym',    name: 'Gym, again',          count: 212,  hours: '14h',  glyph: 'G2', color: ['#FF8B7A','#5EFFA8'], updated: '3 days ago' },
  { id: 'old',    name: 'Old Habits',          count: 318,  hours: '22h',  glyph: 'OH', color: ['#6FE8FF','#B89CFF'], updated: '2 weeks ago' },
  { id: 'sad',    name: 'Sad sad sad',         count: 73,   hours: '4h',   glyph: 'S3', color: ['#B89CFF','#FF8B7A'], updated: 'today' },
  { id: 'jazz',   name: 'Late Night Jazz',     count: 184,  hours: '12h',  glyph: 'LJ', color: ['#FFC369','#5EFFA8'], updated: 'last month' },
  { id: 'misc',   name: 'Discover misc',       count: 521,  hours: '36h',  glyph: 'DM', color: ['#5EFFA8','#FFC369'], updated: 'yesterday' },
];

const STAGES = [
  { id: 1, title: 'Reading playlists',     desc: 'Pulling tracks via Spotify API',     duration: 0.8 },
  { id: 2, title: 'Normalizing metadata',  desc: 'Lowercase, strip remaster tags',     duration: 1.0 },
  { id: 3, title: 'Building fingerprints', desc: 'ISRC + title + duration + artists',  duration: 1.4 },
  { id: 4, title: 'Comparing tracks',      desc: '2 847 × 2 847 pairwise distance',    duration: 2.2 },
  { id: 5, title: 'Detecting duplicates',  desc: 'Cluster by confidence threshold',    duration: 1.0 },
  { id: 6, title: 'Preparing results',     desc: 'Sort by score, generate previews',   duration: 0.6 },
];

const CLUSTERS = [
  {
    id: 'c1',
    status: 'exact', // exact | probable | possible | related | review
    confidence: 99.4,
    reason: 'Same ISRC · identical fingerprint',
    a: { title: 'Midnight Drive — Extended', artist: 'Hiroshi Kawai', album: 'Neon Atlas',           duration: '4:32', added: '2023', isrc: 'JPK112301', cover: ['#5EFFA8','#6FE8FF'] },
    b: { title: 'Midnight Drive — Extended', artist: 'Hiroshi Kawai', album: 'Neon Atlas (Deluxe)',  duration: '4:32', added: '2025', isrc: 'JPK112301', cover: ['#B89CFF','#5EFFA8'] },
    diff: ['album'],
  },
  {
    id: 'c2',
    status: 'probable',
    confidence: 88.2,
    reason: 'Title 96% · same artist · duration ±3s',
    a: { title: 'Northbound',         artist: 'Cale Atlas',   album: 'Drift',           duration: '3:48', added: '2022', isrc: 'USX442211', cover: ['#5EFFA8','#B89CFF'] },
    b: { title: 'Northbound (2024 Remaster)', artist: 'Cale Atlas', album: 'Drift — Anniversary', duration: '3:51', added: '2024', isrc: 'USX442283', cover: ['#6FE8FF','#B89CFF'] },
    diff: ['title','album','duration'],
  },
  {
    id: 'c3',
    status: 'related',
    confidence: 71.8,
    reason: 'Same title + artist, different duration — likely remix',
    a: { title: 'Slow Tide',                 artist: 'Aria Vey',         album: 'Singles',   duration: '3:42', added: '2023', isrc: 'GBX442331', cover: ['#B89CFF','#6FE8FF'] },
    b: { title: 'Slow Tide — Foux Remix',    artist: 'Aria Vey, Foux',   album: 'Remix EP',  duration: '5:18', added: '2024', isrc: 'GBX442889', cover: ['#FFC369','#FF8B7A'] },
    diff: ['title','artist','album','duration'],
  },
  {
    id: 'c4',
    status: 'review',
    confidence: 63.4,
    reason: 'Title 78% · artist match · 1:12 duration gap',
    a: { title: 'Velvet Sky',          artist: 'Mira Lune',  album: 'After Light',  duration: '4:02', added: '2021', isrc: 'DEH112201', cover: ['#FF8B7A','#FFC369'] },
    b: { title: 'Velvet Skies',        artist: 'Mira Lune',  album: 'After Light',  duration: '5:14', added: '2022', isrc: 'DEH112255', cover: ['#5EFFA8','#FF8B7A'] },
    diff: ['title','duration'],
  },
  {
    id: 'c5',
    status: 'possible',
    confidence: 56.1,
    reason: 'Artist set overlaps · title fuzzy 64%',
    a: { title: 'Lavender Letter',     artist: 'Soft Static',  album: 'Bedroom Tapes', duration: '2:48', added: '2020', isrc: 'GBX221101', cover: ['#6FE8FF','#5EFFA8'] },
    b: { title: 'A Letter, In Lavender', artist: 'Soft Static, Iri', album: 'Tape III', duration: '3:14', added: '2024', isrc: 'GBX221809', cover: ['#FFC369','#B89CFF'] },
    diff: ['title','artist','album','duration'],
  },
  {
    id: 'c6',
    status: 'exact',
    confidence: 97.8,
    reason: 'Same ISRC across two playlists',
    a: { title: 'Tinder Box',  artist: 'Junewave', album: 'Phase Two',  duration: '3:21', added: '2023', isrc: 'SEK998211', cover: ['#5EFFA8','#6FE8FF'] },
    b: { title: 'Tinder Box',  artist: 'Junewave', album: 'Phase Two',  duration: '3:21', added: '2025', isrc: 'SEK998211', cover: ['#B89CFF','#5EFFA8'] },
    diff: [],
  },
];

const HISTORY = [
  { when: '11:42 today',  what: 'Library scan',     detail: '2 847 tracks · 42 dupes · 11 review', count: '42', kind: 'mint'  },
  { when: 'Yesterday',    what: 'Removed dupe',     detail: '"Northbound (2024 Remaster)" → kept original', count: '−1', kind: 'coral' },
  { when: '2 days ago',   what: 'Playlist compared',detail: 'Night Drive ↔ Deep Focus — 38 overlaps',  count: '38', kind: 'cyan' },
  { when: '3 days ago',   what: 'Library scan',     detail: '2 803 tracks · 39 dupes · 6 review',  count: '39', kind: 'mint'  },
  { when: 'Last week',    what: 'Marked related',   detail: '"Slow Tide — Foux Remix" — keep both',   count: '+1', kind: 'violet'},
  { when: '2 weeks ago',  what: 'Library scan',     detail: '2 760 tracks · 47 dupes · 14 review', count: '47', kind: 'mint'  },
];

// Graph nodes/edges: playlists connected by shared track count
const GRAPH = {
  nodes: [
    { id: 'liked', name: 'Liked Songs',     size: 60, c: '#5EFFA8' },
    { id: 'drive', name: 'Night Drive',     size: 38, c: '#6FE8FF' },
    { id: 'focus', name: 'Deep Focus',      size: 28, c: '#B89CFF' },
    { id: 'sun',   name: 'Sunday Mornings', size: 22, c: '#FFC369' },
    { id: 'gym',   name: 'Gym, again',      size: 32, c: '#FF8B7A' },
    { id: 'old',   name: 'Old Habits',      size: 40, c: '#5EFFA8' },
    { id: 'sad',   name: 'Sad sad sad',     size: 18, c: '#B89CFF' },
    { id: 'jazz',  name: 'Late Night Jazz', size: 26, c: '#FFC369' },
    { id: 'misc',  name: 'Discover misc',   size: 46, c: '#5EFFA8' },
  ],
  edges: [
    ['liked','drive', 38, 'shared'],
    ['liked','focus', 24, 'shared'],
    ['liked','gym',   29, 'shared'],
    ['liked','old',   52, 'shared'],
    ['liked','jazz',  18, 'shared'],
    ['liked','misc',  41, 'shared'],
    ['drive','focus', 14, 'shared'],
    ['drive','gym',    8, 'shared'],
    ['drive','old',   22, 'shared'],
    ['focus','jazz',  12, 'shared'],
    ['sun','jazz',     9, 'shared'],
    ['sad','sun',      6, 'shared'],
    ['gym','misc',    11, 'shared'],
    ['old','misc',    18, 'related'],
  ],
};

// Status meta
const STATUS_META = {
  exact:    { tag: 'mint',    label: 'Exact duplicate',  short: 'Exact'    },
  probable: { tag: 'mint',    label: 'Probable duplicate', short: 'Probable' },
  possible: { tag: 'cyan',    label: 'Possible match',   short: 'Possible' },
  related:  { tag: 'violet',  label: 'Related version',  short: 'Related'  },
  review:   { tag: 'amber',   label: 'Needs review',     short: 'Review'   },
};

window.WashListData = { PLAYLISTS, STAGES, CLUSTERS, HISTORY, GRAPH, STATUS_META };
