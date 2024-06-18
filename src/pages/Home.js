import { useEffect, useState } from 'react';
import { generateClient } from "aws-amplify/api";
import ArticlesList from '../components/ArticlesList';
import AddArticleForm from '../components/AddArticleForm';
import { listPosts } from '../graphql/queries'

const client = generateClient();

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [isAddArticleVisible, setIsAddArticleVisible] = useState(false);

    const loadArticles = async () => {
        const { data } = await client.graphql(
            { query: listPosts, authMode: 'apiKey' }
        );
        setArticles(data.listPosts.items);
    }

    const onArticleAdded = (isAdded) => {
        if (isAdded)
            loadArticles();

        setIsAddArticleVisible(false);
    }

    useEffect(() => {
        loadArticles();
    }, []);

    return (
        <>
            <div className='artile-title'>
                <h1>Articles</h1>
                {!isAddArticleVisible && <button onClick={() => setIsAddArticleVisible(true)}>Add</button>}
            </div>
            {
                isAddArticleVisible ?
                    <AddArticleForm articleAdded={isAdded => onArticleAdded(isAdded)} />
                    : <ArticlesList articles={articles} />
            }
        </>
    );
}

export default Home;
