import React from "react";
import { useContext } from "react";
import{PostContext} from "../../contexts/PostContext";
import Button from "react-bootstrap/Button";



const ActionButton = ({ url, post_id }) => {
  const { deletePost, findPost, setShowUpdatePostModal } =
    useContext(PostContext);
  const choosePost = postId => {
		findPost(postId)
		setShowUpdatePostModal(true)
	}
  return (
    <div>
      <Button
        className="btn btn-outline-primary post-button"
        href={`${url}`}
        target="_blank"
      >
        <span className="card-icon">
          <i className="bi bi-globe2"></i>
        </span>
      </Button>
      <Button
        className="btn btn-outline-primary post-button"
        onClick={() => { choosePost(post_id) }}

      >
        <span className="card-icon">
          <i className="bi bi-pencil"></i>
        </span>
      </Button>
      <Button className="post-button" onClick={()=>deletePost(post_id)}>
        <span className="card-icon">
          <i className="bi bi-trash3 trash-icon"></i>
        </span>
      </Button>
    </div>
  );
};

export default ActionButton;
