import React from "react";

const Update = ({ posts, setPosts, postID, setPostID }) => {
    const [title, setTitle] = useState([]);
    const [body, setBody] = useState([]);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log('title, body: ', title, body);
        console.log('postId: ', postID);
        const token = window.localStorage.getItem("strange-token");
        const response = await fetch(`https://strangers-things.herokuapp.com/api/${posts}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'Application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                body,
            })
        });
        const data = await response.json();
        console.log('data: ', data);
        if (data && data.title) {
            const newPosts = posts.map(post => {
                if (post.id === postId) {
                    return data;
                } else {
                    return post;
                }
            });
            setPosts(newPosts);
            setTitle('');
            setBody('');
            setPostID(null);
        }
    }

    return <>
        <h3>
            Update a Post
        </h3>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="title" value={title} />
        </form>
    </>
}

export default Update;