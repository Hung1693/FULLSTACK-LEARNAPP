import React from "react";
import { useContext, useState } from "react";
import { PostContext } from "../../contexts/PostContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddPostModal() {
  const { showAddPostModal, setShowAddPostModal, addPost, getPosts } =
    useContext(PostContext);

  //add state for add post form
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const { title, description, url, status } = newPost;
  const onChangeNewPostForm = (event) => {
    console.log(event.target.value);
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };
  //when click outside modal, close modal and clear form
  const resetAddPostData = () => {
    setNewPost({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddPostModal(false);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostData();
  };

  return (
    //onHide to close modal when you click outside the modal
    <Modal show={showAddPostModal} onHide={resetAddPostData}>
      <Modal.Header closeButton>
        <Modal.Title>Great! Your step begins here</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Control
              type="text"
              placeholder="Website's URL"
              name="url"
              value={url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetAddPostData}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add to dashboard
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddPostModal;
