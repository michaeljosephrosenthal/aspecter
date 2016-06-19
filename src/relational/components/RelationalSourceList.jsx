import React from 'react'
import { DragSource } from 'react-dnd'
import GenericStaticView from './SubtlyEditableItem/staticViews'

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const sourceActions = {
  beginDrag(props) {
      return {index: props.index}
  }
}

function collect(connect, monitor){
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging()
    }
}

class ListItemWrapper extends React.Component{
    render() {
        // Your component receives its own props as usual
        const { children, index } = this.props;

        // These two props are injected by React DnD,
        // as defined by your `collect` function above:
        const { isDragging, connectDragSource } = this.props;

        return connectDragSource(<li>{children}</li>)
    }
}

function buildSourceListTemplate(ItemTemplate){
    function SourceList({value=[], options: {item: {staticTemplate: Template=GenericStaticView, ...itemOpts}={}}}){
        return (
            <ul>
                {value.map((v, key) => (
                    <ItemTemplate index={key} key={key}>
                        <Template value={v} options={itemOpts}/>
                    </ItemTemplate>
                ))}
            </ul>
        )
    }
    return SourceList
}

export default function buildRelationalSourceList(dragKey){
    return buildSourceListTemplate(DragSource(dragKey, sourceActions, collect)(ListItemWrapper))
}
