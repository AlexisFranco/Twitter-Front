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
        return <Tweet key={item.id} onSelected={onSelected} {...item} />;
      })}
    </div>
  );
}

export default TweetList;
