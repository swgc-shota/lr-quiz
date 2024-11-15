import van from 'vanjs-core';
const { svg, path, g } = van.tags('http://www.w3.org/2000/svg');

export const SpeechIcon = () =>
  svg(
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 -960 960 960',
      fill: '#5f6368',
    },
    path({
      d: 'M640-440v-80h160v80H640Zm48 280-128-96 48-64 128 96-48 64Zm-80-480-48-64 128-96 48 64-128 96ZM120-360v-240h160l200-200v640L280-360H120Zm280-246-86 86H200v80h114l86 86v-252ZM300-480Z',
    })
  );

export const TrashIcon = () =>
  svg(
    {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 -960 960 960',
    },
    path({
      d: 'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z',
    })
  );
