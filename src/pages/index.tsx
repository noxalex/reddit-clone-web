import NavBar from '../components/NavBar';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../generated/graphql';

const Index = () => {
  // with SSR it's going to load Posts on the server side and
  // then it will show the page and we are not gonna get loading indicator
  const [{ data }] = usePostsQuery();

  return (
    <>
      <NavBar />

      <div></div>
      <div>Hello next.js</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => <div>{post.title}</div>)
      )}
    </>
  );
};

// this sets up urql provider around component instead of whole app
// if we want ssr we should use ssr: true
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
