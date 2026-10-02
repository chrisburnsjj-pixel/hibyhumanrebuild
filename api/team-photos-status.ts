export default function handler(req: any, res: any) {
  res.status(200).json({
    boardroom: {
      webp: true,
      png: true,
      original: true,
    },
    production: {
      webp: true,
      png: true,
      original: true,
    },
  });
}
