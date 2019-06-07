import * as i3wm from 'i3wm';

type i3NodeType = 'root' | 'output' | 'con' | 'workspace' | 'dockarea' | string
type i3Layout = 'splith' | 'output' | 'dockarea' | 'tabbed' | 'default' | string

interface i3Geometry {
  x: number,
  y: number,
  width: number,
  height: number,
}

interface i3Node {
  id: number
  type: i3NodeType
  orientation: "horizontal"
  scratchpad_state: "none"
  percent: null
  urgent: false
  focused: false
  layout: i3Layout
  workspace_layout: i3Layout
  last_split_layout: i3Layout
  border: "normal"
  current_border_width: -1
  rect: i3Geometry
  deco_rect: i3Geometry
  window_rect: i3Geometry
  geometry: i3Geometry
  name: 'root' | string
  window: null | number
  nodes: Array<i3Node>
}

export async function i3GetTree (): Promise<i3Node> {
  const client = await i3wm.Client.connect()
  const tree = await client.message('get_tree')
  return tree
}