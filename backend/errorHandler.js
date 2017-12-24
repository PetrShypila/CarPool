export default function (err, req, res, next) {
  res.status(err.status).json(err);
}
