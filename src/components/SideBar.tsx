// @ts-ignore
import TreeView from 'treeview-react-bootstrap'

export const SideBar = () => {
    return <TreeView data={[{
        text: "Test",
        nodes: [{
            text: "Sub 1",
            node: []
        }, {
            text: "Sub 2",
            node: []
        }]
    }]}/>
}