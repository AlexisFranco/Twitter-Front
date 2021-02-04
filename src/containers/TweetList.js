import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Hook
import Tweet from '../components/Tweet';
import API from '../api';

function TweetList() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  async function loadList() {
    try {
      const data = await API.getTweets();
      setList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadList();
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  function onSelected(e, id) {
    history.push(`tweets/${id}`);
  }
  return (
    <div>
      {list.map((item) => {
        const { _id, content = '', user = {}, createdAt = '' } = item;
        const date = new Date(createdAt).toDateString();
        return (
          <Tweet
            key={_id}
            id={_id}
            content={content}
            user={user}
            date={date}
            onSelected={onSelected}
          />
        );
      })}
    </div>
  );
}

export default TweetList;
