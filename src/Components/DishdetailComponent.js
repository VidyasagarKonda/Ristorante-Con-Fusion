import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../Shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

const DishDetail = (props) => {
  console.log(props.dish);
  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to={'/menu'}>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className='row'>
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
};

function RenderDish({ dish }) {
  return (
    <div className='col-12 col-md-5 m-1'>
      <FadeTransform
        in
        transformProps={{
          exitTransform: 'scale(0.5) translateY(-50%)',
        }}
      >
        <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

function RenderComments({ comments, postComment, dishId }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleSubmit(values) {
    toggleModal();
    postComment(dishId, values.rating, values.author, values.comment);
  }

  if (comments == null) {
    return <div></div>;
  }
  const cmnts = comments.map((comment) => {
    return (
      <Fade in>
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author} , &nbsp;
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            }).format(new Date(comment.date))}
          </p>
        </li>
      </Fade>
    );
  });

  return (
    <div className='col-12 col-md-5 m-1'>
      <h4> Comments </h4>
      <ul className='list-unstyled'>
        <Stagger in>{cmnts}</Stagger>
      </ul>
      <Button outline onClick={toggleModal}>
        <span className='fa fa-pencil fa-lg'></span>
        Submit Comment
      </Button>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Submit content</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Row className='form-group'>
              <Label htmlFor='rating' md={12}>
                Rating
              </Label>
            </Row>
            <Row className='form-group'>
              <Col md={12}>
                <Control.select
                  model='.rating'
                  className='form-control'
                  name='rating'
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Col>
            </Row>
            <Row className='form-group'>
              <Label htmlFor='author' md={12}>
                Your Name
              </Label>
            </Row>
            <Row className='form-group'>
              <Col md={12}>
                <Control.text
                  model='.author'
                  id='author'
                  name='author'
                  placeholder='Your Name'
                  className='form-control'
                  validators={{
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className='text-danger'
                  model='.author'
                  show='touched'
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 characters',
                    maxLength: 'Must be 15 characters or less',
                  }}
                />
              </Col>
            </Row>
            <Row className='form-group'>
              <Label htmlFor='comment' md={2}>
                Comment
              </Label>
            </Row>
            <Row className='form-group'>
              <Col md={12}>
                <Control.textarea
                  model='.comment'
                  type='textarea'
                  id='message'
                  name='message'
                  rows='6'
                  className='form-control'
                />
              </Col>
            </Row>
            <Row className='form-group'>
              <Col>
                <Button type='submit' color='primary'>
                  Submit
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DishDetail;
