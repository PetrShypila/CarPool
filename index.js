import app from './app';
import colors from 'colors';

const port = process.env.PORT || 3000;

console.log('Starting app in dev mode...'.green);

app.listen(port, function (err) {
  if (err) {
    throw err
  }

  console.log(`server is listening on ${port}...`.blue);
});
