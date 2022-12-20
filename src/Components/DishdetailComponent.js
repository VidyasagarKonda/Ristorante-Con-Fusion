import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import React, { useState } from 'react';

export default function DishDetail(props) {
  const [selectedDish, setSelectedDishe] = useState(null);

  function onDishSelect(dish) {
    setSelectedDishe(dish);
  }
  function renderDish(dish) {
    if (dish != null) {
      return (
        <div className='col-12 col-md-5 m-1'>
          <Card>
            <CardImg width='100' src={props.image} alt={props.name} />
            <CardBody>
              <CardTitle heading='true'>{props.name}</CardTitle>
              <CardText>{props.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  function renderComments(dish) {
    if (dish != null) {
      return (
        <div className='col-12 col-md-5 m-1'>
          <CardBody>
            <h1>Comments</h1>
            {comments}
          </CardBody>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  const comments = props.comments?.map((comment) => {
    return (
      <div key={comment.id} className='row'>
        <h3>{comment.comment}</h3>
        <p>
          --{comment.author} ,{' '}
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }).format(new Date(Date.parse(comment.date)))}
        </p>
      </div>
    );
  });

  return (
    <div className='container'>
      {/* <div className='row'>
        <div key={props.id} className='col-12 col-md-5 m-1'>
          <Card onClick={() => onDishSelect(props.id)}>
            <CardImg width='100' src={props.image} alt={props.name} />

            <CardImgOverlay>
              <CardTitle heading='true'>{props.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      </div> */}
      <div className='row'>
        <div className='col-12 col-md-5 m-1'>
          <Card>
            <CardImg width='100' src={props.dish.image} alt={props.dish.name} />
            <CardBody>
              <CardTitle heading='true'>{props.dish.name}</CardTitle>
              <CardText>{props.dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
        {/* {renderComments()} */}
      </div>
    </div>
  );
}
