import { withAuth } from 'lib/withAuth';

export default withAuth(() => {
  return <h1>You shouldn't see me if not logged in</h1>;
});
