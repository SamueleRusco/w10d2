import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = (props) => {
  // state = {
  //   comment: {
  //     comment: "",
  //     rate: 1,
  //     elementId: this.props.asin,
  //   },
  // };
  const [comment, setcomment] = useState("");
  const [rate, setrate] = useState(1);
  const [elementId, setelementId] = useState(props.asin);

  // componentDidUpdate(prevProps) {
  //   if (prevProps.asin !== this.props.asin) {
  //     this.setState({
  //       comment: {
  //         ...this.state.comment,
  //         elementId: this.props.asin,
  //       },
  //     });
  //   }

  useEffect(() => {
    if (elementId !== props.asin) {
      setcomment(comment);
      setelementId(props.asin);
    }
  });

  const sendComment = async (e) => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify(comment),
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2ViOGZmN2IyODU2YjAwMTMyYTcxZjgiLCJpYXQiOjE2NzYzODIyMDAsImV4cCI6MTY3NzU5MTgwMH0.nNrxjM-c2y82qc_Y0IuESVjRpJ6AJWRf8B4eQGHqrv8",
          },
        }
      );
      if (response.ok) {
        alert("Comment was sent!");

        setelementId(props.asin);
        setcomment("");
        setrate(1);
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  <div className="my-3">
    <Form onSubmit={sendComment}>
      <Form.Group>
        <Form.Label>Comment text</Form.Label>
        <Form.Control
          type="text"
          placeholder="Add comment here"
          value={comment}
          onChange={(e) => setcomment(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <Form.Control
          as="select"
          value={rate}
          onChange={(e) => setrate(e.target.value)}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>;
};

export default AddComment;
