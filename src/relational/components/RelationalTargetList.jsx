import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import GenericStaticView from './SubtlyEditableItem/staticViews'
import templates from 'tcomb-form-templates-bootstrap'

function collect(connect, monitor){
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}


const targetActions = {
  drop({insertReference, ordering}, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverKey = ordering;

    /* Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }*/

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    /* Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (hoverClientY > hoverMiddleY) {
      return;
      }*/
    ordering = hoverKey + (hoverClientY > hoverMiddleY ? 1 : 0)

    // Time to actually perform the action
    insertReference({reference: dragIndex, ordering});
  }
}

class ListItemWrapper extends React.Component{
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool
  }

  render() {
    const { children, canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    return connectDropTarget(<li>{children || (<div>Add new item</div>)}</li>)
  }

}

function referenceInserter({ value, items, onChange, path, typeInfo: {type: {meta: kind}}}){
    let keys = items.map(i => i.key)
    function insertReference({reference, ordering}){
        let change = value.slice(0)
        change.splice(ordering, 0, reference)
        onChange(change, keys, path, kind)
    }
    return insertReference
}

function buildTargetListTemplate(ItemTemplate){
    let TargetList = templates.list.clone({
        renderRow(row, locals){
            let { index } = row.input.props.value
            let { ref } = row.input
            return (
                <ItemTemplate key={ref} ordering={ref} index={index} insertReference={referenceInserter(locals)}>
                    {row.input}
                </ItemTemplate>
            )
        },
        renderAddButton: locals => (
            <ItemTemplate ordering={locals.value.length} insertReference={referenceInserter(locals)}/>
        )
    })
    return TargetList
}

export function childTemplate(template){
    return (...args) => {
        let { inputs } = args[0]
        return (
            <div>
                <div style={{display: 'none'}}>
                    { Object.keys(inputs).map(k => inputs[k]) }
                </div>
                {template(...args)}
            </div>
        )
    }
}

export default function buildRelationalTargetList(dragKey){
    return buildTargetListTemplate(DropTarget(dragKey, targetActions, collect)(ListItemWrapper))
}
