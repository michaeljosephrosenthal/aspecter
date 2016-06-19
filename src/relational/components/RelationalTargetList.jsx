import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

@DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class TargetList extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastDroppedItem: PropTypes.object,
    onDrop: PropTypes.func.isRequired
  };

  render() {
    const { accepts, isOver, canDrop, connectDropTarget, lastDroppedItem, itemView, value } = this.props;
    const isActive = isOver && canDrop;

    return connectDropTarget(
      <div>
          {cards.map((card, i) => {
              return (
              <Card key={card.id}
                  index={i}
                  id={card.id}
                  text={card.text}
                  moveCard={this.moveCard} />
              );
          })}
      </div>
    );
  }
}
