import { Stylesheet, CytoscapeOptions, BaseLayoutOptions } from 'cytoscape'

const cyConfig = (containerRef: any): CytoscapeOptions => {
  const styles: Stylesheet[] = [
    {
      selector: 'node',
      style: {
        shape: 'round-rectangle',
        'background-color': '#3E5348',
        color: '#ecf0f1',
        label: 'data(label)',
        'font-weight': 'bold',
        'text-halign': 'center',
        'text-valign': 'center',
        'text-wrap': 'wrap',
        'font-size': '10px',
        'border-width': '2px',
        'border-color': '#3E5348',
        'padding-left': '10px',
        'padding-right': '10px',
        'padding-top': '10px',
        'padding-bottom': '10px'
      }
    },
    {
      selector: 'edge',
      style: {
        width: 4,
        'line-style': 'dashed',
        'line-color': '#009688',
        'target-arrow-shape': 'none',
        'curve-style': 'taxi', // Change curve style to straight to simplify the edges
        'line-dash-pattern': [10, 10],
        'line-cap': 'round',
        'font-size': '10px',
        'text-rotation': 'autorotate',
        'text-margin-x': 30,
        'source-endpoint': 'outside-to-node',
        'target-endpoint': 'outside-to-node'
      }
    }
  ]

  const layoutOptions: BaseLayoutOptions = {
    name: 'breadthfirst',
    fit: true, // whether to fit the viewport to the graph
    directed: true, // whether the tree is directed downwards
    padding: 30, // padding on fit
    circle: false, // put depths in concentric circles if true, put depths top down if false
    grid: true, // create an even grid into which the DAG is placed
    spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    roots: undefined, // the roots of the trees
    depthSort: undefined, // a sorting function to order nodes at equal depth. e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled

    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position) {
      return position
    } // transform a given node position
  }

  return {
    container: containerRef || undefined,
    boxSelectionEnabled: false,
    autounselectify: true,
    style: styles,
    layout: layoutOptions,
    wheelSensitivity: 0.2,
    minZoom: 0.1,
    maxZoom: 2,
    userZoomingEnabled: true,
    userPanningEnabled: true
  }
}

export default cyConfig
