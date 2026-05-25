/* WashList — icons (inline SVG) */
const { createElement: h } = React;

const svg = (paths, opts = {}) => (props) => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', ...opts, ...props }, ...paths);

const Icons = {
  Library:  svg([h('path', {key:1, d:'M4 5h4v14H4zM10 5h4v14h-4zM16 5l5 14'})]),
  Scan:     svg([h('circle',{key:1, cx:12, cy:12, r:9}), h('path',{key:2, d:'M12 3v18M3 12h18'})]),
  Dupes:    svg([h('circle',{key:1, cx:9, cy:9, r:4}), h('circle',{key:2, cx:15, cy:15, r:4}), h('path',{key:3, d:'M11.5 11.5L13 13'})]),
  Compare:  svg([h('path',{key:1, d:'M5 4v16M19 4v16M5 8h14M5 16h14'})]),
  Graph:    svg([h('circle',{key:1, cx:6, cy:6, r:2.5}), h('circle',{key:2, cx:18, cy:6, r:2.5}), h('circle',{key:3, cx:12, cy:18, r:2.5}), h('path',{key:4, d:'M7.8 7.8l3 8.6M16.2 7.8l-3 8.6M8.5 6h7'})]),
  History:  svg([h('circle',{key:1, cx:12, cy:12, r:9}), h('path',{key:2, d:'M12 7v5l3 2'})]),
  Settings: svg([h('circle',{key:1, cx:12, cy:12, r:3}), h('path',{key:2, d:'M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z'})]),
  Search:   svg([h('circle',{key:1, cx:11, cy:11, r:7}), h('path',{key:2, d:'M21 21l-4-4'})]),
  Sun:      svg([h('circle',{key:1, cx:12, cy:12, r:4}), h('path',{key:2, d:'M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'})]),
  Moon:     svg([h('path',{key:1, d:'M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z'})]),
  Play:     svg([h('path',{key:1, d:'M6 4l14 8-14 8V4z', fill:'currentColor', stroke:'none'})]),
  Pause:    svg([h('rect',{key:1, x:6,y:5,width:4,height:14}), h('rect',{key:2, x:14,y:5,width:4,height:14})]),
  Stop:     svg([h('rect',{key:1, x:5,y:5,width:14,height:14, rx:2})]),
  Arrow:    svg([h('path',{key:1, d:'M5 12h14M13 6l6 6-6 6'})]),
  Check:    svg([h('path',{key:1, d:'M5 12l5 5L20 7'})]),
  X:        svg([h('path',{key:1, d:'M6 6l12 12M18 6l-12 12'})]),
  Split:    svg([h('path',{key:1, d:'M6 4v6c0 1 1 2 2 2h8c1 0 2 1 2 2v6M6 4l-2 2M6 4l2 2M18 20l-2-2M18 20l2-2'})]),
  Merge:    svg([h('path',{key:1, d:'M6 4l6 7v9M18 4l-6 7M12 11h0'})]),
  Filter:   svg([h('path',{key:1, d:'M3 5h18l-7 8v6l-4-2v-4z'})]),
  Trash:    svg([h('path',{key:1, d:'M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12'})]),
  Heart:    svg([h('path',{key:1, d:'M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z'})]),
  Chev:     svg([h('path',{key:1, d:'M9 6l6 6-6 6'})]),
};

window.WashListIcons = Icons;
