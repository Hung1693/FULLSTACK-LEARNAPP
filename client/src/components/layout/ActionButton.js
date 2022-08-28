import React from "react";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import youtube from "../../assets/youtube.svg";

const ActionButton = ({ url, post_id }) => {
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
        href={url}
        target="_blank"
      >
        <span className="card-icon">
          <i className="bi bi-pencil"></i>
        </span>
      </Button>
      <Button className="post-button" href={url} target="_blank">
        <span className="card-icon">
          <i className="bi bi-trash3 trash-icon"></i>
        </span>
      </Button>
    </div>
  );
};

export default ActionButton;
