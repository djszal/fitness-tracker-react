import React from "react";

const Update = ({ posts, setPosts, setPostID }) => {
  const [title, setTitle] = useState([]);
  const [body, setBody] = useState([]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const token = window.localStorage.getItem("strange-token");
    const response = await fetch(
      `https://strangers-things.herokuapp.com/api/${posts}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "Application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          body,
        }),
      }
    );
    const data = await response.json();
    if (data && data.title) {
      const newPosts = posts.map((post) => {
        if (post.id === postId) {
          return data;
        } else {
          return post;
        }
      });
      setPosts(newPosts);
      setTitle("");
      setBody("");
      setPostID(null);
    }
  };

  return (
    <>
      <h3>Update a Post</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="title" value={title} />
      </form>
    </>
  );
};

export default Update;
