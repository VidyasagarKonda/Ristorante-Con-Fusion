import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDishDetail: this.props.dsdetail,
    };
  }

  renderComments(comments) {
    if (comments == null) {
      return <div></div>;
    }
    const cmnts = comments.map((comment) => {
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author}, &nbsp;
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            }).format(new Date(comment.date))}
          </p>
        </li>
      );
    });
    return (
      <div className='col-12 col-md-5 m-1'>
        <h4> Comments </h4>
        <ul className='list-unstyled'>{cmnts}</ul>
      </div>
    );
  }

  render() {
    console.log(this.props.dish);
    if (this.props.dish == null) {
      return <div></div>;
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-5 m-1'>
            <Card>
              <CardImg
                width='100%'
                src={this.props.dish.image}
                alt={this.props.dish.name}
              />
              <CardBody>
                <CardTitle> {this.props.dish.name}</CardTitle>
                <CardText> {this.props.dish.description} </CardText>
              </CardBody>
            </Card>
          </div>
          {this.renderComments(this.props.dish.comments)}
        </div>
      </div>
    );
  }
}

export default DishDetail;
