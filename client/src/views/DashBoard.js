import React from "react";
import { useState, useEffect, useContext } from "react";
import { PostContext } from "../contexts/PostContext";
import { Navigate } from "react-router-dom";
import NavbarMenu from "../components/layout/Navbar";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import Col from "react-bootstrap/Col";
import addIcon from "../assets/plus-circle-fill.svg";
import SinglePost from "../components/layout/SinglePost";

const DashBoard = () => {
  const appUserName = localStorage.getItem("appUserName");
  //context and get all posts data from postReducer.js
  const {
    postState: { posts, postsLoading },
    getPosts,
  } = useContext(PostContext);
  console.log(posts);
  // Start: Get all posts
  useEffect(() => getPosts, []);
  let body = null;
  console.log(posts.length);
  if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">
            Hi, {appUserName.toLocaleUpperCase()}
          </Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Asalala</Card.Title>
            <Card.Text>
              A journey of a thousand miles begins with a single step - Lao Tzu
            </Card.Text>
            <Button
              variant="primary"
              //   onClick={setShowAddPostModal.bind(this, true)}
            >
              Add your first learning skill here
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post.post_id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/* Open Add Post Modal */}
        <OverlayTrigger
          placement="left"
          //overlay <Tooltip> when hover on the button
          overlay={<Tooltip>Add a new thing to learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            //   onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }
  //--------------------------------------------------/

  //check if user is logged in
  const username = localStorage.getItem("appUserName");
  // console.log(username)
  if (username === "undefined" || username === null) {
    alert("Invalid username or password");
    localStorage.removeItem("appUserName");
    return <Navigate to="/login" />;
  }
  //--------------------------------------------------/

  return (
    <>
      <NavbarMenu />
      <div className="container">
        <div> "" </div>
        <h5>
          Recommend either "LEARNED", "LEARNING", or "NEXT" to update learning
          progress's status
        </h5>
        {body}
      </div>
    </>
  );
};

export default DashBoard;
