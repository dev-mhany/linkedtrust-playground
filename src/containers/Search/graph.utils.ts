const isValidUrl = (urlString: string) => {
  let inputElement = document.createElement('input')
  inputElement.type = 'url'
  inputElement.value = urlString

  return inputElement.checkValidity()
}

const getLabel = (uri: any) => {
  if (isValidUrl(uri)) {
    if (uri.hostname === 'trustclaims.whatscookin.us') {
      return decodeURIComponent(uri.pathname.split('/').pop())
    }
    return `Host:\n${uri.origin}\n\nPath:\n${uri.pathname}`
  } else {
    return uri
  }
}

const parseClaims = (claims: any) => {
  const elements: any[] = []

  claims.forEach((claim: any) => {
    if (claim.subject) {
      let uri: any
      if (isValidUrl(claim.subject)) uri = new URL(claim.subject)
      else uri = claim.subject

      const label = getLabel(uri)

      elements.push({
        data: {
          id: claim.subject,
          label: label
        },
        style: { shape: 'round-rectangle' }
      })
    }

    if (claim.object) {
      let uri: any
      if (isValidUrl(claim.object)) uri = new URL(claim.object)
      else uri = claim.object

      const label = getLabel(uri)

      elements.push({
        data: {
          id: claim.object,
          label: label
        },
        style: { shape: 'round-rectangle' }
      })
    }

    if (claim.subject && claim.object)
      elements.push({
        data: {
          id: claim.id,
          source: claim.subject,
          target: claim.object,
          relation: claim.claim
        }
      })
  })
  return elements
}

const parseMultipleNodes = (data: any) => {
  const nodes: any[] = []
  const edges: any[] = []

  data.forEach((node: any) => {
    parseSingleNode(nodes, edges, node)
  })
  return { nodes, edges }
}

const getNodeData = (node: any) => {
  let uri = node.nodeUri

  interface NodeData {
    data: {
      id: string
      label: string
    }
    style?: {
      [key: string]: any
    }
  }

  let label = node.name || uri
  if (label === 'Not Acceptable!' || label === 'Not Acceptable') {
    console.log('Node name is ' + node.name)
    label = ''
  }

  const calculatedWidth = label.length < 17 ? 72 : 'label'

  const nodeData: NodeData = {
    data: {
      id: node.id.toString(),
      label: label.substring(0, 42)
    },
    style: {
      shape: 'round-rectangle',
      'background-color': '#3E5348',
      width: calculatedWidth,
      height: 72,
      color: '#ecf0f1',
      'font-weight': 'bold',
      'text-halign': 'center',
      'text-valign': 'center',
      'text-wrap': 'wrap',
      'padding-left': '10px',
      'padding-right': '10px',
      'padding-top': '10px',
      'padding-bottom': '10px',
      'border-width': '2px',
      'border-color': '#3E5348'
    }
  }

  if (node.image) {
    nodeData.style = {
      ...nodeData.style,
      'background-image': [node.image.replace(/\?.+$/, '')],
      'background-fit': 'cover cover',
      'background-image-opacity': 1.0
    }
  } else if (node.thumbnail) {
    nodeData.style = {
      ...nodeData.style,
      'background-image': [node.thumbnail.replace(/\?.+$/, '')],
      'background-fit': 'cover cover',
      'background-image-opacity': 0.4
    }
  }
  return nodeData
}

const parseSingleNode = (nodes: {}[], edges: {}[], node: any) => {
  if (node.name && node.nodeUri) {
    const nodeData = getNodeData(node)
    nodes.push(nodeData)
  }

  if (node.edgesFrom) {
    node.edgesFrom.map((e: any) => {
      if (nodes.findIndex((n: any) => n.data.id === e.endNode.id.toString()) > -1) return

      const nodeData = getNodeData(e.endNode)
      nodes.push(nodeData)
    })

    edges.push(
      ...node.edgesFrom.map((e: any) => ({
        data: {
          id: e.id,
          source: e.startNodeId,
          target: e.endNodeId,
          relation: e.label,
          raw: e
        }
      }))
    )
  }

  if (node.edgesTo) {
    node.edgesTo.map((e: any) => {
      if (nodes.findIndex((n: any) => n.data.id === e.startNode.id.toString()) > -1) return

      const nodeData = getNodeData(e.startNode)
      nodes.push(nodeData)
    })

    edges.push(
      ...node.edgesTo.map((e: any) => ({
        data: {
          id: e.id,
          source: e.endNodeId,
          target: e.startNodeId,
          relation: e.label,
          raw: e
        }
      }))
    )
  }

  return { nodes, edges }
}

export { parseClaims, parseMultipleNodes, parseSingleNode }
