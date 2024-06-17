import { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { createPost, updatePost } from '../graphql/mutations';

const client = generateClient();

const AddArticleForm = ({ articleInfo, articleAdded }) => {
    const [title, setTitle] = useState(articleInfo?.title);
    const [body, setBody] = useState(articleInfo?.body);

    const addArticle = async () => {
        console.log(articleInfo)
        if (articleInfo) {
            console.log(articleInfo)
            const article = {
                id: articleInfo.id,
                title: title,
                body: body
            };
            const newTodo = await client.graphql({
                query: updatePost,
                variables: { input: article },
                authMode: 'apiKey'
            });
        }
        else {
            const article = {
                title: title,
                body: body
            };
            const newTodo = await client.graphql({
                query: createPost,
                variables: { input: article },
                authMode: 'apiKey'
            });
        }

        articleAdded(true);
    }
    const addArticleCancel = async () => {
        articleAdded(false);
    }

    return (
        <div id="add-comment-form">
            <h3>Title</h3>
            <textarea
                value={title}
                onChange={e => setTitle(e.target.value)}
                rows="1"
                cols="50" />
            <h3>Details</h3>
            <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                rows="12"
                cols="50" />
            <div id='add-comment-form-action'>
                <button onClick={addArticle}>{articleInfo? 'Update': 'Add Article'}</button>
                <button onClick={addArticleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default AddArticleForm;