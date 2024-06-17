import { useState, useEffect } from 'react';
import { generateClient } from "aws-amplify/api";
import { useParams, useNavigate } from 'react-router-dom';
import { getPost } from '../graphql/queries';
import { deletePost } from '../graphql/mutations';
import AddArticleForm from '../components/AddArticleForm';

const client = generateClient();

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({});
    const [isUpdateArticleVisible, setIsUpdateArticleVisible] = useState(false);
    const { articleId } = useParams();
    const navigate = useNavigate();

    const loadArticleInfo = async () => {
        const { data } = await client.graphql(
            { query: getPost, variables: { id: articleId }, authMode: 'apiKey' }
        );
        setArticleInfo(data.getPost);
    }

    const editArticleVisible = () => {
        setIsUpdateArticleVisible(true);
    }

    const onArticleUpdated = (isAdded) => {
        if(isAdded)
            loadArticleInfo();

        setIsUpdateArticleVisible(false);
    }

    const onDeleteArticle = async () =>{
        const { data } = await client.graphql(
            { query: deletePost, variables: {input:{ id: articleId }}, authMode: 'apiKey' }
        );
        navigate("/");
    }

    const onCancelArticle = async () =>{
        navigate("/");
    }

    useEffect(() => {
        loadArticleInfo();
    }, []);

    return (
        <>
            {
                isUpdateArticleVisible ?
                    <AddArticleForm articleInfo={articleInfo} articleAdded={isAdded => onArticleUpdated(isAdded)} />
                    : <div>
                        <h1>{articleInfo.title}</h1>
                        <p>{articleInfo.body}</p>
                    </div>
            }
            {!isUpdateArticleVisible && <button onClick={editArticleVisible}>Edit</button>}
            {!isUpdateArticleVisible && <button onClick={onDeleteArticle}>Delete</button>}
            {!isUpdateArticleVisible && <button onClick={onCancelArticle}>Cancel</button>}

        </>
    );
}

export default ArticlePage;