import PostsPreviewList from '../../components/posts-preview-list/posts-preview-list';
import { useAppSelector } from '../../hooks/hooks';
import { selectUserPosts } from '../../store/posts-slice/posts-slice';

function UserPosts(): JSX.Element {
  const posts = useAppSelector(selectUserPosts);

  return (
    <main className="container">
      <h1 className="title">posts</h1>

      <PostsPreviewList posts={posts} />
    </main>
  );
}

export default UserPosts;
