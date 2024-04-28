const expertise = [
  {
    id: 0,
    title: "X",
    desc: "X",
  },
  {
    id: 1,
    title: "X",
    desc: "X",
  },
  {
    id: 2,
    title: "X",
    desc: "X",
  },
  {
    id: 3,
    title: "X",
    desc: "X",
  },
  {
    id: 4,
    title: "X",
    desc: "X",
  },
];

export default function handler(req, res) {
  res.status(200).json(expertise);
}
